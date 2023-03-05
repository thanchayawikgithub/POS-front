<!-- <script setup lang="ts">
import { ref } from "vue";
import {
  mdiFaceMan,
  mdiStar,
  mdiAccount,
  mdiCart,
  mdiLogout,
  mdiStoreEditOutline,
  mdiFaceAgent,
} from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
const loginStore = useAuthStore();

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
          :title="loginStore.authName"
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
          title="Customers"
          value="customers"
          to="/customer"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiStar"
          title="Stores"
          value="stores"
          to="/stores"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiCart"
          title="Carts"
          value="carts"
          to="/cart"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiStoreEditOutline"
          title="Materials"
          value="Materials"
          to="/material"
          style="color: bisque"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiFaceAgent"
          title="Employees"
          value="Employees"
          to="/employee"
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
</template> -->
