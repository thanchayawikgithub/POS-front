import type Employee from "@/types/Employee";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import employeeService from "@/services/employee";
import { useMessageStore } from "./message";

export const useEmployeeStore = defineStore("employee", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const employeeLoginDialog = ref(false);
  const employeelogoutDialog = ref(false);
  const employees = ref<Employee[]>([]);
  const editedEmployee = ref<Employee>({
    employee_name: "",
    employee_province: "",
    employee_district: "",
    employee_subdistrict: "",
    employee_tel: "",
    employee_email: "",
    employee_position: "",
    employee_hourly_wage: 0,
    employee_login: "",
    employee_password: "",
  });
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedEmployee.value = {
        employee_name: "",
        employee_province: "",
        employee_district: "",
        employee_subdistrict: "",
        employee_tel: "",
        employee_email: "",
        employee_position: "",
        employee_hourly_wage: 0,
        employee_login: "",
        employee_password: "",
      };
    }
  });

  // const login = (username: string, password: string): boolean => {
  //   const index = employees.value.findIndex(
  //     (item) => item.employee_login === username
  //   );
  //   if (index >= 0) {
  //     const employee = employees.value[index];
  //     if (employee.employee_password === password) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // };
  async function getEmployees() {
    loadingStore.isLoading = true;
    try {
      const res = await employeeService.getEmployees();
      employees.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Employee ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveEmployee() {
    loadingStore.isLoading = true;
    try {
      if (editedEmployee.value.employee_id) {
        const res = await employeeService.updateEmployee(
          editedEmployee.value.employee_id,
          editedEmployee.value
        );
      } else {
        const res = await employeeService.saveEmployee(editedEmployee.value);
      }
      dialog.value = false;
      await getEmployees();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Employee ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteEmployee(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await employeeService.deleteEmployee(id);
      await getEmployees();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Employee ได้");
    }
    loadingStore.isLoading = false;
  }
  function editEmployee(employee: Employee) {
    editedEmployee.value = JSON.parse(JSON.stringify(employee));
    dialog.value = true;
  }
  return {
    employees,
    getEmployees,
    dialog,
    editedEmployee,
    saveEmployee,
    editEmployee,
    deleteEmployee,
    isTable,
    checkDialog,
    deleteDialog,
    // login,
    employeeLoginDialog,
    employeelogoutDialog,
  };
});
