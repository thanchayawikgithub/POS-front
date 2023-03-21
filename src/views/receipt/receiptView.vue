<script lang="ts" setup>
import { useReceiptStore } from "@/stores/receipt";
import { onMounted } from "vue";

const receiptStore = useReceiptStore();
onMounted(async () => {
  await receiptStore.getReceipts();
  console.log(receiptStore.receipts);
});
</script>
<template>
  <div></div>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">Date</th>
              <th class="text-center">Store Name</th>
              <th class="text-center">Employee Name</th>
              <th class="text-center">Customer Name</th>
              <th class="text-center">Payment Method</th>
              <th class="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of receiptStore.receipts" :key="item.rec_id">
              <td class="text-center">{{ item.rec_id }}</td>
              <td class="text-center">{{ item.rec_createdAt }}</td>
              <td class="text-center">{{ item.store.store_name }}</td>
              <td class="text-center">{{ item.employee.employee_name }}</td>
              <td class="text-center">{{ item.customer.customer_name }}</td>
              <td class="text-center">{{ item.rec_payment }}</td>
              <td class="text-center">{{ item.rec_total }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
