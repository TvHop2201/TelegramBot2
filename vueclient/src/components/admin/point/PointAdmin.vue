<template>
  <div>
    <div class="text-center">
      <button :class="{'btn-success':tableShow,'btn-outline-success':!tableShow}" class="btn mx-3" @click="showTable()">TABLE</button>
      <button :class="{'btn-success':chartShow,'btn-outline-success':!chartShow}" class="btn mx-3" @click="showChart()">CHART</button>
    </div>
      <PointTable v-if="tableShow" />
      <PointChart v-if="chartShow"/>
  </div>
</template>

<script>
import PointChart from './PointChart.vue'
import PointTable from './PointTable.vue'
export default {
  components:{
    PointChart,
    PointTable
  },
  data(){
    return{
      chartShow :false,
      tableShow: true,
    }
  },
  methods:{
    showChart(){
      this.chartShow= true;
      this.tableShow =false;

    },
    showTable(){
      this.tableShow =true;
      this.chartShow= false

    },
  }
}
</script>

<style>

</style>