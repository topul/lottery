<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-lottery :prizeData="prizeData" target="奖金二"></v-lottery>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // },
  data () {
    return {
      prizeData: [
        {title: '奖品一', color: '#fe807d'},
        {title: '奖品二', color: '#fe7771'},
        {title: '奖品三', color: '#fe807d'},
        {title: '谢谢参与', color: '#fe7771'},
        {title: '奖品四', color: '#fe807d'},
        {title: '奖品五', color: '#fe7771'},
        {title: '奖品六', color: '#fe807d'},
        {title: '谢谢参与', color: '#fe7771'},
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
