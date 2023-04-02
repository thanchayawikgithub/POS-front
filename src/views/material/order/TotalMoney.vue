<script setup lang="ts">
import { useCustomerStore } from "@/stores/customer";
import { useVendorStore } from "@/stores/vendor";

const vendorStore = useVendorStore();
const customerStore = useCustomerStore();
</script>
<template>
  <!-- <v-container>
    <v-row class="text-center">
      <v-col
        ><v-btn
          style="width: 13vw"
          rounded
          color="#f6ad8d"
          class="font-btn"
          @click="customerStore.dialog = true"
        >
          Register Member
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          style="width: 13vw"
          rounded
          color="#f6ad8d"
          class="font-btn"
          @click="customerStore.searchDialog = true"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-container> -->
  <v-table style="width: 35vw; height: 24vh">
    <tbody>
      <!-- <tr>
        <td style="width: 100%">Member :</td>
        <td class="text-lg-right">
          {{ customerStore.customer?.customer_name }}
        </td>
        <td class="text-lg-right"></td>
      </tr> -->
      <tr>
        <td>Price :</td>
        <td class="text-lg-right">{{ vendorStore.totalPrice }}</td>
        <td class="text-lg-right">Baht</td>
      </tr>
      <!-- <tr>
        <td>Discount :</td>
        <td class="text-lg-right">0</td>
        <td class="text-lg-right">Baht</td>
      </tr> -->
      <tr>
        <td>Total :</td>
        <td class="text-lg-right">{{ vendorStore.totalPrice }}</td>
        <td class="text-lg-right">Baht</td>
      </tr>
    </tbody>
  </v-table>
</template>
<style scoped>
.font-btn {
  font-weight: bold;
}
td {
  font-weight: bold;
}
</style>
