<template>
  <div>
    <div class='full py-5'>
            <div class="container">
                <div class="row gy-5 justify-content-center py-5 headT ">
                    <div class="col-md-7 shadow p-3 mb-5 bg-white rounded">
                        <div class="card border border-success border-radius">
                            <div class="card-header text-center m-3 h2 fw-bold">ĐĂNG NHẬP</div>
                            <div class="card-body p-5">
                                <div>
                                    <h6 class=" alert alert-danger" v-if="validate.username">username không được bỏ trống</h6>
                                    <h6 class=" alert alert-danger" v-if="validate.password">password không được bỏ trống</h6>
                                    <div class="row mb-3">
                                        <label class="col-md-4 col-form-label text-md-end">username</label>
                                        <div class="col-md-6">
                                            <input id="name" type="name" class="form-control" name="username" v-model="username" @keyup.enter="login()" />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="col-md-4 col-form-label text-md-end">password</label>
                                        <div class="col-md-6">
                                            <input id="password" type="password" class="form-control" name="password" v-model="password" @keyup.enter="login()" />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6 offset-md-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" id="remember" />
                                                <label class="form-check-label">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-0">
                                        <div class="col-md-8 offset-md-4">
                                            <button type="submit" class="btn btn-outline-success" @click="login()">
                                                Đăng Nhập
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            username : '',
            password :'',
            url :process.env.VUE_APP_URL,
            validate :{
                username:false,
                password:false,
            }
        }
    },
    methods:{
        validation(){
            if (this.username === '' || this.username.length <3){
                this.validate.username = true
                return
            }
            if (this.password === '' || this.password.length <3){
                this.validate.password = true
                return
            }
            this.validate.username = false
            this.validate.password = false
        },
        async login(){
            this.validation()
            if(this.validate.username === true || this.validate.password === true){
                return 0
            }
            let data1 = await axios.post(`${this.url}/account/login`,{
                username : this.username,
                password: this.password
            })
            
            if(data1.data.status=== false){
                alert('Sai Tài Khoản Hoặc Mật Khẩu !!!!')
                this.username =''
                this.password = ''
            }else{
                this.$cookies.set('token',data1.data.token)
                this.$router.push('/admin')
            }
        }
    },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
.full {
    background-image: url(./bg.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    font-family: 'Quicksand';
    height: 100vh;
    overflow: auto;
}
.headT {
    background: inherit;
    margin-top: 7em;

}
.Mcard {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

</style>