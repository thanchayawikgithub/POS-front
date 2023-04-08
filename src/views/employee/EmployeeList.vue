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
  <v-container class="pl-0" style="background-color: #e7e7e7"
    ><v-row justify="end">
      <v-col cols="2" offset="12" class="pl-16">
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiPlus"
          @click="employeeStore.dialog = true"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <v-table>
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th class="text-center">Name</th>
              <th>Province</th>
              <th>District</th>
              <th>Subdistrict</th>
              <th class="text-center">Tel</th>
              <th class="text-center">Email</th>
              <th>Login</th>

              <th>Position</th>
              <th>Hourly Wage</th>
              <th class="text-center pl-0">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of employeeStore.employees" :key="item.employee_id">
              <td>{{ item.employee_name }}</td>
              <td>{{ item.employee_province }}</td>
              <td>{{ item.employee_district }}</td>
              <td>{{ item.employee_subdistrict }}</td>
              <td>{{ item.employee_tel }}</td>
              <td>{{ item.employee_email }}</td>
              <td>{{ item.employee_login }}</td>

              <td>{{ item.employee_position }}</td>
              <td>฿ {{ item.employee_hourly_wage }}</td>

              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="#665A48"
                  class="ma-1"
                  variant="tonal"
                  @click="employeeStore.editEmployee(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="#B46060"
                  class="ma-1"
                  variant="tonal"
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
