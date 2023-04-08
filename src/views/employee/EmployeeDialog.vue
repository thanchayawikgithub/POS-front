<script lang="ts" setup>
import { useEmployeeStore } from "@/stores/employee";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const employeeStore = useEmployeeStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await employeeStore.saveEmployee();
  }
}
</script>
<template>
  <v-dialog v-model="employeeStore.dialog" persistent width="1024">
    <v-sheet
      elevation="15"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title class="text-center">
        <span class="text-h5">Employee Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="employeeStore.editedEmployee.employee_name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                    (v) => v.length <= 32 || 'Length must be shorter 32',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Province*"
                  required
                  v-model="employeeStore.editedEmployee.employee_province"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="District*"
                  required
                  v-model="employeeStore.editedEmployee.employee_district"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Subdistrict*"
                  required
                  v-model="employeeStore.editedEmployee.employee_subdistrict"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Tel*"
                  required
                  v-model="employeeStore.editedEmployee.employee_tel"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 10 || 'Your number is invalid',
                    (v) => v.length <= 10 || 'Your number is invalid',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="employeeStore.editedEmployee.employee_email"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => /^[^@]+@\w+(\.\w+)+\w$/.test(v) || 'Invalid e-mail',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Login*"
                  v-model="employeeStore.editedEmployee.employee_login"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 5 || 'Length must more than 5',
                  ]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="employeeStore.editedEmployee.employee_password"
                  type="password"
                  required
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 8 || 'Length must more than 8',
                    (v) =>
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                        v
                      ) ||
                      'Password must contain uppercase letters and special characters.',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Position*"
                  required
                  v-model="employeeStore.editedEmployee.employee_position"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Hourly Wage*"
                  required
                  v-model="employeeStore.editedEmployee.employee_hourly_wage"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider class="mb-0"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="employeeStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-dialog>
</template>
