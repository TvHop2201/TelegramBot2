<template>
  <div>
    <div class="text-center">
      <button class="btn btn-outline-success mx-3" @click="showChart()">CHART</button>
      <button class="btn btn-outline-success mx-3" @click="showTable()">TABLE</button>
      <button class="btn btn-outline-success mx-3" @click="showFind()">FIND</button>
    </div>
    <PointFind v-show="findShow"/>
      <PointTable v-show="tableShow" />
    <div height="500">
      <PointChart v-show="chartShow" :height="500"/>

    </div>
  </div>
</template>

<script>
import PointChart from './PointChart.vue'
import PointFind from './PointFind.vue'
import PointTable from './PointTable.vue'
export default {
  components:{
    PointChart,
    PointFind,
    PointTable
  },
  data(){
    return{
      chartShow :true,
      tableShow: false,
      findShow: false
    }
  },
  methods:{
    showChart(){
      this.chartShow= true;
      this.tableShow =false;
      this.findShow = false
    },
    showTable(){
      this.tableShow =true;
      this.chartShow= false
      this.findShow = false
    },
    showFind(){
      this.findShow = true
      this.chartShow= false;
      this.tableShow =false;
    }
  }


}
</script>

<style>

</style>