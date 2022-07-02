<template>
    <transition name="tr">
        <div class='popup'>
              <div class='popup_inner' >
                      <button class='popup_btn btn btn-outline-danger float-right mt-3 mx-3' @click="$emit('close')">X</button>
                      <div class="popup_scroll">
                          <div class='container'>
                              <h1 class='mt-4'></h1>
                              <form class='mx-5'>
                                  <div class="alert alert-success" v-if="alertMessage" role="alert">
                                      Cập Nhật Thành Công !!!
                                  </div>
                                  <div class="form-group m-2">
                                      <label>idRecivce: </label>
                                      <input disabled class="form-control" placeholder="idUserReceive" :value="okData.data.idUserReceive"/>
                                  </div>
                                  <div class="form-group m-2">
                                      <label>idSend : </label>
                                      <input disabled class="form-control" placeholder="idUserSend" :value="okData.data.idUserSendGift" />
                                  </div>
                                      <div class="form-group m-2">
                                          <label>userSend : </label>
                                          <input disabled class="form-control" placeholder="point" :value="okData.userSend.firstName ? okData.userSend.firstName : okData.userSend.userName" />
                                      </div>
                                  <div class="form-group m-2">
                                      <label>userReceive: </label>
                                      <input disabled class="form-control" placeholder="point" :value="okData.userReceive.firstName ? okData.userReceive.firstName : okData.userReceive.userName" />
                                  </div>
                                  <div class="form-group m-2">
                                      <label>Point : </label>
                                      <input class="form-control" placeholder="point" v-model="pointChange" />
                                  </div>
                                  <div class="form-group m-2">
                                      <label>message : </label>
                                      <input class="form-control" placeholder="message" v-model="message"  />
                                  </div>
                                  <div class="form-group m-2">
                                      <label>Date : </label>
                                      <input disabled class="form-control" placeholder="message" :value="new Date(okData.data.Date).toLocaleDateString()"  />
                                  </div>
                                  <div class='mx-auto col text-center mt-5'>
                                      <button type="button" class='btn btn-outline-success mx-5 px-5' @click="update()">Cập Nhật</button>
                                      <button type="button" class='btn btn-outline-warning mx-5 px-5' @click="remove()">Xóa</button>
                                  </div>
                                  
                              </form>
                          </div>
                      </div>
                  </div >
        </div >
    </transition>
</template>

<script>
import axios from 'axios'
export default {
    props:['okData'],
    data (){
        return{
            url: process.env.VUE_APP_URL,
            id: this.okData.data._id,
            pointChange: this.okData.data.pointChange,
            message : this.okData.data.message,
            alertMessage: false
        }
    },
    methods:{
        async update(){
            let result = await axios.post(`${this.url}/admin/updatePointMessage`,{
                id:this.id,
                pointChange : this.pointChange,
                message : this.message
            })
            if(result.data.success){
                this.alertMessage = true
                setTimeout(() => {
                    this.alertMessage = false
                }, 5000);
            }else{
                alert('Cập Nhật Thất Bại !!!')
            }
            
        },
        async remove(){
            confirm("Bạn có muốn xóa message !!!")
            let result = await axios.get(`${this.url}/admin/deletePointMessage/?id=${this.id}`)
            if(result.data.success=== true){
                alert("Thành công !!!")
                this.$emit('close')
            }else{
                alert('thất bại')
            }

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
    background-color: rgba(0, 0, 0, 0.493);
}

.popup_inner {
    border-radius: 1em;
    position: absolute;
    left: 35%;
    right: 15%;
    top: 15%;
    bottom: 15%;
    margin: auto;
    background: white;
    overflow-y:auto;
}

.tr-enter-active, .tr-leave-active {
  transition: opacity 1s;
}
.tr-enter, .tr-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 8px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	border-radius: 8px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: rgba(0,0,0,0.3);
}

</style>