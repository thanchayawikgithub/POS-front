<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
</script>
<template>
  <v-dialog v-model="orderStore.successDialog" persistent width="600">
    <v-card width="40vw" height="45vh">
      <v-container>
        <v-row>
          <v-col cols="12" align="center" style="font-size: 35px"
            >Success
          </v-col>
        </v-row>
        <v-row><v-img src="./public/cc.png" height="100px"></v-img></v-row>
        <v-row>
          <v-col cols="12" align="center" style="font-size: 40px"
            >Change :{{ orderStore.changed }}
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions
        ><v-spacer></v-spacer
        ><v-btn color="blue-darken-1" @click="orderStore.successDialog = false"
          >close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
