<script lang="ts" setup>
import { useReceiptStore } from "@/stores/receipt";

const receiptStore = useReceiptStore();
</script>
<template>
  <v-dialog v-model="receiptStore.showDialog"
    ><v-card
      ><v-card-title>Receipt</v-card-title
      ><v-card-text
        ><v-container
          ><v-row
            v-for="item of receiptStore.lastReceipt?.recieptDetail"
            :key="item.rcd_id"
            >{{ item.rcd_name }}</v-row
          ></v-container
        ></v-card-text
      ></v-card
    ></v-dialog
  >
</template>
