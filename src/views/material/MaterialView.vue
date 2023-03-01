<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import MaterialList from "./MaterialList.vue";
import MaterialCardList from "./MaterialCardList.vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";
const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
</script>

<template>
  <v-container>
    <v-row>
      <MaterialList v-if="materialStore.isTable"></MaterialList>
      <MaterialCardList v-if="!materialStore.isTable"></MaterialCardList>
      <MaterialDialog></MaterialDialog>
    </v-row>
    <v-row class="justify-center">
      <v-btn :icon="mdiTable" flat @click="materialStore.isTable = true">
      </v-btn>
      <v-btn
        :icon="mdiCardOutline"
        flat
        @click="materialStore.isTable = false"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
