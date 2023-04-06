<script lang="ts" setup>
import { useMessageStore } from "@/stores/message";

const messageStore = useMessageStore();
</script>
<template>
  <v-snackbar v-model="messageStore.isShow" multi-line>
    {{ messageStore.message }}

    <template v-slot:actions>
      <v-btn color="green" variant="text" @click="messageStore.isShow = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
