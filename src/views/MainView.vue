<script setup lang="ts">
import { ref } from "vue";
import {
  mdiFaceMan,
  mdiStar,
  mdiAccount,
  mdiCart,
  mdiLogout,
  mdiStoreEditOutline,
} from "@mdi/js";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();

const theme = ref("light");

const logout = () => {
  loginStore.logout();
};
</script>

<template>
  <v-app :theme="theme">
    <v-navigation-drawer expand-on-hover rail style="background-color: #685444">
      <v-list>
        <v-list-item
          style="color: bisque"
          prepend-avatar="./public/than.png"
          :title="loginStore.loginName"
          subtitle="wanonvonteen@gmail.com"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="mdiAccount"
          title="Users"
          value="users"
          to="/user"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiFaceMan"
          title="Customer"
          value="customer"
          to="/customers"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiStar"
          title="Starred"
          value="starred"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiCart"
          title="Cart"
          value="cart"
          to="/cart"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiStoreEditOutline"
          title="Material"
          value="Material"
          to="/material"
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
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>
