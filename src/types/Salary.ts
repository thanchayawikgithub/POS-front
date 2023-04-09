import type CheckInOut from "./CheckInOut";
import type Employee from "./Employee";

export default interface Salary {
  ss_id: number;

  ss_date: Date;

  ss_work_hour: number;

  ss_salary: number;

  updatedDate: Date;

  deletedDate: Date;

  checkinouts: CheckInOut[];

  employee: Employee;

  EmployeeId: number;
}
