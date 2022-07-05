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
        <div v-if="alert" class="alert alert-danger">{{alert}}</div>   
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
            time: this.getTime(),
            alert:''
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
            let startTime = `startTime=${this.getfirstDate()}`
            let endTime = `endTime=${this.getlastDate()}`
            let date = `${startTime}&${endTime}`
            return date
        }
    },
    
    watch : {
        firstDate(){
            let first = this.firstDate.split('-')
            let last = this.lastDate.split('-')
            if(first[0]>last[0]){
                console.log(first[0] ,last[0])
                this.alert ='Năm bắt đầu không thể lớn hơn năm kết thúc !!!'
            }else{
                this.alert = ''
            }
            if(first[0]>last[0]&&first[1]> last[1]){
                this.alert ='Tháng bắt đầu không thể lớn hơn tháng kết thúc !!!'
            }else{
                this.alert = ''
            }
            if(first[0]>last[0]&&first[1]> last[1] && first[2] > last[2]){
                this.alert ='Ngày bắt đầu không thể lớn hơn ngày kết thúc !!!'
            }else{
                this.alert = ''
            }
            let startTime = `startTime=${this.firstDate}`
            let endTime = `endTime=${this.lastDate}`
            this.time = `${startTime}&${endTime}`
        },
        lastDate(){
            let first = this.firstDate.split('-')
            let last = this.lastDate.split('-')
            if(first[0]>last[0]){
                console.log(first[0] ,last[0])
                this.alert ='Năm bắt đầu không thể lớn hơn năm kết thúc !!!'
            }else{
                this.alert = ''
            }
            if(first[0]>last[0]&&first[1]> last[1]){
                this.alert ='Tháng bắt đầu không thể lớn hơn tháng kết thúc !!!'
            }else{
                this.alert = ''
            }
            if(first[0]>last[0]&&first[1]> last[1] && first[2] > last[2]){
                this.alert ='Ngày bắt đầu không thể lớn hơn ngày kết thúc !!!'
            }else{
                this.alert = ''
            }
            let startTime = `startTime=${this.firstDate}`
            let endTime = `endTime=${this.lastDate}`
            this.time = `${startTime}&${endTime}`
        }
    }
    
}
</script>

<style>

</style>