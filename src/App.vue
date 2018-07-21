<template>
  <div id="app">
    <v-lottery :prizeData="prizeData"
      @onstart="startRotation" @onstop="stopRotation"></v-lottery>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      prizeData: {
        data: [
          { title: '奖品一', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品二', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品三', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '谢谢参与', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品四', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品五', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品六', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '谢谢参与', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' }
        ],
        target: '',
        bgColor: '#ff5859',
        width: 400,
        height: 400
      }
    }
  },
  methods: {
    startRotation() {
      this.target = ''
        setTimeout(() => {
        this.prizeData.target = '奖品四'
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
