<template>
  <div class='container mt-5'>
    <table class="table">
        <thead>
            <tr>
                <th scope='col'>#</th>
                <th scope='col'>
                  <input type="text" class="border-0" placeholder="ADMIN" v-model="form.admin" @keyup.enter="filter()">
                </th>
                <th scope='col'>
                  <input type="text" class="border-0" placeholder="USER" v-model="form.user" @keyup.enter="filter()">
                </th>
                <th scope='col'>POINTCHANGE</th>
                <th scope='col'>LOG</th>
                <th scope='col'>Date</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="index in logData" :key="index._id">
            <td>{{index._id}}</td>
            <td>{{index.adminChange}}</td>
            <td>{{index.user}}</td>
            <td>{{index.pointChange}}</td>
            <td>{{index.log}}</td>
            <td>{{new Date(index.create_at).toLocaleDateString()}}</td>
          </tr>
        </tbody>
    </table>

    <div class="text-center">
      <div class="btn-group">
        <el-pagination
          background
          layout="prev,pager, next"
          :total="total"
          :key="total"    
          :page-size="limit"
          @current-change="changePage"
          @prev-click="page=page-1"
          @next-click="page=page+1"
          >
        </el-pagination>
          <select class="form-select" aria-label="Default select example" v-model.number="limit">
            <option selected value="5">5/page</option>
            <option value="10">10/page</option>
            <option value="15">15/page</option>
            <option value="20">20/page</option>
          </select>
      </div>
    </div>
    <div class="loading text-center pt-5" v-if="loading" >
      <img src="../../../assets/loading.gif" class="pt-5 my-5" >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      logData :{},
      total: 1,
      page: 1,
      limit :10,
      form:{
        admin:'',
        user : ''
      },
      url : process.env.VUE_APP_URL,
      loading : false,
      token:this.$cookies.get('token'),
    }
  },
  async created (){
    this.loading = true
    let getData = await axios.get(`${this.url}/admin/getLogUser?page=${this.page}&limit=${this.limit}`,{
      headers:{
        Authorization: 'Bearer '+ this.token
      }
    })
    this.logData = getData.data.data
    this.total = getData.data.total
    this.loading = false
  },
  methods :{
    changePage(value){
      this.page = value
    },
    async filter(){
      this.loading = true
      let getData = await axios.get(`${this.url}/admin/findLogUser?page=${this.page}&limit=${this.limit}&key=${this.form.admin||this.form.user}`,{
      headers:{
        Authorization: 'Bearer '+ this.token
      }
    })
      this.logData = getData.data.data
      this.total = getData.data.total
      this.loading = false
    }
  },
  watch :{
    async limit(){
      if(this.form.admin === ''){
        this.loading = true
        let getData = await axios.get(`${this.url}/admin/getLogUser?page=${this.page}&limit=${this.limit}`,{
          headers:{
            Authorization: 'Bearer '+ this.token
          }
        })
        this.logData = getData.data.data
        this.total = getData.data.total
        this.loading = false
        return 0
      } else{
        this.loading = true
        let getData = await axios.get(`${this.url}/admin/findLogUser?page=${this.page}&limit=${this.limit}&key=${this.form.admin||this.form.user}`,{
          headers:{
            Authorization: 'Bearer '+ this.token
          }
        })
        this.logData = getData.data.data
        this.total = getData.data.total
        this.loading = false
      }
    },
    async page(){
      if(this.form.admin === ''){
        this.loading = true
        let getData = await axios.get(`${this.url}/admin/getLogUser?page=${this.page}&limit=${this.limit}`,{
          headers:{
            Authorization: 'Bearer '+ this.token
          }
        })
        this.logData = getData.data.data
        this.total = getData.data.total
        this.loading = false
        return 0
      } else{
        this.loading = true
        let getData = await axios.get(`${this.url}/admin/findLogUser?page=${this.page}&limit=${this.limit}&key=${this.form.admin||this.form.user}`,{
          headers:{
            Authorization: 'Bearer '+ this.token
          }
        })
        this.logData = getData.data.data
        this.total = getData.data.total
        this.loading = false
      }
    }
  }
  

}
</script>

<style>

</style>