<script setup lang="ts">
import { useEmployeeStore } from "../../stores/employee";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { onMounted } from "vue";
const employeeStore = useEmployeeStore();

onMounted(async () => {
  await employeeStore.getEmployees();
});
const addNew = () => {
  employeeStore.dialog = true;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4"
        ><v-card>
          <v-btn
            height="200px"
            width="100%"
            class="text-h3"
            style="background-color: #af9070"
            @click="addNew"
            >+</v-btn
          >
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        v-for="item in employeeStore.employees"
        :key="item.employee_id"
        ><v-card height="200px" width="100%">
          <v-card-title>
            NO.{{ item.employee_id }}({{ item.employee_id }})</v-card-title
          >
          <v-card-text>
            (Min:{{ item.employee_id }})( Qty:{{ item.employee_id }}) ( Unit:{{
              item.employee_id
            }})
          </v-card-text>
          <v-card-text>(Price Per Unit:{{ item.employee_id }}$)</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              :prepend-icon="mdiDelete"
              color="error"
              @click="
                (employeeStore.deleteDialog = true),
                  (employeeStore.checkDialog = item.employee_id!)
              "
              >Delete</v-btn
            >

            <v-btn
              :prepend-icon="mdiPencil"
              color="secondary"
              @click="employeeStore.editEmployee(item)"
            >
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
