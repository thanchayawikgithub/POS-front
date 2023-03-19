<script lang="ts" setup>
import { useStoreStore } from "@/stores/Store";
import StoreList from "@/views/Store/StoreList.vue";
import { onMounted } from "vue";

const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.getStore();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <StoreList></StoreList>

        <StoreDialog></StoreDialog>
      </v-row>
    </v-container>
  </v-app>
</template>
<style scoped></style>
