<template>
  <div id="app">
    <v-lottery :data="awardsData" v-model="target"
      @onstart="startRotation" @onstop="stopRotation"></v-lottery>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      awardsData: {
        data: [
          { title: '奖品一', rewardId: 1, color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品二', rewardId: 2, color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品三', rewardId: 3, color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '谢谢参与', rewardId: 0, color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品四', rewardId: 4, color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品五', rewardId: 5, color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '奖品六', rewardId: 6, color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
          { title: '谢谢参与', rewardId: 0, color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' }
        ],
        bgColor: '#ff5859',
        width: 400,
        height: 400,
        goImage: require('./static/go.png')
      },
      target: ''
    }
  },
  methods: {
    startRotation() {
        setTimeout(() => {
          this.target = Math.random() * 6 | 0
        }, 1000)
    },
    stopRotation() {
      alert(`获取奖品${this.target}`)
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
