<script setup lang="ts">
import EmployeeList from "./EmployeeList.vue";
import EmployeeDialog from "./EmployeeDialog.vue";
import EmployeeCardList from "./EmployeeCardList.vue";
import { useEmployeeStore } from "../../stores/employee";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import EmployeeCheckDialog from "./EmployeeCheckDialog.vue";
const employeeStore = useEmployeeStore();
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <EmployeeList v-if="employeeStore.isTable"></EmployeeList>
        <EmployeeCardList v-if="!employeeStore.isTable"></EmployeeCardList>
        <EmployeeCheckDialog></EmployeeCheckDialog>
        <EmployeeDialog></EmployeeDialog>
      </v-row>
      <v-row class="justify-center">
        <v-btn :icon="mdiTable" flat @click="employeeStore.isTable = true">
        </v-btn>
        <v-btn
          :icon="mdiCardOutline"
          flat
          @click="employeeStore.isTable = false"
        ></v-btn>
      </v-row>
    </v-container>
  </v-app>
  <!-- <div class="text-h1">Employee View</div> -->
</template>

<style scoped></style>
