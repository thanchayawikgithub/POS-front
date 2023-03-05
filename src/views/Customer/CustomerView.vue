<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import CustomerList from "./CustomerList.vue";
import { onMounted } from "vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";

import CustomerDialog from "./CustomerDialog.vue";
import CustomerCard from "./CustomerCard.vue";

const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-app>
    <v-row>
      <CustomerList v-if="customerStore.isTable"></CustomerList>
      <CustomerCard v-if="!customerStore.isTable"></CustomerCard>

      <CustomerDialog></CustomerDialog>
    </v-row>
    <v-row class="justify-center">
      <v-btn :icon="mdiTable" flat @click="customerStore.isTable = true">
      </v-btn>
      <v-btn
        :icon="mdiCardOutline"
        flat
        @click="customerStore.isTable = false"
      ></v-btn>
    </v-row>
  </v-app>
</template>
<style scoped></style>
