import {  AttributeItem, ProductAttribute } from './attribute';

export class Spec {
  constructor(attribute?: ProductAttribute) {
    this.attribute = attribute;
  }
  
  attribute: ProductAttribute;
  attribute_item: AttributeItem;
  id: number;
  product_id: number;
}
