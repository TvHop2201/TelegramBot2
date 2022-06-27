<template>
  <div>
    <Bar
    :chart-data="chartData"
    :width="200"
    :height="200"
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
  props: ['time'],
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      url : process.env.VUE_APP_URL
    }
  },
  
  async created (){
    let data =await axios.get(`${this.url}/admin/getChartUserWithTime/${this.time}`)
    this.chartData.labels = data.data.data.map(index=>index._id)
    let data2  = {data :data.data.data.map(index=>index.count),label: 'user',backgroundColor: ["#bef264","#fcd34d","#fca5a5",],}
    this.chartData.datasets = [data2]
  },
  watch:{
    async time(){
    let data =await axios.get(`${this.url}/admin/getChartUserWithTime/${this.time}`)
    this.chartData.labels = data.data.data.map(index=>index._id)
    let data2  = {data :data.data.data.map(index=>index.count),label: 'user',backgroundColor: ["#bef264","#fcd34d","#fca5a5",],}
    this.chartData.datasets = [data2]
    console.log(data.data.data)
    }
  },
  
}
</script>

<style>

</style>