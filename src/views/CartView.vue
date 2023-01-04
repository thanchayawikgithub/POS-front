<script lang="ts">
export default {
  data() {
    return {
      tab: "Menu",
      items: ["Drink", "Bakery", "Food"],
    };
  },
};
</script>

<template>
  <v-container style="padding: 0">
    <v-row>
      <v-col cols="8">
        <v-card flat>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2 text-basil">Menu</h1>
          </v-card-title>

          <v-tabs v-model="tab" grow>
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="item in items" :key="item" :value="item">
              <v-card flat>
                <v-card-item>{{ item }}</v-card-item>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
