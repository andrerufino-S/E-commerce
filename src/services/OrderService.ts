import { IOrderRepository, OrderItemRecord } from '../repositories/IOrderRepository';
import { ProductFactory } from '../domain/ProductFactory';
import { PaymentMethodFactory } from '../payments/PaymentMethodFactory';
import { NotificationService } from './NotificationService';
import logger from '../lib/logger';

export interface OrderRequest {
  customer: string;
  items: { productId: number; quantity: number }[];
  paymentMethod: string;
  paymentDetails: any;
}

export interface OrderResult {
  orderId: number;
  emailPreview?: string;
}

/** Erro de regra de negócio/validação -> o controller converte em HTTP 400. */
export class OrderValidationError extends Error {}

export class OrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly notificationService: NotificationService
  ) {}

  async processOrder(request: OrderRequest): Promise<OrderResult> {
    const { customer, items, paymentMethod, paymentDetails } = request;

    // 1. Validação
    if (!items || items.length === 0) {
      logger.error('Tentativa de pedido sem itens');
      throw new OrderValidationError('Carrinho vazio');
    }

    // 2. Cálculo (polimorfismo: sem if por tipo de produto)
    let totalAmount = 0;
    const orderItems: OrderItemRecord[] = [];

    for (const item of items) {
      const data = await this.orderRepository.findProductById(item.productId);
      if (!data) {
        throw new OrderValidationError(`Produto ${item.productId} não encontrado`);
      }

      const product = ProductFactory.createProduct(data);
      totalAmount += product.calculateSubtotal(item.quantity);
      totalAmount += product.calculateFreight(item.quantity);

      orderItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // 3. Pagamento (estratégia)
    let payment;
    try {
      payment = PaymentMethodFactory.create(paymentMethod, paymentDetails);
    } catch (e: any) {
      throw new OrderValidationError(e.message);
    }
    await payment.process(totalAmount);

    // 4. Persistência
    const order = await this.orderRepository.create({
      customer,
      items: orderItems,
      total: totalAmount,
      status: 'confirmed',
    });

    // 5. Notificação
    const emailPreview = await this.notificationService.sendOrderConfirmation({
      orderId: order.id,
      customerEmail: customer,
      total: totalAmount,
      items: orderItems,
    });

    return { orderId: order.id, emailPreview };
  }
}
