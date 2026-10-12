import { IPaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { DebitCardPayment } from './DebitCardPayment';
import { PixPayment } from './PixPayment';

type PaymentCreator = (details: any) => IPaymentMethod;

/**
 * Registro de métodos de pagamento (OCP): para adicionar um novo método,
 * basta registrar um novo creator, sem alterar o OrderService.
 */
export class PaymentMethodFactory {
  private static creators: Record<string, PaymentCreator> = {
    credit_card: (details) => new CreditCardPayment(details),
    debit_card: () => new DebitCardPayment(),
    pix: () => new PixPayment(),
  };

  static register(name: string, creator: PaymentCreator): void {
    this.creators[name] = creator;
  }

  static create(method: string, details: any): IPaymentMethod {
    const creator = this.creators[method];
    if (!creator) throw new Error('Método de pagamento não suportado');
    return creator(details);
  }
}
