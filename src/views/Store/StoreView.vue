<script lang="ts" setup>
import { useStoreStore } from "@/stores/Store";
import StoreList from "@/views/Store/StoreList.vue";
import { onMounted } from "vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import StoreCard from "@/views/Store/StoreCardList.vue";

const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.getStore();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <StoreList v-if="storeStore.isTable"></StoreList>
        <StoreCard v-if="!storeStore.isTable"></StoreCard>
        <StoreDialog></StoreDialog>
      </v-row>

      <v-row class="justify-center">
        <v-btn :icon="mdiTable" flat @click="storeStore.isTable = true">
        </v-btn>
        <v-btn
          :icon="mdiCardOutline"
          flat
          @click="storeStore.isTable = false"
        ></v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>
<style scoped></style>
