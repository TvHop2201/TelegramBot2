<template>
  <div>
    <Bar
    :chart-data="chartData"
    :height="2"
   :width="4"
    />
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      url : process.env.VUE_APP_URL
    }
  },
  async created (){
    let data =await axios.get(`${this.url}/admin/getChartPoint`)
    this.chartData.labels = data.data.data.map(index =>index.firstName)
    let data2  = {data :data.data.data.map(index=>index.point),label: 'point',backgroundColor: ["#bef264","#fcd34d","#fca5a5",],}
    this.chartData.datasets = [data2]
  }
}
</script>

<style>

</style>