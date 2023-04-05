<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";

const customerStore = useCustomerStore();
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="customerStore.deleteDialog" persistent width="600">
      <v-card>
        <v-card-title> Delete data. </v-card-title>
        <v-card-text class="text-h5" style="color: red">
          Are you sure you want to delete!!!</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="text"
            @click="customerStore.deleteDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="
              customerStore.deleteCustomer(customerStore.checkDialog),
                (customerStore.deleteDialog = false)
            "
            >ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
