<template>
  <div class='popup'>
        <div class='popup_inner' >
                <button class='btn btn-outline-danger float-right mt-3 mx-3' @click="$emit('close')">X</button>
                <div class='container'>
                    <h3 class='text-center'>{{okData.userName}}</h3>
                    <form class='mx-5'>
                        <div class="form-group m-2">
                            <label>firstName: </label>
                            <input class="form-control" placeholder="firstName" v-model="firstName" />
                        </div>
                        <div class="form-group m-2">
                            <label>lastName : </label>
                            <input class="form-control" placeholder="lastName" v-model="lastName"  />
                        </div>
                        <div class="form-group m-2">
                            <label>Point : </label>
                            <input class="form-control" placeholder="point" v-model="point" />
                        </div>
                        <div class="form-group m-2">
                            <label>create_at : </label>
                            <input disabled class="form-control" placeholder="message" :value="new Date(okData.create_at).toLocaleDateString()"  />
                        </div>
                        <div class='mx-auto col text-center mt-5'>
                            <button type="button" class='btn btn-outline-success mx-5 px-5' @click="update()">Cập Nhật</button>
                            <button type="button" class='btn btn-outline-warning mx-5 px-5' @click="remove(okData._id)">Xóa</button>
                        </div>

                    </form>
                </div>
            </div >
        </div >
</template>

<script>
import axios from 'axios'
export default {
    props:['okData'],
    data(){
        return {
            id: this.okData._id,
            userName:this.okData.userName,
            firstName: this.okData.firstName,
            lastName : this.okData.lastName,
            point:this.okData.point,
            url: process.env.VUE_APP_URL,
        }
    },
    methods:{
        async update(){
            let data1 = await axios.post(`${this.url}/admin/updateUser`,{
                _id:  this.id,
                userName : this.userName,
                firstName: this.firstName,
                lastName: this.lastName,
                point : this.point,
            })
            if(data1.data.success){
                alert("Cập Nhật Thành Công !!!!")
                this.$emit('close')
            }else{
                alert("Thất Bại !!!")
                this.$emit('close')
            }
        
        },
        async remove(id){
            confirm(`bạn có muốn xóa ${this.okData.userName ? this.okData.userName: this.okData.firstName}`)
            console.log(id)
            this.$emit('close')
        }
    },
    
    watch : {
        okData (){
            this.id=this.okData._id,
            this.userName=this.okData.userName
            this.firstName= this.okData.firstName
            this.lastName = this.okData.lastName
            this.point=this.okData.point
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup_inner {
    border-radius: 1em;
    position: absolute;
    left: 35%;
    right: 15%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    background: white;
}

</style>