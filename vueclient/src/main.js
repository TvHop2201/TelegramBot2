import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(VueCookies, { expire: '30min' })
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
