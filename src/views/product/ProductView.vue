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
  <v-app style="background-color: #e7e7e7">
    <v-container style="background-color: #e7e7e7" fluid>
      <ProductList></ProductList>
      <ProductCheckDialog></ProductCheckDialog>
    </v-container>
  </v-app>
</template>
