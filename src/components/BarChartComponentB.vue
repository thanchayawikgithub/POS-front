<script setup lang="ts">
import Chart, { type ChartConfiguration, type ChartItem } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { Colors } from "chart.js";
import { useReport } from "@/stores/report";

onMounted(async () => {
  await reportStore.getDrinkSalesQty();
  await reportStore.getBakerySalesQty();
  await reportStore.getFoodSalesQty();
  const canvasTag = document.getElementById("myChart1") as ChartItem;
  new Chart(canvasTag, config);
});
const reportStore = useReport();
const labels1 = reportStore.BakeryproductsName;

const data = {
  labels: labels1,
  datasets: [
    {
      label: "Bakery",
      data: reportStore.BakeryproductsQty,
      backgroundColor: ["#F7F1E5"],
      borderColor: ["#F7F1E5"],
      borderWidth: 0.1,
    },
  ],
};

const config: ChartConfiguration = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        // title: {
        //   color: 'rgba(247, 241, 229, 1)',
        //   display: true,
        //   text: 'Day'
        // },
        beginAtZero: true,
        grid: {
          color: "rgba(247, 241, 229, 0.1)",
        },
        ticks: {
          color: "#F7F1E5", // set y-axis ticks color to purple
        },
      },
      x: {
        grid: {
          color: "rgba(247, 241, 229, 0.1)",
        },
        // title: {
        //   color: '#F7F1E5', // set y-axis title color to blue
        //   display: true,
        //   text: 'Sales'
        // },
        ticks: {
          color: "#F7F1E5", // set y-axis ticks color to purple
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#F7F1E5", // set legend labels color to gray
        },
      },
    },
  },
};
</script>
<template>
  <canvas id="myChart1"></canvas>
</template>
