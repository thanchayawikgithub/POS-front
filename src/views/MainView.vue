<script setup lang="ts">
import { ref } from "vue";
import {
  mdiAccountMultiple,
  mdiStar,
  mdiAccount,
  mdiCart,
  mdiLogout,
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
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          :title="loginStore.loginName"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="mdiAccount"
          title="Users"
          value="users"
          to="/user"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiAccountMultiple"
          title="Shared with me"
          value="shared"
          to="/shared with me"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiStar"
          title="Starred"
          value="starred"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiCart"
          title="Cart"
          value="cart"
          to="/cart"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiLogout"
          title="Logout"
          value="Logout"
          @click="logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>
