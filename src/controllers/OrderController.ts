import { Request, Response } from 'express';
import { OrderService, OrderValidationError } from '../services/OrderService';
import logger from '../lib/logger';

/** Camada HTTP: recebe request, chama o service, devolve response. */
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  processOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.processOrder(req.body);
      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });
    } catch (error: any) {
      if (error instanceof OrderValidationError) {
        return res.status(400).json({ error: error.message });
      }
      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno' });
    }
  };
}
