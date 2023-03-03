import type User from "./User";

export default interface Employee {
  employee_id?: number;
  employee_name: string;
  employee_province: string;
  employee_district: string;
  employee_subdistrict: string;
  employee_tel: string;
  employee_email: string;
  employee_position: string;
  employee_hourly_wage: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user?: User;
}
