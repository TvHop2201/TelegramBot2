<template>
  <div>
    <div class='row float-left mx-3 mt-5'>
        <div class='col-lg-5 text-center mx-auto'>
            <UserChart :time="time" />
            <h5 class="mt-2">Biểu Đồ Tăng Trưởng USER</h5>
        </div>
        <div class='col-lg-5 text-center mx-auto'>
            <PointChart/>
            <h5 class="mt-2">Biểu Đồ Top USER Cao Điểm</h5>
        </div>
    </div>
    <div class="row mx-auto mt-5">
        <div class='col-md-2 float-right'>
            <span>ngày bắt đầu</span>
            <input type="date" v-model="firstDate" >
        </div>
        <div class='col-md-2'>
                <span>ngày kết thúc</span>
                <input type="date" v-model="lastDate" >
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