<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { mdiPhone } from "@mdi/js";
const customerStore = useCustomerStore();
</script>
<template>
  <v-dialog v-model="customerStore.searchDialog" persistent width="600"
    ><v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
    >
      <v-card-title> <span class="text-h5">Search Member</span> </v-card-title
      ><v-container
        ><v-row
          ><v-col align="center" cols="12"
            ><v-text-field
              style="width: 25vw"
              v-model="customerStore.customerTel"
              :prepend-inner-icon="mdiPhone"
              label="Phone Number"
              :rules="[
                (v) => !!v || 'Item is required',
                (v) => v.length == 10 || 'Length must be equal to 10',
              ]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mb-1"></v-divider>
      <v-card-actions class="mb-0"
        ><v-spacer></v-spacer>
        <v-btn
          color="red-darken-1"
          @click="
            (customerStore.searchDialog = false),
              (customerStore.customerTel = '')
          "
          >Close</v-btn
        >
        <v-btn
          color="blue-darken-1"
          @click="
            customerStore.searchCustomer(), (customerStore.customerTel = '')
          "
          >Search</v-btn
        >
      </v-card-actions></v-sheet
    ></v-dialog
  >
</template>
<style scoped></style>
