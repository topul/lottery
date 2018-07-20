<template>
  <div id="app">
    <v-lottery :prizeData="prizeData" :target="target"
      @onstart="startRotation" @onstop="stopRotation"></v-lottery>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      prizeData: [
        { title: '奖品一', color: '#fe807d' },
        { title: '奖品二', color: '#fe7771' },
        { title: '奖品三', color: '#fe807d' },
        { title: '谢谢参与', color: '#fe7771' },
        { title: '奖品四', color: '#fe807d' },
        { title: '奖品五', color: '#fe7771' },
        { title: '奖品六', color: '#fe807d' },
        { title: '谢谢参与', color: '#fe7771' }
      ],
      target: ''
    }
  },
  methods: {
    startRotation() {
      this.target = ''
        setTimeout(() => {
        this.target = '奖品四'
      }, 3000)
    },
    stopRotation() {
      console.log('stopRotation')
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
