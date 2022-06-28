<template>
  <div>
    <div class="text-center">
      <button :class="{'btn-success':tableShow,'btn-outline-success':!tableShow}" class="btn mx-3" @click="showTable()">TABLE</button>
      <button :class="{'btn-success':chartShow,'btn-outline-success':!chartShow}" class="btn mx-3" @click="showChart()">CHART</button>
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