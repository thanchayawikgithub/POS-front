<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import CustomerList from "@/views/Customer/CustomerList.vue";
import { onMounted } from "vue";

import CustomerDialog from "@/views/Customer/CustomerDialog.vue";

import CustomerCheckDialog from "@/views/Customer/CustomerCheckDialog.vue";

const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-container justify="center">
    <v-row>
      <CustomerList></CustomerList>
      <CustomerDialog></CustomerDialog>
      <CustomerCheckDialog></CustomerCheckDialog>
    </v-row>
  </v-container>
</template>
<style scoped></style>
