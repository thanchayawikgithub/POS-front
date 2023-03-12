<script setup lang="ts">
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";

const productsStore = useProductStore();
onMounted(async () => {
  await productsStore.getProducts();
});
</script>

<template>
  <div></div>
</template>
