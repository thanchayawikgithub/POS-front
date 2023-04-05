<script lang="ts" setup>
import receipt from "@/services/receipt";
import { useProductStore } from "@/stores/product";
import { useReceiptStore } from "@/stores/receipt";

const receiptStore = useReceiptStore();
const productStore = useProductStore();
</script>
<template>
  <v-dialog v-model="receiptStore.showDialog" persistent width="650"
    ><v-card class="receipt">
      <v-card-title></v-card-title>
      <v-card-title
        style="font-size: 40px; font-weight: 800; text-align: center"
        >D-Coffee</v-card-title
      ><v-card-text style="font-size: 16px; font-weight: 400" class="pb-0 pt-1"
        >Here is your receipt: TAX ID #{{
          receiptStore.lastReceipt?.rec_id
        }}</v-card-text
      ><v-card-text style="font-size: 14px; font-weight: 400" class="pb-0 pt-0"
        >Date:
        {{
          JSON.stringify(receiptStore.lastReceipt?.rec_createdAt).substring(
            1,
            11
          )
        }}
        {{
          JSON.stringify(receiptStore.lastReceipt?.rec_createdAt).substring(
            12,
            17
          )
        }}</v-card-text
      >
      <v-card-text style="font-size: 14px; font-weight: 400" class="pt-0 pb-0">
        Customer :
        {{ receiptStore.lastReceipt?.customer.customer_name }}
      </v-card-text>

      <v-card-text
        ><v-card-text class="receipt__line"></v-card-text
        ><v-card style="height: 280px; overflow-y: auto" flat
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
                <td class="text-center">
                  {{ item.rcd_price }}
                </td>
                <td class="text-center">{{ item.rcd_amount }}</td>
                <td class="text-center">{{ item.rcd_total }}</td>
              </tr>
            </tbody>
          </v-table></v-card
        >
        <v-card-text class="receipt__line mb-1"></v-card-text>
        <tfoot cols="12">
          <tr style="font-size: 17px; font-weight: 600">
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
          <tr style="font-size: 18px; font-weight: 600">
            Changed :
            {{
              receiptStore.lastReceipt?.rec_changed
            }}
          </tr>
        </tfoot>
        <v-card-text class="receipt__line mt-2"></v-card-text
      ></v-card-text>
      <v-card-text style="text-align: center">Thank you!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer
        ><v-btn @click="receiptStore.showDialog = false"
          >Close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
<style>
.receipt {
  width: 30em;
  position: relative;
  flex: none;
  padding: 12px 0;
  background: #fff;
  -webkit-clip-path: polygon(
    100% 0,
    100% calc(100% - 6px),
    98% 100%,
    96% calc(100% - 6px),
    94% 100%,
    92% calc(100% - 6px),
    90% 100%,
    88% calc(100% - 6px),
    86% 100%,
    84% calc(100% - 6px),
    82% 100%,
    80% calc(100% - 6px),
    78% 100%,
    76% calc(100% - 6px),
    74% 100%,
    72% calc(100% - 6px),
    70% 100%,
    68% calc(100% - 6px),
    66% 100%,
    64% calc(100% - 6px),
    62% 100%,
    60% calc(100% - 6px),
    58% 100%,
    56% calc(100% - 6px),
    54% 100%,
    52% calc(100% - 6px),
    50% 100%,
    48% calc(100% - 6px),
    46% 100%,
    44% calc(100% - 6px),
    42% 100%,
    40% calc(100% - 6px),
    38% 100%,
    36% calc(100% - 6px),
    34% 100%,
    32% calc(100% - 6px),
    30% 100%,
    28% calc(100% - 6px),
    26% 100%,
    24% calc(100% - 6px),
    22% 100%,
    20% calc(100% - 6px),
    18% 100%,
    16% calc(100% - 6px),
    14% 100%,
    12% calc(100% - 6px),
    10% 100%,
    8% calc(100% - 6px),
    6% 100%,
    4% calc(100% - 6px),
    2% 100%,
    0 calc(100% - 6px),
    0 0
  );
  clip-path: polygon(
    100% 0,
    100% calc(100% - 6px),
    98% 100%,
    96% calc(100% - 6px),
    94% 100%,
    92% calc(100% - 6px),
    90% 100%,
    88% calc(100% - 6px),
    86% 100%,
    84% calc(100% - 6px),
    82% 100%,
    80% calc(100% - 6px),
    78% 100%,
    76% calc(100% - 6px),
    74% 100%,
    72% calc(100% - 6px),
    70% 100%,
    68% calc(100% - 6px),
    66% 100%,
    64% calc(100% - 6px),
    62% 100%,
    60% calc(100% - 6px),
    58% 100%,
    56% calc(100% - 6px),
    54% 100%,
    52% calc(100% - 6px),
    50% 100%,
    48% calc(100% - 6px),
    46% 100%,
    44% calc(100% - 6px),
    42% 100%,
    40% calc(100% - 6px),
    38% 100%,
    36% calc(100% - 6px),
    34% 100%,
    32% calc(100% - 6px),
    30% 100%,
    28% calc(100% - 6px),
    26% 100%,
    24% calc(100% - 6px),
    22% 100%,
    20% calc(100% - 6px),
    18% 100%,
    16% calc(100% - 6px),
    14% 100%,
    12% calc(100% - 6px),
    10% 100%,
    8% calc(100% - 6px),
    6% 100%,
    4% calc(100% - 6px),
    2% 100%,
    0 calc(100% - 6px),
    0 0
  );
}
.receipt__line {
  margin-top: 1px;
  padding: 1px;
  border-top: 1px dashed #bdc2b9;
}
</style>
