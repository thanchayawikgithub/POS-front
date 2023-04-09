import type Employee from "./Employee";
import type Salary from "./Salary";

export default interface CheckInOut {
  cio_id: number;

  cio_date: Date;

  cio_time_in: Date;

  cio_total_hour: number;

  status: string;

  cio_time_out: Date;

  updatedDate: Date;

  deletedDate: Date;

  EmployeeId: number;

  employee: Employee;

  salary: Salary;
}
