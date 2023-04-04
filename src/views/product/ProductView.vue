<script lang="ts" setup>
import { useProductStore } from "@/stores/product";

import { onMounted } from "vue";
import ProductList from "./ProductList.vue";
import ProductCheckDialog from "./ProductCheckDialog.vue";

const productsStore = useProductStore();
onMounted(async () => {
  await productsStore.getProducts();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <ProductList></ProductList>
        <ProductCheckDialog></ProductCheckDialog>
      </v-row>
    </v-container>
  </v-app>
</template>
