<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { mdiCreditCardCheckOutline } from "@mdi/js";
import { useCheckInOutStore } from "@/stores/check-in-out";
import EmployeeCheckInDialog from "@/views/employee/EmployeeCheckInDialog.vue";
import EmployeeCheckOutDialog from "@/views/employee/EmployeeCheckOutDialog .vue";
import PaySalariesDialog from "@/views/checkInOut/PaySalariesDialog.vue";
import { useEmployeeStore } from "@/stores/employee";
import SlipDialog from "./SlipDialog.vue";

const checkInOutStore = useCheckInOutStore();
onMounted(async () => {
  await checkInOutStore.getCheckInOuts();
});
</script>

<template>
  <SlipDialog></SlipDialog>
  <EmployeeCheckInDialog></EmployeeCheckInDialog>
  <EmployeeCheckOutDialog></EmployeeCheckOutDialog>
  <PaySalariesDialog></PaySalariesDialog>
  <v-container style="background-color: #e7e7e7">
    <v-row justify="end">
      <v-col cols="2" offset="12">
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiCreditCardCheckOutline"
          @click="checkInOutStore.paySalaryDialog = true"
          >Pay Salaries</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <v-table class="table">
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">Date</th>
              <th class="text-center">Time-in</th>
              <th class="text-center">Time-out</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in checkInOutStore.CheckInOuts" :key="item.cio_id">
              <td>{{ item.employee.employee_name }}</td>
              <td>
                {{ JSON.stringify(item.cio_time_in).substring(11, 9) }}/{{
                  JSON.stringify(item.cio_time_in).substring(8, 6)
                }}/{{ JSON.stringify(item.cio_time_in).substring(1, 5) }}
              </td>
              <td>
                {{ JSON.stringify(item.cio_time_in).substring(12, 20) }}
              </td>
              <td v-if="item.cio_time_out">
                {{ JSON.stringify(item.cio_time_out).substring(12, 20) }}
              </td>
              <td v-else></td>

              <td>{{ item.status }}</td>
              <!-- <td>
                <v-btn
                  v-if="item.status === 'checked in'"
                  @click="
                    (checkInOutStore.checkOutDialog = true),
                      (checkInOutStore.empCheckOut = item)
                  "
                  >out</v-btn
                >
              </td> -->
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          :length="checkInOutStore.lastPage"
          v-model="checkInOutStore.page"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
td {
  text-align: center;
}

.table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
