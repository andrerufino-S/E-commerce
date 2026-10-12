import { IPaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export interface CreditCardDetails {
  cardNumber: string;
  cvv: string;
}

export class CreditCardPayment implements IPaymentMethod {
  constructor(private readonly details: CreditCardDetails) {}

  async process(amount: number): Promise<void> {
    logger.info(`Processando cartão final ${this.details.cardNumber.slice(-4)} - R$ ${amount}`);
    // Simulação de gateway
    if (this.details.cvv === '000') throw new Error('Cartão recusado');
  }
}
