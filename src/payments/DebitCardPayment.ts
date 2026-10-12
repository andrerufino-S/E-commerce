import { IPaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class DebitCardPayment implements IPaymentMethod {
  async process(amount: number): Promise<void> {
    logger.info(`Processando débito de R$ ${amount}...`);
  }
}
