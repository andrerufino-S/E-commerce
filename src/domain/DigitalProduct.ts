import { Product } from './IProduct';

export class DigitalProduct implements Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number
  ) {}

  calculateSubtotal(quantity: number): number {
    return this.price * quantity;
  }

  // Produto digital não tem frete
  calculateFreight(_quantity: number): number {
    return 0;
  }
}
