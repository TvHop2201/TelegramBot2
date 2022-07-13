<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//import AdminCp from './components/admin/AdminCp.vue'

export default {
  name: 'App',
  components: {
    //AdminCp
  }
}
</script>

<style>
@font-face {
  font-family: "Quicksand";
  src: local("Quicksand"),
    url(./assets/font/Quicksand-Medium.ttf) format("truetype");
}

#app {
  font-family: "Quicksand";
}
</style>
