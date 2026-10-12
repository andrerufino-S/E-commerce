import { IMailProvider } from '../providers/ImailProviders';
import { OrderItemRecord } from '../repositories/IOrderRepository';

export interface OrderConfirmation {
  orderId: number;
  customerEmail: string;
  total: number;
  items: OrderItemRecord[];
}

/** Define O QUE enviar (assunto/corpo). O COMO fica a cargo do provider. */
export class NotificationService {
  constructor(private readonly mailProvider: IMailProvider) {}

  async sendOrderConfirmation(order: OrderConfirmation): Promise<string | undefined> {
    const result = await this.mailProvider.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: order.customerEmail,
      subject: `Confirmação do Pedido #${order.orderId}`,
      text: `Olá, seu pedido #${order.orderId} no valor de R$ ${order.total} foi confirmado.`,
      html: `
        <h1>Pedido Confirmado!</h1>
        <p>Olá, seu pedido <b>#${order.orderId}</b> foi processado com sucesso.</p>
        <p>Total: <strong>R$ ${order.total}</strong></p>
        <ul>
          ${order.items.map((p) => `<li>${p.name}</li>`).join('')}
        </ul>
      `,
    });
    return result.previewUrl;
  }
}
