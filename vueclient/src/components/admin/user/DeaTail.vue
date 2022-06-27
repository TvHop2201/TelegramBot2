<template>
  <div class='popup'>
        <div class='popup_inner' >
                <button class='btn btn-outline-danger float-right mt-3 mx-3' @click="$emit('close')">X</button>
                <div class='container'>
                    <h1 class='text-center'>{{okData.userName}}</h1>
                    <form class='mx-5'>
                        <div class="form-group m-2">
                            <label>firstName: </label>
                            <input class="form-control" placeholder="firstName" :value="okData.firstName"/>
                        </div>
                        <div class="form-group m-2">
                            <label>lastName : </label>
                            <input class="form-control" placeholder="lastName" :value="okData.lastName" />
                        </div>
                        <div class="form-group m-2">
                            <label>Point : </label>
                            <input class="form-control" placeholder="point" :value="okData.point" />
                        </div>
                        <div class="form-group m-2">
                            <label>create_at : </label>
                            <input disabled class="form-control" placeholder="message" :value="new Date(okData.create_at).toLocaleDateString()"  />
                        </div>
                        <div class='mx-auto col text-center mt-5'>
                            <button type="button" class='btn btn-outline-success mx-5 px-5'>Cập Nhật</button>
                            <button type="button" class='btn btn-outline-warning mx-5 px-5'>Xóa</button>
                        </div>
                        
                    </form>
                </div>
            </div >
        </div >
</template>

<script>
export default {
    props:['okData'],
    created(){
        
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