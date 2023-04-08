<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { mdiPlus } from "@mdi/js";
import { useCheckInOutStore } from "@/stores/check-in-out";
import EmployeeCheckInDialog from "@/views/employee/EmployeeCheckInDialog.vue";
import EmployeeCheckOutDialog from "@/views/employee/EmployeeCheckOutDialog .vue";
import { useEmployeeStore } from "@/stores/employee";
const employeeStore = useEmployeeStore();
const btndisabled = ref(false);
const checkInOutStore = useCheckInOutStore();
onMounted(async () => {
  await employeeStore.getEmployees();
});
</script>

<template>
  <EmployeeCheckInDialog></EmployeeCheckInDialog>
  <EmployeeCheckOutDialog></EmployeeCheckOutDialog>
  <v-container style="background-color: #e7e7e7">
    <v-row justify="end">
      <v-col cols="2" offset="12">
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiPlus"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <v-table>
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th>Name</th>
              <th>Time-in</th>
              <th>Time-out</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in checkInOutStore.checkInOutList"
              :key="item.cio_id"
            >
              <td>{{ item.employee.employee_name }}</td>
              <td>
                {{ JSON.stringify(item.cio_time_in).substring(1, 11) }}
                {{ JSON.stringify(item.cio_time_in).substring(12, 20) }}
              </td>
              <td v-if="item.cio_time_out">
                {{ JSON.stringify(item.cio_time_out).substring(1, 11) }}

                {{ JSON.stringify(item.cio_time_out).substring(12, 20) }}
              </td>
              <td v-else></td>

              <td>{{ item.status }}</td>
              <td>
                <v-btn
                  v-if="item.status === 'checked in'"
                  @click="
                    (checkInOutStore.checkOutDialog = true),
                      (checkInOutStore.empCheckOut = item)
                  "
                  >out</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
td {
  text-align: center;
}
</style>
