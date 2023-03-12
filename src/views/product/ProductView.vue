<script lang="ts" setup>
import { useProductStore } from "@/stores/product";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import { onMounted } from "vue";
import ProductList from "./ProductList.vue";

const productsStore = useProductStore();
onMounted(async () => {
  await productsStore.getProducts();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <ProductList v-if="productsStore.isTable"></ProductList>
        <StoreDialog></StoreDialog>
      </v-row>

      <v-row class="justify-center">
        <v-btn :icon="mdiTable" flat @click="productsStore.isTable = true">
        </v-btn>
        <v-btn
          :icon="mdiCardOutline"
          flat
          @click="productsStore.isTable = false"
        ></v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>
