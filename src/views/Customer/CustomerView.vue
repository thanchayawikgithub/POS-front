<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import CustomerList from "@/views/Customer/CustomerList.vue";
import { onMounted } from "vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";

import CustomerDialog from "@/views/Customer/CustomerDialog.vue";
import CustomerCard from "@/views/Customer/CustomerCard.vue";
import CustomerCheckDialog from "@/views/Customer/CustomerCheckDialog.vue";

const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-container justify="center">
    <v-row>
      <CustomerList v-if="customerStore.isTable"></CustomerList>
      <CustomerCard v-if="!customerStore.isTable"></CustomerCard>

      <CustomerDialog></CustomerDialog>
      <CustomerCheckDialog></CustomerCheckDialog>
    </v-row>
    <v-row class="justify-center">
      <v-btn :icon="mdiTable" flat @click="customerStore.isTable = true">
      </v-btn>
      <v-btn
        :icon="mdiCardOutline"
        flat
        @click="customerStore.isTable = false"
      ></v-btn> </v-row
  ></v-container>
</template>
<style scoped></style>
