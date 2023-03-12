import type Product from "./Product";
import type Reciept from "./Reciept";

export default interface RecieptDetail {
  rcd_id?: number;

  rcd_name: string;

  rcd_amount: number;

  rcd_price: number;

  rcd_total: number;

  rcd_createdAt: Date;

  rcd_updatedAt: Date;

  rcd_deletedAt: Date;

  products: Product;

  reciepts: Reciept;
}
