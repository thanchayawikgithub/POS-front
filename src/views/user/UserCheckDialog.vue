<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="userStore.deleteDialog" persistent width="600">
      <v-card>
        <v-card-title class="text-h5"> Delete data. </v-card-title>
        <v-card-text> Are you sure you want to delete!!!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="text"
            @click="userStore.deleteDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="
              userStore.deleteUser(userStore.checkDialog),
                (userStore.deleteDialog = false)
            "
            >ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
