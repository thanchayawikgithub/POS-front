<script setup lang="ts">
import { useMessageStore } from "@/stores/message";
import { mdiCheckCircle } from "@mdi/js";
const messageStore = useMessageStore();
</script>
<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="messageStore.isShoww" :timeout="messageStore.timeout">
      <v-icon color="green" class="mb-2">{{ mdiCheckCircle }}</v-icon>
      {{ messageStore.message }}

      <template v-slot:actions>
        <v-btn
          color="green"
          variant="text"
          @click="messageStore.isShoww = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped></style>
