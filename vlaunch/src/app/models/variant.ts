import { VariantAttribute } from './attribute';
import { Image } from './image';

export class Variant {
  attributes: VariantAttribute[];
  id: number;
  images: Image[];
  name: string;
  price_override: number;
  product_id: number;
}
