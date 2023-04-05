export default interface Product {
  product_id?: number;

  product_name: string;

  product_type: string;

  product_size: string;

  product_price: number;

  categoryId: number;

  product_image?: string;

  product_createdAt?: Date;

  product_updatedAt?: Date;

  product_deletedAt?: Date;

  product_amount?: number;

  product_updatePrice?: number;

  product_updateName?: string;

  product_size_unit?: string;

  product_categoryName?: string;
}
