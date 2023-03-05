<script setup lang="ts">
import { useUserStore } from "../../stores/user";
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
      <v-col cols="12" md="4"
        ><v-card>
          <v-btn height="200px" width="100%" class="text-h3" @click="addNew"
            >+</v-btn
          >
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        v-for="item in userStore.users"
        :key="item.user_id"
        ><v-card height="200px" width="100%">
          <v-card-title>
            {{ item.user_login }} ({{ item.user_id }})</v-card-title
          >
          <v-card-text>
            {{ item.user_name }} [{{ item.user_password }}]
          </v-card-text>
          <v-card-text>
            {{ item.user_role }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="error"
              @click="
                (userStore.deleteDialog = true),
                  (userStore.checkDialog = item.user_id!)
              "
              >Delete</v-btn
            >

            <v-btn color="secondary" @click="editUser(item)"> Edit </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
