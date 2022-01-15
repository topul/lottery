import VLottery from "./lottery"

VLottery.install = function(Vue){
  Vue.component(VLottery.name, VLottery)
}

export default VLottery