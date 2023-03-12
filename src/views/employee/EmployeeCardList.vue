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
            width="100%"
            height="330px"
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
        ><v-card class="card">
          <v-card-title>
            Name:{{ item.employee_name }}({{
              item.employee_position
            }})</v-card-title
          ><v-card-subtitle>Tel:{{ item.employee_tel }}</v-card-subtitle>
          <v-card-text>
            Province:{{ item.employee_province }}<br />
            District:{{ item.employee_district }} <br />
            subdistrict:{{ item.employee_subdistrict }}<br />
            Email:{{ item.employee_email }}<br />
            Login:{{ item.employee_login }}<br />
            Password:{{ item.employee_password }}<br />
            Hourly:{{ item.employee_hourly_wage }}$
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              variant="flat"
              :icon="mdiPencil"
              color="secondary"
              class="ma-5"
              @click="employeeStore.editEmployee(item)"
            ></v-btn>
            <v-btn
              variant="flat"
              :icon="mdiDelete"
              color="error"
              class="ma-5"
              @click="
                (employeeStore.deleteDialog = true),
                  (employeeStore.checkDialog = item.employee_id!)
              "
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card {
  width: 100%;
  height: 330px;
  background: white;
  border-radius: 10px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
