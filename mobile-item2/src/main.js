// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import vuescroll from 'vue-scroll'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import $ from 'jquery'
import store from '@/store/index.js'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(vuescroll)
VueTouch.config.swipe = {
direction: 'horizontal'
}
Vue.use(VueTouch, {
name: 'v-touch'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
