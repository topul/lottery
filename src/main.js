import Vue from 'vue'
import App from './App.vue'
import VLottery from './packages/lottery'

Vue.config.productionTip = false
Vue.use(VLottery)

new Vue({
  render: h => h(App)
}).$mount('#app')
