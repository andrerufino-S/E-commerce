export interface IPaymentMethod {
  /** Processa o pagamento. Lança erro se for recusado. */
  process(amount: number): Promise<void>;
}
