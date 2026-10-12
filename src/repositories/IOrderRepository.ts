export interface OrderItemRecord {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderData {
  customer: string;
  items: OrderItemRecord[];
  total: number;
  status: string;
}

export interface OrderRecord {
  id: number;
}

export interface ProductRecord {
  id: number;
  type: string;
  [key: string]: any;
}

export interface IOrderRepository {
  findProductById(id: number): Promise<ProductRecord | null>;
  create(data: CreateOrderData): Promise<OrderRecord>;
}
