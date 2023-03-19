<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";

const customerStore = useCustomerStore();
</script>
<template>
  <v-dialog v-model="customerStore.searchDialog"
    ><v-card
      ><v-text-field v-model="customerStore.customerTel"></v-text-field>
      <v-card-actions
        ><v-btn
          @click="
            customerStore.searchCustomer(), (customerStore.customerTel = '')
          "
          >Search</v-btn
        >
        <v-btn
          @click="
            (customerStore.searchDialog = false),
              (customerStore.customerTel = '')
          "
          >Close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
