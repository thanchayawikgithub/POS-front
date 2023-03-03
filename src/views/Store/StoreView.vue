<script lang="ts" setup>
import { useStoreStore } from "@/stores/Store";
import StoreList from "./StoreList.vue";
import { onMounted } from "vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import StoreCrad from "./StoreCrad.vue";

const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.getStore();
});
</script>

<template>
  <v-container>
    <v-row>
      <StoreList v-if="storeStore.isTable"></StoreList>
      <StoreCrad v-if="!storeStore.isTable"></StoreCrad>
      <StoreDialog></StoreDialog>
    </v-row>

    <v-row class="justify-center">
      <v-btn :icon="mdiTable" flat @click="storeStore.isTable = true"> </v-btn>
      <v-btn
        :icon="mdiCardOutline"
        flat
        @click="storeStore.isTable = false"
      ></v-btn>
    </v-row>
  </v-container>
</template>
<style scoped></style>
