<script setup lang="ts">
import Chart, { type ChartConfiguration, type ChartItem } from "chart.js/auto";
import { onMounted } from "vue";
import { Colors } from 'chart.js';


const labels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [ 81, 56, 55, 40,50 ,60,70,80,65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        '#F7F1E5',
        
      ],
      borderColor: [
        '#F7F1E5'
        
      ],
      borderWidth: 0.1
      
    },
    {
      label: 'Dataset 2',
      data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
      backgroundColor: ['#E5F7F1'],
      borderColor: ['#E5F7F1'],
      borderWidth: 0.1,
    },
    {
      label: 'Dataset 3',
      data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
      backgroundColor: ['#E5F7F1'],
      borderColor: ['#E5F7F1'],
      borderWidth: 0.1,
    },
  
  ],
   
  };
  

const config = {
  type: 'bar',
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
          color: 'rgba(247, 241, 229, 0.1)',
          borderDash: [2, 2]
        },
        ticks: {
          color: '#F7F1E5' // set y-axis ticks color to purple
        }
      },
      x: {
        grid: {
          color: 'rgba(247, 241, 229, 0.1)',
          borderDash: [2,2]
        },
        // title: {
        //   color: '#F7F1E5', // set y-axis title color to blue
        //   display: true,
        //   text: 'Sales'
        // },
        ticks: {
          color: '#F7F1E5' // set y-axis ticks color to purple
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#F7F1E5', // set legend labels color to gray

        }
      }
    }
  }
}


onMounted(() => {
  const canvasTag = <ChartItem>document.getElementById("myChart1")
  const myChart = new Chart(canvasTag, config)
})
</script>
<template>
  <canvas id="myChart1"></canvas>
</template>
