<script setup lang="ts">
import Chart, { type ChartConfiguration, type ChartItem } from "chart.js/auto";
import { onMounted } from "vue";
import { Colors } from "chart.js";
import { useReport } from "@/stores/report";
const reportStore = useReport();
onMounted(() => {
  reportStore.getDayOfWeekTotalSales();
  const data = {
    labels: reportStore.DayOfWeek,
    datasets: [
      {
        label: "Day Of Week",
        backgroundColor: "rgb(232, 212, 202)",
        borderColor: "rgb(232, 212, 202)",
        borderWidth: 4,
        data: reportStore.TotalSales,
        tension: 0.1,
      },
    ],
  };
  const config: ChartConfiguration = {
    type: "line",
    data,
    options: {
      scales: {
        x: {
          title: {
            color: "rgba(247, 241, 229, 1)",
            display: true,
            text: "Day",
          },
          grid: {
            color: "rgba(247, 241, 229, 0.3)", // set x-axis grid color to red
          },
          ticks: {
            color: "#F7F1E5", // set y-axis ticks color to purple
          },
        },
        y: {
          grid: {
            color: "rgba(247, 241, 229, 0.3)", // set y-axis grid color to green
          },
          title: {
            color: "#F7F1E5", // set y-axis title color to blue
            display: true,
            text: "Sales",
          },
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

  const canvasTag = document.getElementById("myChart");
  const myChart = new Chart(canvasTag, config);
});
</script>

<template>
  <canvas id="myChart"></canvas>
</template>
