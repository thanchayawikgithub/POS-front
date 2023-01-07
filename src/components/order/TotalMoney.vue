<script setup lang="ts"></script>
<template>
  <div class="tab">
    <v-container>
      <v-row class="text-center">
        <v-col
          ><v-btn width="100%" rounded color="#B86824" class="font-btn">
            Register Member
          </v-btn>
        </v-col>
        <v-col>
          <v-btn width="100%" rounded color="#EA9A56" class="font-btn">
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-table>
      <tbody>
        <tr>
          <td style="width: 70%">Member :</td>
          <td class="text-lg-right">12345678</td>
          <td class="text-lg-right"></td>
        </tr>
        <tr>
          <td>Price :</td>
          <td class="text-lg-right">130</td>
          <td class="text-lg-right">Baht</td>
        </tr>
        <tr>
          <td>Discount :</td>
          <td class="text-lg-right">5</td>
          <td class="text-lg-right">Baht</td>
        </tr>
        <tr>
          <td>Total :</td>
          <td class="text-lg-right">125</td>
          <td class="text-lg-right">Baht</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div></div>
</template>
<style scoped>
.tab {
  margin-top: 90px;
}
.font-btn {
  font-weight: bold;
}
td {
  font-weight: bold;
}
</style>
