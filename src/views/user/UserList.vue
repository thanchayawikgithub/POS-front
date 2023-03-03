<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { onMounted } from "vue";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
const userStore = useUserStore();

const addNew = () => {
  userStore.dialog = true;
};

onMounted(async () => {
  await userStore.getUsers();
});
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
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userStore.users" :key="item.user_id">
              <td>{{ item.user_id }}</td>
              <td>{{ item.user_login }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.user_password }}</td>
              <td>{{ item.user_role }}</td>
              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="userStore.editUser(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="userStore.deleteUser(item.user_id!)"
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
