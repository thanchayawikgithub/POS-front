<script lang="ts">
export default {
  data() {
    return {
      tab: "Menu",
      type: ["Drink", "Bakery", "Food"],
      drink: [{ name: "Coffee" }, { name: "Milk" }],
      food: [{ name: "Salad" }, { name: "Sanwich" }],
      bakery: [{ name: "cake" }, { name: "waffle" }],
      types: [
        {
          drink: [{ name: "Coffee" }, { name: "Milk" }],
        },
        {
          food: [{ name: "Salad" }, { name: "Sanwich" }],
        },
        {
          bakery: [{ name: "cake" }, { name: "Waffle" }],
        },
      ],
    };
  },
};
</script>

<template>
  <v-container style="padding: 0" width="">
    <v-row class="justify-center ma-10">
      <h1 class="font-weight-bold text-h2">Menu</h1>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card flat>
          <!-- <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2"></h1>
          </v-card-title> -->

          <v-tabs v-model="tab" grow>
            <v-tab
              v-for="item in type"
              :key="item"
              :value="item"
              style="font-weight: bold; font-size: 20px"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="item in type" :key="item" :value="item">
              <!-- <v-card flat>
                <v-card-item>{{ item }}</v-card-item>
              </v-card> -->
              <v-card
                v-for="item in drink"
                :key="item.name"
                :value="item"
              ></v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="4">
        <p
          style="
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            padding-top: 6px;
          "
        >
          Cart
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
