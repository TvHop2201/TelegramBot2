<template>
  <div>
    <div class='text-center'>
        <router-link to='/admin/user' class='btn btn-outline-success mx-5 px-5'>
                    USER
        </router-link>
        <router-link to='/admin/point' class='btn btn-outline-success mx-5 px-5'>
                    POINT
        </router-link>
    </div>
    <div class='row'>
        <div class='m-3 col-lg-5'>
            <div class='col-md-3 mx-auto float-left'>
                        <input type="date" v-model="firstDate" >
                    </div>
            </div>
            <div class='m-3 col-lg-5'>
                <div class='col-md-3 mx-auto float-left'>
                        <input type="date" v-model="lastDate" >
                </div>
            </div>
    </div>
    <div class='row float-left mt-5 mx-auto'>
        <div class='col-lg-6 User ' height="200px" withd="50px">
            <UserChart :time="time" />
        </div>
        <div class='col-lg-6'>
            <PointChart/>
        </div>
    </div>
</div>
</template>

<script>
import UserChart from './UserChart.vue'
import PointChart from './PointChart.vue'

export default {
    components: { UserChart,PointChart },
    data(){
        return{
            firstDate : this.getfirstDate(),
            lastDate: this.getlastDate(),
            time: this.getTime()
        }
    },
    methods :{
        getlastDate(){
            let date = new Date().toLocaleDateString()
            date = date.split('/').reverse()
            if(date[1]<10){
                date[1]='0'+date[1]
            }
            if(date[2]<10){
                date[2]='0'+date[2]
            }
            date = date.join('-')
            return date
        },
        getfirstDate(){
            let date = new Date().toLocaleDateString()
            date = date.split('/').reverse()
            date[1]=date[1]-2
            if(date[1]<10){
                date[1]='0'+date[1]
            }
            if(date[2]<10){
                date[2]='0'+date[2]
            }
            date = date.join('-')
            return date
        },
        getTime (){
            let date = new Date().toLocaleDateString()
            date = date.split('/')
            date = `${date[0]}-${date[1]-2}-${date[0]}-${date[1]}`
            return date
        }
    },
    
    watch : {
        firstDate(){
            let nFirstDate = this.firstDate.split('-')
            let nlastDate = this.lastDate.split('-')
            this.time = `${nFirstDate[2]}-${nFirstDate[1]}-${nlastDate[2]}-${nlastDate[1]}`
        },
        lastDate(){
            let nFirstDate = this.firstDate.split('-')
            let nlastDate = this.lastDate.split('-')
            this.time = `${nFirstDate[2]}-${nFirstDate[1]}-${nlastDate[2]}-${nlastDate[1]}`
        }
    }
    
}
</script>

<style>

</style>