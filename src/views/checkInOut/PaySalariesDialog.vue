<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { VForm } from "vuetify/components";
import { useCheckInOutStore } from "@/stores/check-in-out";
import employee from "@/services/employee";
import { useEmployeeStore } from "@/stores/employee";
import type Employee from "@/types/Employee";
import ConfirmDialog from "./ConfirmDialog.vue";
const checkInOutStore = useCheckInOutStore();
const employeeStore = useEmployeeStore();
onMounted(async () => {
  await employeeStore.getEmployees();
});
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <v-dialog
    v-model="checkInOutStore.paySalaryDialog"
    persistent
    width="600"
    height="800"
  >
    <v-sheet
      elevation="15"
      max-width="600"
      rounded="lg"
      height="600"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h5">Pay Salaries</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-select
                v-model="checkInOutStore.payEmpId"
                :items="employeeStore.employees"
                item-title="employee_name"
                item-value="employee_id"
                persistent-hint
                single-line
                label="Select Employee"
              ></v-select>
              <v-btn @click="checkInOutStore.getCheckInOutById">Search</v-btn>
            </v-col>
            <v-container
              ><v-table
                v-if="checkInOutStore.searchCheckInOuts.length !== 0"
                style="overflow-y: auto; height: 25vh; width: 30vw"
              >
                <thead>
                  <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Time-in</th>
                    <th class="text-center">Time-out</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Work hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in checkInOutStore.searchCheckInOuts"
                    :key="item.cio_id"
                  >
                    <td>{{ item.employee.employee_name }}</td>
                    <td>
                      {{ JSON.stringify(item.cio_time_in).substring(1, 11) }}
                      {{ JSON.stringify(item.cio_time_in).substring(12, 20) }}
                    </td>
                    <td>
                      {{ JSON.stringify(item.cio_time_out).substring(1, 11) }}

                      {{ JSON.stringify(item.cio_time_out).substring(12, 20) }}
                    </td>

                    <td>{{ item.status }}</td>

                    <td>{{ item.cio_total_hour }}</td>
                  </tr>
                </tbody>
              </v-table>

              <v-table
                v-if="
                  checkInOutStore.searchCheckInOuts.length === 0 &&
                  checkInOutStore.payEmpId !== undefined
                "
                >No Check In Out Data</v-table
              >
              <v-row v-if="checkInOutStore.searchCheckInOuts.length !== 0"
                >Total Work Hour :
                {{ checkInOutStore.empTotalWorkHours }}</v-row
              >

              <v-row v-if="checkInOutStore.searchCheckInOuts.length !== 0"
                >Employee Hourly Wage :
                {{ checkInOutStore.empHourlyWage }}
                Baht</v-row
              >

              <v-row v-if="checkInOutStore.searchCheckInOuts.length !== 0"
                >Summary Salaries:
                {{
                  checkInOutStore.empTotalWorkHours *
                  checkInOutStore.empHourlyWage
                }}
                Baht</v-row
              >
            </v-container>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider class="mb-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          variant="text"
          @click="checkInOutStore.confirmDialog = true"
          >PAY</v-btn
        >
        <v-btn
          color="red"
          variant="text"
          @click="checkInOutStore.paySalaryDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
