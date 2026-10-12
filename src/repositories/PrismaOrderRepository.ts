import { PrismaClient } from '@prisma/client';
import {
  CreateOrderData,
  IOrderRepository,
  OrderRecord,
  ProductRecord,
} from './IOrderRepository';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient = new PrismaClient()) {}

  async findProductById(id: number): Promise<ProductRecord | null> {
    return (await this.prisma.product.findUnique({ where: { id } })) as ProductRecord | null;
  }

  async create(data: CreateOrderData): Promise<OrderRecord> {
    const order = await this.prisma.order.create({
      data: {
        customer: data.customer,
        items: JSON.stringify(data.items),
        total: data.total,
        status: data.status,
      },
    });
    return { id: order.id };
  }
}
