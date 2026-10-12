import { Product } from './IProduct';
import { PhysicalProduct } from './PhysicalProduct';
import { DigitalProduct } from './DigitalProduct';

export class ProductFactory {
  static createProduct(data: any): Product {
    switch (data.type) {
      case 'physical':
        return new PhysicalProduct(data.id, data.name, data.price, data.weight, data.dimensions);
      case 'digital':
        return new DigitalProduct(data.id, data.name, data.price);
      default:
        throw new Error(`Tipo de produto desconhecido: ${data.type}`);
    }
  }
}
