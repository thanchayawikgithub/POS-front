<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const orderStore = useOrderStore();
const reveal = ref(false);
const cash = ref(false);
</script>

<template>
  <v-dialog v-model="orderStore.payDialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Pay</span>
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="6" align="right">
            <v-card>
              <v-card-actions
                ><v-btn
                  style="height: 20vh; width: 10vw"
                  @click="
                    reveal = true;
                    cash = false;
                  "
                  >QR</v-btn
                ></v-card-actions
              >
              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="v-card--reveal"
                  style="height: 100%"
                >
                  <v-card-text class="pb-0">
                    <p class="text-h4 text--primary">Origin</p>
                    <p>
                      late 16th century (as a noun denoting a place where alms
                      were distributed): from medieval Latin eleemosynarius,
                      from late Latin eleemosyna ‘alms’, from Greek eleēmosunē
                      ‘compassion’
                    </p>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn
                      variant="text"
                      color="teal-accent-4"
                      @click="
                        reveal = false;
                        cash = true;
                      "
                    >
                      ปิด
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>

          <v-col cols="6"
            ><v-btn style="height: 20vh; width: 10vw" v-if="cash"
              >Cash</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="orderStore.payDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
