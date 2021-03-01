import { Brand } from './brand';
import { Category } from './category';
import { ProductType } from './product-type';
import { Unit } from './unit';

export class Product {
  bought_count: number;
  brand: Brand;
  brief: string;
  category: Category;
  code: string;
  content: string;
  default_image: string;
  id: number;
  images: [];
  is_published: boolean;
  name: string;
  price: number;
  rating_avg: number;
  rating_count: number;
  slug: string;
  specs: [];
  total_comment: number;
  unit: Unit;
  variants: [];
  view_count: number;
  product_type: ProductType;
}
