<script setup lang="ts">
import { useStoreStore } from "@/stores/Store";
import { useCheckInOutStore } from "@/stores/check-in-out";
import { useEmployeeStore } from "@/stores/employee";

const checkInOutStore = useCheckInOutStore();
</script>
<template>
  <v-dialog v-model="checkInOutStore.slip" persistent width="1000">
    <v-sheet
      elevation="15"
      max-width="1000"
      width="100%"
      height="700"
      class="pa-4 mx-auto"
    >
      <v-card-title style="border: solid 3px; width: 10vw">
        <span class="text-h5">PAY SLIP</span>
      </v-card-title>
      <v-container>
        <v-row>
          <span class="text-h5 ml-2 mt-3">D-Coffee</span>
        </v-row>
        <v-row
          ><v-card-subtitle class="pl-3">
            Saensuk Subdistrict, Mueang District, Chonburi</v-card-subtitle
          ></v-row
        >
        <v-row
          ><v-card-text class="pl-3 pb-1" style="font-weight: bold"
            >Employee ID :{{
              checkInOutStore.lastSalary?.EmployeeId
            }}</v-card-text
          >
          <v-card-text class="ml-10 pl-16 pb-1" style="font-weight: bold"
            >Period :{{ "01/04/2566 - 30/04/2566" }}</v-card-text
          > </v-row
        ><v-row
          ><v-card-text class="pl-3 pt-0" style="font-weight: bold"
            >Employee Name :{{
              checkInOutStore.lastSalary?.employee.employee_name
            }}</v-card-text
          ><v-card-text class="ml-16 pl-16 pt-0" style="font-weight: bold"
            >Payment Date :{{
              checkInOutStore.lastSalary?.ss_date
            }}</v-card-text
          >
        </v-row>
        <v-divider class="mt-16"> </v-divider>
        <v-card-text
          >Total : ฿ {{ checkInOutStore.lastSalary?.ss_salary }}</v-card-text
        >
      </v-container>

      <v-divider class="mb-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="checkInOutStore.slip = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
<style scoped></style>
