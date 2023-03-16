import type Employee from "./Employee";

export default interface CheckMaterial {
  check_mat_id?: number;
  check_mat_date?: Date;
  check_mat_time?: Date;
  employee: Employee;
  deleteAt?: Date;
}
