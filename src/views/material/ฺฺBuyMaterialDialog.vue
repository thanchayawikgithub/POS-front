<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";

const vendorStore = useVendorStore();
</script>
<template>
  <v-dialog v-model="vendorStore.dialog"
    ><v-card
      ><v-card-title>Buy Material</v-card-title
      ><v-card-text
        ><v-container style="background-color: antiquewhite"
          ><v-row>
            <v-col
              ><v-row
                v-for="vendor of vendorStore.vendorMats"
                :key="vendor.vendor_id"
                >{{ vendor.vendor_name }}
                <v-combobox
                  label=""
                  :items="vendor.vendorMat"
                  item-title="v_mat_name"
                  item-value="v_mat_id"
                  variant="underlined"
                ></v-combobox
              ></v-row>
            </v-col>
            <v-col
              ><v-row><v-col>AA</v-col></v-row>
              <v-row><v-col>BB</v-col></v-row></v-col
            ></v-row
          ></v-container
        ></v-card-text
      ></v-card
    ></v-dialog
  >
</template>
