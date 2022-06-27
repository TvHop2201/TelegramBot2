<template>
  <div>
    <div class="text-center">
      <button class="btn btn-outline-success mx-3" @click="showChart()">CHART</button>
      <button class="btn btn-outline-success mx-3" @click="showTable()">TABLE</button>
      <button class="btn btn-outline-success mx-3" @click="showFind()">FIND</button>
    </div>
    <UserChar v-show="chartShow" />
    <UserFind v-show="findShow" />
    <UserTable v-show="tableShow" />
  </div>
</template>

<script>
import UserChar from './UserChar.vue';
import UserFind from './UserFind.vue';
import UserTable from './UserTable.vue';

export default {
    components: { UserChar, UserFind, UserTable },
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