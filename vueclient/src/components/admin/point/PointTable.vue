<template>
  <div>
    <div v-show="!loading">
        <div class='container mt-5'>
            <table class='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>UserReceive</th>
                        <th scope='col'>UserSend</th>
                        <th scope='col'>pointChange</th>
                        <th scope='col'>message</th>
                        <th scope='col'>create_at</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="dataok!==null">
                        <tr v-for="index in dataok" :key="index.data._id">
                            <td>{{index.data._id}}</td>
                            <td v-if="index.userReceive">{{index.userReceive.userName ? index.userReceive.userName : index.userReceive.firstName}}</td>
                            <td v-if="index.userSend">{{index.userSend ? index.userSend.userName : index.userSend.firstName}}</td>
                            <td>{{index.data.pointChange}}</td>
                            <td>{{index.data.message}}</td>
                            <td>{{new Date(index.data.Date).toLocaleDateString()}}</td>
                            <td>
                                <button class='btn btn-outline-success' @click="showDeatail(index)">Chi Tiết</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
                        <DeaTail :okData="deatailData" @close="exitDeatail()" v-if="deatailShow"/>
            <div class='text-center' v-show="!deatailShow">
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
        </div>
    </div>
    <div class="loading text-center pt-5" v-if="loading" >
            <img src="../../../assets/loading.gif" class="pt-5 my-5" >
    </div>   
    </div>
</template>

<script>
import axios from 'axios'
import DeaTail from './DeaTail.vue'
export default {
    data() {
        return {
            url: process.env.VUE_APP_URL,
            loading:false,
            dataok: {},
            page: 1,
            limit :10,
            total:1,
            deatailShow: false,
            deatailData:{},
            token : this.$cookies.get('token')
        };
    },
    async created() {
        this.loading = true
        let data1 = await axios.get(`${this.url}/admin/getPointMessage/?page=${this.page}&limit=${this.limit}`,{
            headers:{
                Authorization: 'Bearer '+ this.token
            }
            });
        this.dataok = data1.data.data;
        this.total= data1.data.total
        this.loading = false
    },
    methods:{
      async exitDeatail (){
        this.deatailShow=false
        this.loading = true
        let data1 = await axios.get(`${this.url}/admin/getPointMessage/?page=${this.page}&limit=${this.limit}`,{
        headers:{
            Authorization: 'Bearer '+ this.token
        }
        });
        this.dataok = data1.data.data;
        this.total= data1.data.total
        this.loading = false
      },
      changePage(value){
           this.page = value
      },
      showDeatail(index){
        this.deatailData = index
        this.deatailShow = true
      }
    },
    watch: {
        async page() {
            if (this.page !== null) {
                this.loading = true
                let data1 = await axios.get(`${this.url}/admin/getPointMessage/?page=${this.page}&limit=${this.limit}`,{
                headers:{
                    Authorization: 'Bearer '+ this.token
                }
                });
                this.dataok = data1.data.data;
                this.loading = false
            }
        },
        async limit() {
            if (this.page !== null) {
                this.loading = true
                this.page=1
                let data1 = await axios.get(`${this.url}/admin/getPointMessage/?page=${this.page}&limit=${this.limit}`,{
                headers:{
                    Authorization: 'Bearer '+ this.token
                }
                });
                this.dataok = data1.data.data;
                this.loading = false
            }
        }
    },
    components: { DeaTail }
}
</script>

<style>

</style>