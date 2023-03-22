<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";

const vendorStore = useVendorStore();
</script>
<template>
  <v-dialog v-model="vendorStore.dialog" persistent width="1000"
    ><v-card
      ><v-card-title>Buy Material</v-card-title
      ><v-card-text
        ><v-container
          ><v-row cols="12" align="center" justify="center" class="text-center"
            >Makro</v-row
          ><v-row></v-row></v-container></v-card-text></v-card
  ></v-dialog>
</template>
