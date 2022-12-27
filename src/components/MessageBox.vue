<script setup lang="ts">
import { useMessageStore } from "@/stores/message";
const messageStore = useMessageStore();
</script>
<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="messageStore.isShow" :timeout="messageStore.timeout">
      {{ messageStore.message }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="messageStore.closeMessage">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped></style>
