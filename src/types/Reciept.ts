import type Product from "./Product";
import type RecieptDetail from "./RecieptDetail";

export default interface Reciept {
  rec_id?: number;

  rec_queue: number;

  rec_time: number;

  rec_discount: number;

  rec_total: number;

  rec_received: number;

  rec_changed: number;

  rec_payment: string;

  rec_createdAt: Date;
  rec_updatedAt: Date;
  rec_deletedAt: Date;

  products: Product;

  recieptDetail: RecieptDetail[];
}
