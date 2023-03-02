<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import CustomerList from "./CustomerList.vue";
import { onMounted } from "vue";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import CustomerCard from "./CustomerCard.vue";
import CustomerDialog from "./CustomerDialog.vue";

const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-container>
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
  </v-container>
</template>
<style scoped></style>
