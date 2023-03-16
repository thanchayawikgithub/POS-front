<script lang="ts" setup>
import { useEmployeeStore } from "@/stores/employee";
import { onMounted } from "vue";
import EmployeeDialog from "./EmployeeDialog.vue";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

const employeeStore = useEmployeeStore();

onMounted(async () => {
  await employeeStore.getEmployees();
});
</script>

<template>
  <EmployeeDialog />
  <v-container class="pl-0"
    ><v-row>
      <v-col offset="11">
        <v-btn
          color="primary"
          :prepend-icon="mdiPlus"
          @click="employeeStore.dialog = true"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row style="width: 83vw">
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Province</th>
              <th>District</th>
              <th>Subdistrict</th>
              <th>Tel</th>
              <th>Email</th>
              <th>Login</th>
              <th>Password</th>
              <th>Position</th>
              <th>Hourly Wage</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of employeeStore.employees" :key="item.employee_id">
              <td>{{ item.employee_id }}</td>
              <td>{{ item.employee_name }}</td>
              <td>{{ item.employee_province }}</td>
              <td>{{ item.employee_district }}</td>
              <td>{{ item.employee_subdistrict }}</td>
              <td>{{ item.employee_tel }}</td>
              <td>{{ item.employee_email }}</td>
              <td>{{ item.employee_login }}</td>
              <td>{{ item.employee_password }}</td>
              <td>{{ item.employee_position }}</td>
              <td>฿ {{ item.employee_hourly_wage }}</td>

              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="employeeStore.editEmployee(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="
                    (employeeStore.deleteDialog = true),
                      (employeeStore.checkDialog = item.employee_id!)
                  "
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col> </v-row
  ></v-container>
</template>

<style scoped>
th {
  text-align: center;
}
</style>
