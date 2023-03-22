<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";

const vendorStore = useVendorStore();
</script>
<template>
  <v-dialog v-model="vendorStore.dialog"
    ><v-card
      ><v-card-title>Buy Material</v-card-title
      ><v-card-text
        ><v-container
          ><v-row
            v-for="vendor of vendorStore.vendorMats"
            :key="vendor.vendor_id"
            >{{ vendor.vendor_name }}</v-row
          ></v-container
        ></v-card-text
      ></v-card
    ></v-dialog
  >
</template>
