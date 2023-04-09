<script lang="ts" setup>
import { onMounted } from "vue";

import CheckInOutList from "./CheckInOutList.vue";
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
</script>

<template>
  <v-app style="background-color: #e7e7e7">
    <v-container style="background-color: #e7e7e7" fluid>
      <CheckInOutList></CheckInOutList>
    </v-container>
  </v-app>
</template>
<style scoped></style>
