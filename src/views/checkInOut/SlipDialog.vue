<script setup lang="ts">
import { useStoreStore } from "@/stores/Store";
import { useCheckInOutStore } from "@/stores/check-in-out";
import { useEmployeeStore } from "@/stores/employee";

const checkInOutStore = useCheckInOutStore();
</script>
<template>
  <v-dialog v-model="checkInOutStore.slip" persistent>
    <v-sheet
      elevation="15"
      max-width="800"
      width="100%"
      height="390"
      class="pa-4 mx-auto"
    >
      <v-container>
        <v-row>
          <v-col>
            <span class="text-h5 mt-3">D-Coffee</span>

            <v-card-subtitle class="pl-0">
              Saensuk Subdistrict, Mueang District, Chonburi</v-card-subtitle
            >
          </v-col>
          <v-col>
            <v-card-title align="right">
              <span class="text-h5 pa-2" style="border: solid 3px">
                PAY SLIP</span
              >
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-divider class="mb-0" color="black"></v-divider>
          <v-card-text
            class="pl-3 pb-1"
            style="font-weight: bold; font-size: 15px"
            >Employee ID :{{
              checkInOutStore.lastSalary?.EmployeeId
            }}</v-card-text
          >
          <v-card-text></v-card-text>
          <v-card-text
            class="pl-1 pb-1"
            style="font-weight: bold; font-size: 15px"
            align="right"
            >Period :{{ "01/04/2566 - 30/04/2566" }}</v-card-text
          > </v-row
        ><v-row
          ><v-card-text
            class="pl-3 pt-0"
            style="font-weight: bold; font-size: 15px"
            >Employee Name :{{
              checkInOutStore.lastSalary?.employee.employee_name
            }}</v-card-text
          >

          <v-card-text
            class="pt-0 pl-16 ml-9 pr-4"
            style="font-weight: bold; font-size: 15px"
            align="right"
            >Payment Date :</v-card-text
          >
          <v-card-text
            class="pt-0"
            style="font-weight: bold; width: 1px; font-size: 15px"
            align="right"
            >{{
              JSON.stringify(checkInOutStore.lastSalary?.ss_date).substring(
                9,
                11
              )
            }}/{{
              JSON.stringify(checkInOutStore.lastSalary?.ss_date).substring(
                6,
                8
              )
            }}/{{ "2566" }}</v-card-text
          >
        </v-row>
        <v-divider class="mt-16" color="black"> </v-divider>
        <v-card-text
          align="right"
          style="font-size: 25px; font-weight: bold"
          class="pt-5"
          >Total : ฿ {{ checkInOutStore.lastSalary?.ss_salary }}</v-card-text
        >
      </v-container>

      <v-divider class="mt-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="
            (checkInOutStore.slip = false),
              (checkInOutStore.paySalaryDialog = false)
          "
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
<style scoped></style>
