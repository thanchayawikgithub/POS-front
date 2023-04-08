<script lang="ts" setup>
import { onMounted } from "vue";

import CheckInOutList from "./CheckInOutList.vue";
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
</script>

<template>
  <v-container style="background-color: #e7e7e7" fluid class="h-screen">
    <CheckInOutList></CheckInOutList>
  </v-container>
</template>
<style scoped></style>
