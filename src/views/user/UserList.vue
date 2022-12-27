<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import type User from "@/types/User";
const userStore = useUserStore();
const deleteUser = (index: number): void => {
  userStore.deleteUser(index);
};
const addNew = () => {
  userStore.dialog = true;
};
const editUser = (user: User) => {
  userStore.editUser(user);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="3" offset="9">
        <v-btn color="primary" :prepend-icon="mdiPlus" @click="addNew"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row cols="12">
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>login</th>
              <th>name</th>
              <th>password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userStore.users" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.login }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.password }}</td>
              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="editUser(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="deleteUser(item.id)"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
