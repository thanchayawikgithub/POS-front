<script setup lang="ts">
import Chart from "chart.js/auto";
import receipt from "@/services/receipt";
import { useEmployeeStore } from "@/stores/employee";
import { useMaterialStore } from "@/stores/material";
import { onMounted, ref } from "vue";
import material from "@/services/material";
import ChartComponent from "./ChartComponent.vue";
import { useLoadingStore } from "@/stores/loading";
import EmployeeLoginDialog from "@/views/employee/EmployeeLoginDialog.vue";
import EmployeeLogoutDialog from "@/views/employee/EmployeeLogoutDialog .vue";
const employeeStore = useEmployeeStore();
const materialStore = useMaterialStore();

const loadingStore = useLoadingStore();

onMounted(async () => {
  await materialStore.getMaterials();
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
const startWork = ref();
</script>

<template>
  <EmployeeLoginDialog></EmployeeLoginDialog>
  <EmployeeLogoutDialog></EmployeeLogoutDialog>
  <v-container
    class="ml-0 pt-0 px-0 h-screen"
    style="background-color: #e7e7e7"
    fluid
    full-height
  >
    <v-row>
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
    </v-row>
    <v-row style="font-size: 25px; font-weight: 700" class="ml-3"
      >Overview
    </v-row>
    <v-row class="pl-3">
      <v-col cols="4" style="width: 30vw; height: 35vh">
        <v-card style="width: 30vw; height: 35vh"
          ><v-card-text style="font-size: 17px">Today Sales</v-card-text>
          <v-card-text style="font-size: 60px" align="right"
            >฿ 20,000</v-card-text
          >
          <v-card-text style="font-size: 17px">Receipt</v-card-text>
          <v-card-text style="font-size: 60px" align="right">5</v-card-text>
        </v-card>
        <v-card class="mt-5" style="width: 62vw; height: 35vh"
          ><v-card-text>Material Min Quantity</v-card-text>
          <v-container style="width: 62vw; height: 35vh" class="pt-0">
            <v-row>
              <v-col cols="12">
                <v-table style="overflow-y: auto; height: 25vh">
                  <thead>
                    <tr>
                      <th class="text-center">ID</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Min Quantity</th>
                      <th class="text-center">Quantity</th>
                      <th class="text-center">Unit</th>
                      <th class="text-center">Price Per Unit</th>
                      <th class="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in materialStore.materials.filter(
                        (materials) =>
                          materials.mat_quantity < materials.mat_min_quantity
                      )"
                      :key="item.mat_quantity"
                    >
                      <td class="text-center">{{ item.mat_id }}</td>
                      <td>{{ item.mat_name }}</td>
                      <td class="text-center">{{ item.mat_min_quantity }}</td>
                      <td class="text-center">{{ item.mat_quantity }}</td>
                      <td class="text-center">{{ item.mat_unit }}</td>
                      <td class="text-center">
                        ฿ {{ item.mat_price_per_unit }}
                      </td>
                      <td>
                        <v-card
                          height="4vh"
                          width="6vw"
                          align="center"
                          :color="
                            statusColor(
                              item.mat_quantity,
                              item.mat_min_quantity
                            )
                          "
                          style="color: aquamarine"
                          class="mx-auto"
                        >
                          <v-card-subtitle
                            class="pt-1"
                            style="font-size: 11px; font-weight: bold"
                            >{{
                              statusText(
                                item.mat_quantity,
                                item.mat_min_quantity
                              )
                            }}</v-card-subtitle
                          >
                        </v-card>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="4" style="width: 30vw; height: 35vh">
        <v-card style="width: 30vw; height: 35vh"
          ><v-card-text>Sale By Type</v-card-text>
          <ChartComponent
            class="pb-10 pt-0 pl-3"
            style="width: 29vw"
          ></ChartComponent>
        </v-card>
      </v-col>
      <v-col cols="4" class="pb-0">
        <v-card style="width: 28vw; height: 65vh"
          ><v-card-text>Popular Product</v-card-text>
        </v-card>

        <v-btn
          variant="plain"
          class="mt-5 pl-0"
          @click="(employeeStore.deleteDialog = true), (startWork = !startWork)"
        >
          <v-fade-transition leave-absolute>
            <v-btn
              @click="employeeStore.employeelogoutDialog = true"
              style="width: 28vw"
              v-if="startWork"
              class="endbutton"
              >Check Out</v-btn
            >

            <v-btn
              @click="employeeStore.employeeLoginDialog = true"
              v-else
              style="width: 28vw"
              class="startbutton"
              >Check In</v-btn
            >
          </v-fade-transition>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.startbutton {
  padding: 0.1em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 800;
  color: #fff;
  background-color: #ec0511;
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
