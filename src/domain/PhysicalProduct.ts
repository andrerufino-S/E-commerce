import { Product } from './IProduct';

export class PhysicalProduct implements Product {
  static readonly FIXED_FREIGHT = 10;

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly weight?: number,
    public readonly dimensions?: string
  ) {}

  calculateSubtotal(quantity: number): number {
    return this.price * quantity;
  }

  // Produto físico cobra frete fixo (mesma regra do código legado)
  calculateFreight(_quantity: number): number {
    return PhysicalProduct.FIXED_FREIGHT;
  }
}
