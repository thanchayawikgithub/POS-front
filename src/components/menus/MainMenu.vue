<script setup lang="ts">
import {
  mdiFaceMan,
  mdiStorefront,
  mdiCart,
  mdiLogout,
  mdiStoreEditOutline,
  mdiFaceAgent,
  mdiGlassCocktail,
  mdiReceiptTextOutline,
  mdiHomeOutline,
  mdiTextBoxEditOutline,
  mdiReceiptTextCheckOutline,
} from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
import { useEmployeeStore } from "@/stores/employee";

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
const employee: { employee_name: string; employee_position: string } =
  authStore.getEmployee();
const employeeStore = useEmployeeStore();
</script>

<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #a4907c">
    <v-list>
      <v-list-item
        style="color: #e8e4e1"
        prepend-avatar="./public/dc.png"
        :title="employee.employee_name"
        :subtitle="employee.employee_position"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        :prepend-icon="mdiHomeOutline"
        title="Home"
        value="Home"
        to="/"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        v-if="employee.employee_position === 'Owner'"
        :prepend-icon="mdiFaceMan"
        title="Customer"
        value="customer"
        to="/customers"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        v-if="employee.employee_position === 'Owner'"
        :prepend-icon="mdiStorefront"
        title="Store"
        value="store"
        to="/stores"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCart"
        title="Point of sell"
        value="pos"
        to="/pos"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        v-if="employee.employee_position === 'Owner'"
        :prepend-icon="mdiGlassCocktail"
        title="Product"
        value="product"
        to="/products"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        v-if="employee.employee_position === 'Owner'"
        :prepend-icon="mdiReceiptTextOutline"
        title="Receipt"
        value="receipt"
        to="/receipts"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStoreEditOutline"
        title="Material"
        value="Material"
        to="/materials"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        v-if="employee.employee_position === 'Owner'"
        :prepend-icon="mdiReceiptTextCheckOutline"
        title="Bill"
        value="Bill"
        to="/bills"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiFaceAgent"
        v-if="employee.employee_position === 'Owner'"
        title="Employee"
        value="Employee"
        to="/employees"
        style="color: #e8e4e1"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiTextBoxEditOutline"
        v-if="employee.employee_position === 'Owner'"
        title="CheckInOut"
        value="CheckInOut"
        to="/checkInOut"
        style="color: #e8e4e1"
      ></v-list-item>

      <v-list-item
        :prepend-icon="mdiLogout"
        title="Logout"
        value="Logout"
        @click="logout"
        style="color: #905858"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
