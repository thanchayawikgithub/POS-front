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
} from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
const employee: { employee_name: string; employee_email: string } =
  authStore.getEmployee();
</script>

<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #655a54">
    <v-list>
      <v-list-item
        style="color: #f0e3dd"
        prepend-avatar="./public/than.png"
        :title="employee.employee_name"
        :subtitle="employee.employee_email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        :prepend-icon="mdiHomeOutline"
        title="Home"
        value="Home"
        to="/"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiFaceMan"
        title="Customer"
        value="customer"
        to="/customers"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStorefront"
        title="Store"
        value="store"
        to="/stores"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCart"
        title="Point of sell"
        value="pos"
        to="/pos"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiGlassCocktail"
        title="Product"
        value="product"
        to="/products"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiReceiptTextOutline"
        title="Receipt"
        value="receipt"
        to="/receipt"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStoreEditOutline"
        title="Material"
        value="Material"
        to="/materials"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiFaceAgent"
        title="Employee"
        value="Employee"
        to="/employees"
        style="color: #f0e3dd"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiLogout"
        title="Logout"
        value="Logout"
        @click="logout"
        style="color: #ef4949"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
