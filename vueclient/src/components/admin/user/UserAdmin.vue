<template>
  <div>
    <div class="text-center">
      <button class="btn btn-outline-success mx-3" @click="showChart()">CHART</button>
      <button class="btn btn-outline-success mx-3" @click="showTable()">TABLE</button>
    </div>
    <UserChar v-show="chartShow" />
    <UserTable v-show="tableShow" />
  </div>
</template>

<script>
import UserChar from './UserChar.vue';
import UserTable from './UserTable.vue';

export default {
    components: { UserChar, UserTable },
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
    }
    }
}
</script>

<style>

</style>