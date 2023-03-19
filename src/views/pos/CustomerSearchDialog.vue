<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { mdiPhone } from "@mdi/js";
const customerStore = useCustomerStore();
</script>
<template>
  <v-dialog v-model="customerStore.searchDialog" persistent width="600"
    ><v-card
      ><v-card-title> <span class="text-h5">Search Member</span> </v-card-title
      ><v-container
        ><v-row
          ><v-col align="center" cols="12"
            ><v-text-field
              style="width: 25vw"
              v-model="customerStore.customerTel"
              :prepend-inner-icon="mdiPhone"
              label="Phone Number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions
        ><v-spacer></v-spacer
        ><v-btn
          color="blue-darken-1"
          @click="
            customerStore.searchCustomer(), (customerStore.customerTel = '')
          "
          >Search</v-btn
        >
        <v-btn
          color="red-darken-1"
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
