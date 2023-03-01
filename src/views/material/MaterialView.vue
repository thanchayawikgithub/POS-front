<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";

const materialStore = useMaterialStore();
</script>

<template>
  <div>{{ materialStore.materials }}</div>
</template>

<style scoped></style>
