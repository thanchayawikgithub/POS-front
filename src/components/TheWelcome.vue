<script setup lang="ts">
import Chart from "chart.js/auto";
import receipt from "@/services/receipt";
import { useEmployeeStore } from "@/stores/employee";
import { useMaterialStore } from "@/stores/material";
import { onMounted, ref } from "vue";
import material from "@/services/material";
import ChartComponent from "./ChartComponent.vue";
import ChartComponent2 from "./ChartComponent2.vue";
import BarChartComponent from "./BarChartComponent.vue";
import BarChartComponentB from "./BarChartComponentB.vue";
import BarChartComponentF from "./BarChartComponentF.vue";
import { useLoadingStore } from "@/stores/loading";
import { useCheckInOutStore } from "@/stores/check-in-out";
import EmployeeCheckInDialog from "@/views/employee/EmployeeCheckInDialog.vue";
import EmployeeCheckOutDialog from "@/views/employee/EmployeeCheckOutDialog .vue";
import type checkInOut from "@/services/checkInOut";
import { computed } from "vue";
import { useReport } from "@/stores/report";
import {
  mdiStoreOutline,
  mdiCashMultiple,
  mdiCardAccountDetailsStar,
} from "@mdi/js";
const employeeStore = useEmployeeStore();
const materialStore = useMaterialStore();
const checkInOutStore = useCheckInOutStore();
const loadingStore = useLoadingStore();
const reportStore = useReport();
const bakeryChat = ref(false);
const foodChat = ref(false);
const drinkChat = ref(true);

onMounted(async () => {
  await reportStore.getMatirial();
  await reportStore.getDailySales();
});

function statusColor(quantity: number, min: number) {
  if (quantity === 0) {
    return "red";
  } else if (quantity < min) {
    return "yellow";
  }
}
function statusText(quantity: number, min: number) {
  if (quantity === 0) {
    return "Sold Out";
  } else if (quantity < min) {
    return "Low Stock";
  }
}
</script>

