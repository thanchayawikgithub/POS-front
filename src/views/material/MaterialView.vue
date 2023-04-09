<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import MaterialList from "./MaterialList.vue";
import BuyMaterialDialog from "./ฺฺBuyMaterialDialog.vue";
import MaterialCheckDialog from "./MaterialCheckDialog.vue";
import ConfirmDialogVue from "./ConfirmDialog.vue";
import ReceiptMaterrialDialog from "./ReceiptMaterrialDialog.vue";

const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
</script>

<template>
  <v-app style="background-color: #e7e7e7">
    <v-container style="background-color: #e7e7e7" fluid>
      <ReceiptMaterrialDialog></ReceiptMaterrialDialog>
      <BuyMaterialDialog></BuyMaterialDialog>
      <ConfirmDialogVue></ConfirmDialogVue>
      <MaterialList></MaterialList>

      <MaterialCheckDialog></MaterialCheckDialog>
      <MaterialDialog></MaterialDialog>
    </v-container>
  </v-app>
</template>

<style scoped></style>
