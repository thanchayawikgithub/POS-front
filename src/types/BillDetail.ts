import type { Bill } from "./Bill";
import type Material from "./Material";

export interface BillDetail {
  bill_detail_id: number;

  bill_detail_name: string;

  bill_detail_amount: number;

  bill_detail_price: number;

  bill_detail_total: number;

  materials: Material;

  bill: Bill;
}
