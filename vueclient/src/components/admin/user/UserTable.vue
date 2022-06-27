<template>
  <div class='container mt-5'>
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
                            <button class='btn btn-outline-success' @click="deatailShow = !deatailShow">Chi Tiết</button>
                            <DeaTail :okData="index" @close="deatailShow = false" v-show="deatailShow"/>
                        </td>
                    </tr>                   
                </tbody>
            </table>
            <div class=' text-center '>
                <div class='btn-group'>
                    <button class='btn btn-outline-primary' @click="page=page-1">&lt;&lt;</button>
                    <input class="btn btn-outline-primary" v-model="page"/>
                    <button class='btn btn-outline-primary' @click="page= page+1" >&gt;&gt;</button>
                </div>
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
            dataok: {},
            page: 1,
            deatailShow: false,
            userName : '',
            firstName: '',
            lastName: ''
        };
    },
    async created(){
        let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=3`)
        this.dataok = data1.data.data
    },
    methods:{
        async filter(){
            if(this.userName !== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.userName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.firstName!== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.firstName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.lastName !== ''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.lastName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.firstName ===''&& this.lastName ===''&& this.userName ==''){
                this.page = 1
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
            }
        },
        pageUp(){

        }
    },
    watch: {
        async page(){
            if(this.userName !== ''){
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.userName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.firstName!== ''){
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.firstName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.lastName !== ''){
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=${this.lastName}&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
                return 0
            }
            if(this.firstName ===''&& this.lastName ===''&& this.userName ==''){
                let data1 = await axios.get(`${this.url}/admin/findModeTableUser/?key=&page=${this.page}&limit=3`)
                this.dataok = data1.data.data
            }

        }
    }

}
</script>

<style>

</style>