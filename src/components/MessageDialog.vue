<script lang="ts" setup>
import { useMessageStore } from "@/stores/message";
import { mdiAlertBox } from "@mdi/js";
const messageStore = useMessageStore();
</script>
<template>
  <v-snackbar v-model="messageStore.isShow" multi-line>
    <v-icon color="red" class="mb-2">{{ mdiAlertBox }}</v-icon>
    {{ messageStore.message }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="messageStore.closeMessage">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
