import type Employee from "./Employee";

export default interface User {
  user_id?: number;
  user_login: string;
  user_name: string;
  user_password: string;
  user_role: string;
  employee_id: Employee;
}
