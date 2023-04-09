import type { BillDetail } from "./BillDetail";
import type Employee from "./Employee";

export interface Bill {
  bill_id: number;

  bill_shop_name: string;

  bill_date: Date;

  bill_time: Date;

  bill_total: number;

  bill_buy: number;

  bill_change: number;

  bill_createdAt: Date;

  bill_updatedAt: Date;

  bill_deletedAt: Date;

  employee: Employee;

  bill_details: BillDetail[];

  show?: boolean;
}
