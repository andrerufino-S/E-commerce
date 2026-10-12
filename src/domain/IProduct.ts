export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number;

  /** Frete para a quantidade informada. */
  calculateFreight(quantity: number): number;

  /** Subtotal (preço x quantidade), sem frete. */
  calculateSubtotal(quantity: number): number;
}
