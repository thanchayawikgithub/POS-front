<script lang="ts" setup>
import { useCheckInOutStore } from "@/stores/check-in-out";

const checkInOutStore = useCheckInOutStore();
</script>
<template>
  <v-dialog v-model="checkInOutStore.confirmDialog" persistent width="600"
    ><v-card
      ><v-card-text
        >Pay
        {{ checkInOutStore.empTotalWorkHours * checkInOutStore.empHourlyWage }}
        Bath to Employee :
        {{
          checkInOutStore.searchCheckInOuts[0]?.employee?.employee_name
        }}</v-card-text
      >
      <v-card-actions
        ><v-btn @click="checkInOutStore.PaySalaries()">Comfirm</v-btn
        ><v-btn @click="checkInOutStore.confirmDialog = false"
          >Close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
