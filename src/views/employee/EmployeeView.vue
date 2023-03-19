<script setup lang="ts">
import EmployeeList from "./EmployeeList.vue";
import EmployeeDialog from "./EmployeeDialog.vue";
import { useEmployeeStore } from "../../stores/employee";
import EmployeeCheckDialog from "./EmployeeCheckDialog.vue";
const employeeStore = useEmployeeStore();
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <EmployeeList></EmployeeList>

        <EmployeeCheckDialog></EmployeeCheckDialog>
        <EmployeeDialog></EmployeeDialog>
      </v-row>
    </v-container>
  </v-app>
  <!-- <div class="text-h1">Employee View</div> -->
</template>

<style scoped></style>
