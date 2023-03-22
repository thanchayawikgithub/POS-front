<script lang="ts" setup>
import { useReceiptStore } from "@/stores/receipt";

const receiptStore = useReceiptStore();
</script>
<template>
  <v-dialog v-model="receiptStore.showDialog" persistent width="650"
    ><v-card
      ><v-card-title>Receipt</v-card-title
      ><v-card-text
        ><v-table
          ><thead>
            <tr>
              <th class="text-center">Product Name</th>
              <th class="text-center">Product price</th>
              <th class="text-center">Amout</th>
              <th class="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in receiptStore.lastReceipt?.recieptDetail"
              :key="item.rcd_id"
            >
              <td class="text-center">{{ item.rcd_name }}</td>
              <td class="text-center">{{ item.rcd_price }}</td>
              <td class="text-center">{{ item.rcd_amount }}</td>
              <td class="text-center">{{ item.rcd_total }}</td>
            </tr>
          </tbody>
          <tfoot cols="12">
            <tr>
              Customer :
              {{
                receiptStore.lastReceipt?.customer.customer_name
              }}
            </tr>
            <tr>
              Total :
              {{
                receiptStore.lastReceipt?.rec_total
              }}
            </tr>
            <tr>
              Received :
              {{
                receiptStore.lastReceipt?.rec_received
              }}
            </tr>
            <tr>
              Changed :
              {{
                receiptStore.lastReceipt?.rec_changed
              }}
            </tr>
          </tfoot></v-table
        ></v-card-text
      >
      <v-card-actions
        ><v-btn @click="receiptStore.showDialog = false"
          >Close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
