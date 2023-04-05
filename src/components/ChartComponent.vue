<script setup lang="ts">
import Chart, { type ChartConfiguration, type ChartItem } from "chart.js/auto";
import { onMounted } from "vue";
const labels = ["9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Drink Type",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 1, 5, 5, 5, 3, 4,5,7],
    },
    {
      label: "Bakery Type",
      backgroundColor: "rgb(255, 210, 132)",
      borderColor: "rgb(255, 210, 132)",
      data: [0, 2, 3, 2, 2, 4, 2,1,1],
    },
    {
      label: "Food Type",
      backgroundColor: "rgb(120, 99, 132)",
      borderColor: "rgb(120, 99, 132)",
      data: [0, 2, 3, 5, 3, 7, 8,2,2],
    },
  ],
};

const config:  ChartConfiguration= {
  type: "line",
  data: data,
  options: {},
};


onMounted(() => {
  const canvasTag = <ChartItem>document.getElementById("myChart")
  const myChart = new Chart(canvasTag, config)
})
</script>
<template>
  <canvas id="myChart"></canvas>
</template>
