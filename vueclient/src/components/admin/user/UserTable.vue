<template>
  <div class='container mt-5'>
        <div v-show="!loading">
            <table class='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>
                            <input type='text' class='border-0' v-model="userName" placeholder="userName" @keyup.enter="filter()"/>
                        </th>
                        <th scope='col'>
                            <input type='text' class='border-0' v-model="firstName"  placeholder="firstName" @keyup.enter="filter()" />
                        </th>
                        <th scope='col'>
                            <input type='text' class='border-0' v-model="lastName" placeholder="LastName" @keyup.enter="filter()"/>
                        </th>
                        <th scope='col'>Point</th>
                        <th scope='col'>create_at</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index of dataok" :key="index._id">
                        <td>{{index._id}}</td>
                        <td>{{index.userName}}</td>
                        <td>{{index.firstName}}</td>
                        <td>{{index.lastName}}</td>
                        <td>{{index.point}}</td>
                        <td>{{new Date(index.create_at).toDateString()}}</td>
                        <td>
                            <button class='btn btn-outline-success' @click="showDeatail(index)">Chi Tiết</button>
                        </td>
                    </tr>                   
                        <DeaTail :okData="deatailData" @close="closeDeatail" v-show="deatailShow"/>
                </tbody>
            </table>
            <div class=' text-center ' v-if="!deatailShow">
                <div class='btn-group'>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="10"
                            :key="total"    
                            :page-size="5"
                            @current-change="changePage"
                            @prev-click="page = page-1"
                            @next-click="page=page+1"
                            >
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="loading text-center pt-5" v-show="loading" >
            <img src="./loading.gif" class="pt-5 my-5" >
        </div>
    </div >
</template>

<script>
import axios from 'axios';
import DeaTail from './DeaTail.vue';
export default {
    components:{
        DeaTail
    },
    data() {
        return {
            url: process.env.VUE_APP_URL,
            loading:false,
            dataok: {},
            deatailData:{},
            page: 1,
            total :1,
            deatailShow: false,
            userName : '',
            firstName: '',
            lastName: ''
        };
    },
    async created(){
        this.loading = true
        let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=5`)
        this.dataok = data1.data.data
        this.total = data1.data.total
        this.loading = false
    },
    methods:{
        showDeatail(index){
            this.deatailData = index
            this.deatailShow =!this.deatailShow
        },
        async closeDeatail(){
            this.deatailShow = false
            this.loading = true
            let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=5`)
            this.dataok = data1.data.data
            this.total = data1.data.total
            this.loading = false
        },
        async filter(){
            this.loading = true
            if(this.userName !== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.userName}&page=${this.page}&limit=5`)
                this.dataok = data1.data.data
                this.total = data1.data.total
                this.loading = false
                return 0
            }
            if(this.firstName!== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.firstName}&page=${this.page}&limit=5`)
                this.dataok = data1.data.data
                this.total = data1.data.total
                this.loading = false
                return 0
            }
            if(this.lastName !== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.lastName}&page=${this.page}&limit=5`)
                this.dataok = data1.data.data
                this.total = data1.data.total
                this.loading = false
                return 0
            }
            if(this.firstName ===''&& this.lastName ===''&& this.userName ==''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=5`)
                this.dataok = data1.data.data
                this.total = data1.data.total
                this.loading = false
                return 0
            }
            
        },
        changePage(value){
           this.page = value
        }
        
    },
    watch: {
        async page(){
            if(this.page!==''){
                this.loading = true
                if(this.userName !== ''){
                    let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.userName}&page=${this.page}&limit=5`)
                    this.dataok = data1.data.data
                    this.total = data1.data.total
                    this.loading = false
                    return 0
                }
                if(this.firstName!== ''){
                    let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.firstName}&page=${this.page}&limit=5`)
                    this.dataok = data1.data.data
                    this.total = data1.data.total
                    this.loading = false
                    return 0
                }
                if(this.lastName !== ''){
                    let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.lastName}&page=${this.page}&limit=5`)
                    this.dataok = data1.data.data
                    this.total = data1.data.total
                    this.loading = false
                    return 0
                }
                if(this.firstName ===''&& this.lastName ===''&& this.userName ==''){
                    let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=5`)
                    this.dataok = data1.data.data
                    this.total = data1.data.total
                    this.loading = false
                    return 0
                }
            }
        }
    }

}
</script>

<style>

</style>