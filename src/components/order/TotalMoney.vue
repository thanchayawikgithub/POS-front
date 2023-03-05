<script setup lang="ts">
import { useCustomerStore } from "@/stores/customer";
import { useProductStore } from "@/stores/product";
import CustomerDialog from "@/views/customer/CustomerDialog.vue";

const productStore = useProductStore();
const customerStore = useCustomerStore();
</script>
<template>
  <CustomerDialog />
  <v-container>
    <v-row class="text-center">
      <v-col
        ><v-btn
          style="width: 12vw"
          rounded
          color="#B86824"
          class="font-btn"
          @click="customerStore.dialog = true"
        >
          Register Member
        </v-btn>
      </v-col>
      <v-col>
        <v-btn style="width: 13vw" rounded color="#EA9A56" class="font-btn">
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-table style="background-color: #af9070; width: 30vw; height: 25vh">
    <tbody>
      <tr>
        <td style="width: 70%">Member :</td>
        <td class="text-lg-right">12345678</td>
        <td class="text-lg-right"></td>
      </tr>
      <tr>
        <td>Price :</td>
        <td class="text-lg-right">{{ productStore.totalPrice }}</td>
        <td class="text-lg-right">Baht</td>
      </tr>
      <tr>
        <td>Discount :</td>
        <td class="text-lg-right">0</td>
        <td class="text-lg-right">Baht</td>
      </tr>
      <tr>
        <td>Total :</td>
        <td class="text-lg-right">{{ productStore.totalPrice }}</td>
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
