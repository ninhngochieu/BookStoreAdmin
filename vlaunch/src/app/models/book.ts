export class BookProfile {
  id: string;
  bookName: string;
  price: number;
  quantity: number;
  publicationDate: string;
  sku: string;
  description: string;
  mainImage: string;
  categoryId: number;
  category: object;
  authorId: number;
  author: object;
  private: boolean;
}
