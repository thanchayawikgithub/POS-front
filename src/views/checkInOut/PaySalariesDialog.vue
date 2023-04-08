<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { VForm } from "vuetify/components";
import { useCheckInOutStore } from "@/stores/check-in-out";
import type employee from "@/services/employee";
import { useEmployeeStore } from "@/stores/employee";
const form = ref<VForm | null>(null);

const checkInOutStore = useCheckInOutStore();
const employeeStore = useEmployeeStore();
onMounted(async () => {
  await employeeStore.getEmployees();
});
</script>

<template>
  <v-dialog v-model="checkInOutStore.paySalaryDialog" persistent width="600">
    <v-sheet
      elevation="15"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h5">Salary</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-select
                  :items="employeeStore.employees"
                  item-title="employee_id"
                  item-value="employee_id"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
                <v-btn>Ok</v-btn>
              </v-col>

              <v-col cols="12">
                <v-card-text class="text-center">$20000</v-card-text></v-col
              >
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider class="mb-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="checkInOutStore.paySalaryDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