<template>
  <v-app style="background-color: #e7e7e7; height: 900px">
    <EmployeeCheckInDialog></EmployeeCheckInDialog>
    <EmployeeCheckOutDialog></EmployeeCheckOutDialog>
    <v-container style="background-color: #e7e7e7" fluid>
      <!-- <v-row>
                                    <v-col cols="12" class="pl-1">
                                      <v-card color="#a4907c" style="width: 100vw; height: 14vh">
                                        <v-card-text
                                          align="center"
                                          style="font-size: 40px; font-weight: 600; color: #f0e3dd"
                                          >Main Menu</v-card-text
                                        ><v-card-text
                                          align="center"
                                          style="font-size: 30px; font-weight: 600; color: #f0e3dd"
                                          >Welcome, Admin</v-card-text
                                        ></v-card
                                      ></v-col
                                    >
                                  </v-row> -->
      <v-row style="font-size: 25px; font-weight: 700" class="ml-3">
        <v-col class="mt-3"> Dashboard </v-col>
      </v-row>
      <v-row class="pl-3 mt-9">
        <v-col cols="4" style="width: 30vw; height: 35vh">
          <v-card
            style="width: 30vw; height: 348px; position: absolute"
            rounded="lg"
            class="pa-1"
            elevation="15"
          >
            <v-card-text class="pt-16 mt-16"></v-card-text>
            <v-card-text
              v-if="drinkChat === true"
              class="pt-16 mt-7 pl-5"
              style="font-size: 30px; font-weight: bolder"
              >Drink Category Sold</v-card-text
            >
            <v-card-text
              v-if="bakeryChat === true"
              class="pt-16 mt-7 pl-5"
              style="font-size: 30px; font-weight: bolder"
              >Bakery Category Sold</v-card-text
            >
            <v-card-text
              v-if="foodChat === true"
              class="pt-16 mt-7 pl-5"
              style="font-size: 30px; font-weight: bolder"
              >Food Category Sold</v-card-text
            >
            <v-card-subtitle class="pl-6">
              Last sold by category.</v-card-subtitle
            >
            <v-divider class="mb-0 ma-1"></v-divider>
            <v-row>
              <v-col>
                <v-btn
                  rounded="lg"
                  variant="tonal"
                  color="#e7e7e7"
                  style="background-color: #534340"
                  elevation="6"
                  class="ml-12 mt-1"
                  @click="
                    drinkChat = true;
                    bakeryChat = false;
                    foodChat = false;
                  "
                  >Drink</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded="lg"
                  elevation="6"
                  variant="tonal"
                  color="#e7e7e7"
                  style="background-color: #534340"
                  class="ml-5 mt-1"
                  @click="
                    bakeryChat = true;
                    drinkChat = false;
                    foodChat = false;
                  "
                  >Bakery</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded="lg"
                  variant="tonal"
                  color="#e7e7e7"
                  style="background-color: #534340"
                  elevation="6"
                  class="ml-2 mt-1"
                  @click="
                    foodChat = true;
                    bakeryChat = false;
                    drinkChat = false;
                  "
                  >Food</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <v-card
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 28vw;
              height: 260px;
              top: -39px;
              left: 16px;

              background-color: #532e1c;
            "
          >
            <BarChartComponent
              v-if="drinkChat === true"
              class="pt-5"
              style="width: 27vw; height: 230px"
            />
            <BarChartComponentB
              v-if="bakeryChat === true"
              class="pt-5"
              style="width: 27vw; height: 230px"
            />
            <BarChartComponentF
              v-if="foodChat === true"
              class="pt-5"
              style="width: 27vw; height: 230px"
            />
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            style="width: 30vw; height: 348px; position: absolute"
            rounded="lg"
            class="pa-1"
            elevation="15"
          >
            <v-card-text class="pt-16 mt-16"></v-card-text>
            <v-card-text
              class="pt-16 mt-8 pl-5"
              style="font-size: 30px; font-weight: bolder"
              >Day Of Week Total Sales</v-card-text
            >
            <v-card-subtitle class="pl-6">
              Last day of week total sales</v-card-subtitle
            >
            <v-divider class="mb-0 ma-1"></v-divider>
          </v-card>

          <v-card
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 28vw;
              height: 260px;
              top: -39px;
              left: 16px;

              background-color: #433520;
            "
          >
            <ChartComponent
              class="pt-5"
              style="width: 27vw; height: 230px"
            ></ChartComponent>
          </v-card>
        </v-col>

        <v-col cols="4" class="pb-0">
          <v-card
            rounded="lg"
            class="pa-1"
            style="width: 28vw; height: 348px; position: absolute"
            elevation="15"
          >
            <v-card-text class="pt-16 mt-16"></v-card-text>
            <v-card-text
              class="pt-16 mt-8 pl-5"
              style="font-size: 30px; font-weight: bolder"
              >New Member</v-card-text
            >
            <v-card-subtitle class="pl-6">Last new member </v-card-subtitle>
            <v-divider class="mb-0 ma-1"></v-divider>
          </v-card>

          <v-card
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 26vw;
              height: 260px;
              top: -39px;
              left: 16px;

              background-color: #8d7b68;
            "
            ><ChartComponent2
              class="pt-5"
              style="width: 24vw; height: 230px"
            ></ChartComponent2>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ml-2 mt-16 pt-7"></v-row>
      <v-row class="ml-0 mt-16">
        <v-col cols="5" class="mr-11">
          <v-card
            rounded="lg"
            class="pa-1"
            style="width: 40vw; height: 290px; position: absolute"
            elevation="15"
          >
            <v-card-text class="mt-5"></v-card-text>
            <v-table
              style="overflow-y: auto; height: 21vh; width: 50vw"
              class="mt-8"
            >
              <thead>
                <tr>
                  <th class="text-center">Name</th>
                  <th class="text-center">Date</th>
                  <th class="text-center">Time-in</th>
                  <th class="text-center">Time-out</th>
                  <th class="text-center">Status</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in checkInOutStore.currentCheckInOuts"
                  :key="item.cio_id"
                >
                  <td class="text-center">{{ item.employee.employee_name }}</td>
                  <td class="text-center">
                    {{ JSON.stringify(item.cio_time_in).substring(11, 9) }}/{{
                      JSON.stringify(item.cio_time_in).substring(8, 6)
                    }}/{{ JSON.stringify(item.cio_time_in).substring(1, 5) }}
                  </td>
                  <td class="text-center">
                    {{ JSON.stringify(item.cio_time_in).substring(12, 20) }}
                  </td>
                  <td v-if="item.cio_time_out" class="text-center">
                    {{ JSON.stringify(item.cio_time_out).substring(12, 20) }}
                  </td>
                  <td v-else></td>

                  <td class="text-center">{{ item.status }}</td>
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
          </v-card>
          <v-card
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 38vw;
              height: 120px;
              top: -39px;
              left: 16px;

              background-color: #876445;
            "
            ><v-card-text
              class="pb-2 text-center"
              style="font-weight: bold; font-size: 20px; color: #f7f1e5"
              >Employee Check In Out</v-card-text
            >
            <v-card-text align="center"
              ><v-btn
                @click="checkInOutStore.checkInDialog = true"
                style="width: 25vw"
                class="startbutton"
                >Check In</v-btn
              ></v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="3" class="pl-0">
          <v-card
            rounded="lg"
            class="pa-1"
            style="width: 29vw; height: 290px; position: absolute"
            elevation="15"
          >
            <v-row class="pl-2 mt-16 pt-5" style="width: 35vw">
              <v-table
                style="
                  overflow-y: auto;
                  height: 248px;

                  width: 33vw;
                "
              >
                <thead>
                  <tr>
                    <th class="text-center">Name</th>

                    <th class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in reportStore.matReport"
                    :key="item.mat_quantity"
                  >
                    <td>{{ item.mat_name }}</td>

                    <td>
                      <v-card
                        height="30px"
                        width="6vw"
                        align="center"
                        :color="
                          statusColor(item.mat_quantity, item.mat_min_quantity)
                        "
                        class="mx-auto"
                      >
                        <v-card-subtitle
                          class="pt-1"
                          style="font-size: 11px; font-weight: bold"
                          >{{
                            statusText(item.mat_quantity, item.mat_min_quantity)
                          }}</v-card-subtitle
                        >
                      </v-card>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-row>
          </v-card>
          <v-card
            rounded="lg"
            class="pa-1 pl2"
            elevation="15"
            style="
              width: 27vw;
              height: 120px;
              top: -39px;
              left: 16px;

              background-color: #532e1c;
            "
          >
            <v-card-text
              class="pb-2 text-center"
              style="font-weight: bold; font-size: 22px; color: #f7f1e5"
              >Low Stock</v-card-text
            >
            <v-divider class="mb-0 ma-2" color="#f7f1e5"></v-divider>
            <v-card-text
              class="pt-2 text-center"
              style="font-weight: bold; font-size: 14px; color: #f7f1e5"
              >Please order Material are low stock.</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="2" class="pl-16 ml-10">
          <v-card
            rounded="lg"
            class="pa-1"
            style="width: 19vw; height: 290px; position: absolute"
            elevation="15"
          >
            <v-card-subtitle
              class="mt-13"
              style="text-align: end; font-size: 18px"
              >Daily Sales</v-card-subtitle
            ><v-card-text class="mt-2" style="text-align: end; font-size: 40px"
              >{{ reportStore.total_sales }}฿</v-card-text
            ><v-card-subtitle
              class="mt-4"
              style="text-align: end; font-size: 18px"
              >Daily Recipt</v-card-subtitle
            ><v-card-text
              class="mt-1"
              style="text-align: end; font-size: 40px"
              >{{ reportStore.total_receipts }}</v-card-text
            >
            <v-divider class="mb-0 ma-1"></v-divider>
          </v-card>
          <v-card
            :prepend-icon="mdiCashMultiple"
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 8vw;
              height: 120px;
              top: -39px;
              left: 16px;

              background-color: #433520;
            "
          >
            <template v-slot:prepend>
              <v-icon color="#f7f1e5" size="55" class="mt-4 ml-4">{{
                mdiCashMultiple
              }}</v-icon> </template
            ><v-card-text
              class="pb-2 text-center"
              style="font-weight: bold; font-size: 20px; color: #f7f1e5"
            ></v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row class="ml-2 mt-16 pt-16"></v-row>
      <v-row class="ml-0 mt-16 pt-16">
        <v-col cols="6" class="mr-16">
          <v-card
            rounded="lg"
            class="pa-1"
            style="width: 50vw; height: 290px; position: absolute"
            elevation="15"
          >
            <v-card-text class="mt-5"></v-card-text>
            <v-table
              style="overflow-y: auto; height: 21vh; width: 50vw"
              class="mt-8"
            >
              <thead>
                <tr>
                  <th class="text-center">Name</th>
                  <th class="text-center">Date</th>
                  <th class="text-center">Time-in</th>
                  <th class="text-center">Time-out</th>
                  <th class="text-center">Status</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in checkInOutStore.currentCheckInOuts"
                  :key="item.cio_id"
                >
                  <td class="text-center">{{ item.employee.employee_name }}</td>
                  <td class="text-center">
                    {{ JSON.stringify(item.cio_time_in).substring(11, 9) }}/{{
                      JSON.stringify(item.cio_time_in).substring(8, 6)
                    }}/{{ JSON.stringify(item.cio_time_in).substring(1, 5) }}
                  </td>
                  <td class="text-center">
                    {{ JSON.stringify(item.cio_time_in).substring(12, 20) }}
                  </td>
                  <td v-if="item.cio_time_out" class="text-center">
                    {{ JSON.stringify(item.cio_time_out).substring(12, 20) }}
                  </td>
                  <td v-else></td>

                  <td class="text-center">{{ item.status }}</td>
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
          </v-card>
          <v-card
            rounded="lg"
            class="pa-1"
            elevation="15"
            style="
              width: 48vw;
              height: 120px;
              top: -39px;
              left: 16px;

              background-color: #876445;
            "
            ><v-card-text
              class="pb-2 text-center"
              style="font-weight: bold; font-size: 20px; color: #f7f1e5"
              >Employee Check In Out</v-card-text
            >
            <v-card-text align="center"
              ><v-btn
                @click="checkInOutStore.checkInDialog = true"
                style="width: 25vw"
                class="startbutton"
                >Check In</v-btn
              ></v-card-text
            >
          </v-card>
                                </v-col>

                                      <v-col cols="3" class="pl-16 ml-6">
                                        <v-card
                                          rounded="lg"
                                          class="pa-1"
                                          style="width: 19vw; height: 290px; position: absolute"
                                          elevation="15"
                                        >
                                          <v-card-subtitle
                                            class="mt-13"
                                            style="text-align: end; font-size: 18px"
                                            >Best Customer</v-card-subtitle
                                          ><v-table height="152px">
                                            <thead>
                                              <tr>
                                                <th class="text-center">Name</th>
                                                <th class="text-center">Point</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td class="text-center">Tee</td>
                                                <td class="text-center">5</td>
                                              </tr>
                                            </tbody>
                                          </v-table>

                                          <v-divider class="mb-0 ma-1"></v-divider>
                                        </v-card>
                                        <v-card
                                          rounded="lg"
                                          class="pa-1"
                                          elevation="15"
                                          style="
                                            width: 8vw;
                                            height: 120px;
                                            top: -39px;
                                            left: 16px;

                                            background-color: #433520;
                                          "
                                          ><template v-slot:prepend>
                                            <v-icon color="#f7f1e5" size="55" class="mt-4 ml-4">{{
                                              mdiCardAccountDetailsStar
                                            }}</v-icon> </template
                                          ><v-card-text
                                            class="pb-2 text-center"
                                            style="font-weight: bold; font-size: 20px; color: #f7f1e5"
                                          ></v-card-text>
                                        </v-card>
                                      </v-col>
                                    </v-row> -->
    </v-container>
  </v-app>
</template>
<style>
.startbutton {
  padding: 0.1em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 800;
  color: #fff;
  background-color: #23c483;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.startbutton:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
}

.startbutton:active {
  transform: translateY(-1px);
}

.endbutton {
  padding: 0.1em 2em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 800;
  color: #fff;
  background-color: #23c483;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.endbutton:hover {
  background-color: #ec0511;
  box-shadow: 0px 15px 20px rgba(155, 2, 2, 0.4);
  color: #fff;
}

.endbutton:active {
  transform: translateY(-1px);
}
</style>
