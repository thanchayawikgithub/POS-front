<script lang="ts" setup>
import { useCheckInOutStore } from "@/stores/check-in-out";
import { mdiCommentProcessingOutline } from "@mdi/js";

const checkInOutStore = useCheckInOutStore();
</script>
<template>
  <v-dialog v-model="checkInOutStore.confirmDialog" persistent width="600"
    ><v-sheet
      elevation="15"
      max-width="800"
      rounded="lg"
      width="100%"
      class="pa-5 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h6">Confirm Pay Salaries</span>
      </v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-card-text
        class="pb-2"
        align="center
        "
        ><v-icon size="85">{{
          mdiCommentProcessingOutline
        }}</v-icon></v-card-text
      >

      <v-card-text
        align="center"
        style="font-size: 30px; font-weight: bold"
        class="pt-0"
      >
        Pay : ฿
        {{ checkInOutStore.empTotalWorkHours * checkInOutStore.empHourlyWage }}
        to Employee :
        {{
          checkInOutStore.searchCheckInOuts[0]?.employee?.employee_name
        }}</v-card-text
      >
      <v-divider class="mb-0"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="checkInOutStore.confirmDialog = false"
          >Close</v-btn
        >
        <v-btn
          color="green"
          @click="
            checkInOutStore.PaySalaries(),
              (checkInOutStore.paySalaryDialog = false)
          "
          >Comfirm</v-btn
        ></v-card-actions
      ></v-sheet
    ></v-dialog
  >
</template>
