export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  attribute_items: AttributeItem[];
}

export interface VariantAttribute {
  attribute_item: AttributeItem;
  id: number;
  name: string;
  slug: string;
}

export interface AttributeItem {
  id: number;
  name: string;
  slug: string;
}
