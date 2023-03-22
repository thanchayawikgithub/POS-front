import type Customer from "./Customer";
import type Employee from "./Employee";
import type RecieptDetail from "./RecieptDetail";
import type Store from "./Store";

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

  store: Store;
  customer: Customer;

  employee: Employee;
  recieptDetail: RecieptDetail[];

  show?: boolean;
}
