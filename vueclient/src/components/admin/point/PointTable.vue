<template>
  <div>
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
                      <tr v-for="index of dataok" :key="index.data._id">
                        <td>{{index.data._id}}</td>
                        <td>{{index.userReceive.firstName ? index.userReceive.firstName : index.userReceive.userName}}</td>
                        <td>{{index.userSend.firstName ? index.userSend.firstName : index.userSend.userName}}</td>
                        <td>{{index.data.pointChange}}</td>
                        <td>{{index.data.message}}</td>
                        <td>{{new Date(index.data.Date).toDateString()}}</td>
                          <td>
                            <button class='btn btn-outline-success' @click="deatailShow = !deatailShow">Chi Tiết</button>
                          </td>
                            <DeaTail :okData="index" @close="deatailShow = false" v-show="deatailShow"/>
                      </tr>
                    </tbody>
                </table>
                <div class='text-center' v-show="!deatailShow">
                    <div class='btn-group'>
                        <button class='btn btn-outline-primary' @click="page=page-1">&lt;&lt;</button>
                        <input class="btn btn-outline-primary" v-model="page"/>
                        <button class='btn btn-outline-primary' @click="page= page+1" >&gt;&gt;</button>
                    </div>
                </div>
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
            dataok: {},
            page: 1,
            deatailShow: false
        };
    },
    async created() {
        let data1 = await axios.get(`${this.url}/admin/getPointMessage/${this.page}/5`);
        this.dataok = data1.data.data;
    },
    methods:{
      exitDetail (){
        this.deatailShow=false
      }
    },
    watch: {
        async page() {
            if (this.page !== null) {
                let data1 = await axios.get(`${this.url}/admin/getPointMessage/${this.page}/5`);
                this.dataok = data1.data.data;
            }
        }
    },
    components: { DeaTail }
}
</script>

<style>

</style>