<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import MaterialList from "./MaterialList.vue";
import BuyMaterialDialog from "./ฺฺBuyMaterialDialog.vue";
import MaterialCheckDialog from "./MaterialCheckDialog.vue";
const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <BuyMaterialDialog></BuyMaterialDialog>
        <MaterialList></MaterialList>

        <MaterialCheckDialog></MaterialCheckDialog>
        <MaterialDialog></MaterialDialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped></style>
