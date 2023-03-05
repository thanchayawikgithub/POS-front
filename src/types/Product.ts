import type Category from "./Category";

export default interface Product {
  product_id?: number;

  product_name: string;

  product_type: string;

  product_size: string;

  product_price: number;

  product_image: string;

  product_createdAt?: Date;

  product_updatedAt?: Date;

  product_deletedAt?: Date;

  category?: Category;

  product_qty?: number;
}
