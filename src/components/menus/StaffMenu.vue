<script setup lang="ts">
import {
  mdiFaceMan,
  mdiStorefront,
  mdiCart,
  mdiLogout,
  mdiStoreEditOutline,
  mdiGlassCocktail,
} from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #84776f">
    <v-list>
      <v-list-item
        style="color: bisque"
        prepend-avatar="./public/than.png"
        title="Staff@gmail.com"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        :prepend-icon="mdiFaceMan"
        title="Customer"
        value="customer"
        to="/customers"
        style="color: bisque"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStorefront"
        title="Store"
        value="store"
        to="/stores"
        style="color: bisque"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCart"
        title="Point of sell"
        value="pos"
        to="/pos"
        style="color: bisque"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiGlassCocktail"
        title="Product"
        value="product"
        to="/products"
        style="color: bisque"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStoreEditOutline"
        title="Material"
        value="Material"
        to="/materials"
        style="color: bisque"
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
