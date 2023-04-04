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
  <v-container style="background-color: #e7e7e7" fluid>
    <CustomerList></CustomerList>
    <CustomerDialog></CustomerDialog>
    <CustomerCheckDialog></CustomerCheckDialog>
  </v-container>
</template>
<style scoped></style>
