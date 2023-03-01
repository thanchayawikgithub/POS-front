<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import MaterialList from "./MaterialList.vue";
const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
</script>

<template>
  <MaterialDialog />
  <MaterialList />
</template>

<style scoped></style>
