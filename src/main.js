import Vue from 'vue'
import App from './App.vue'
import VLottery from './components/lottery'

Vue.config.productionTip = false
Vue.use(VLottery)

new Vue({
  render: h => h(App)
}).$mount('#app')
