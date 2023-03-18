<script setup lang="ts">
import { useOrderStore } from "@/stores/order";
const orderStore = useOrderStore();
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-btn
          style="height: 5vh; width: 20vw"
          rounded
          class="eiei"
          color="#df8057"
          @click="orderStore.payDialog = true"
          >PAY</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.eiei {
  color: rgb(0, 0, 0);
  font-weight: bold;
}
/* .v-btn {
  position: relative;
  background-color: #523c33;
  border-radius: 50px;
  box-shadow: #dac7b4 0px 4px 0px 0px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  color: #fff;
  border: none;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  overflow: hidden;
}

.v-btn::before {
  content: "";
  background-color: #dac7b4;
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: width 700ms ease-in-out;
  display: inline-block;
}

.v-btn:hover::before {
  width: 100%;
} */
</style>
