### 轮盘抽奖程序
使用方法：
```javascript
import VLottery from './components/lottery'
Vue.use(VLottery)

<v-lottery :prizeData="prizeData"
      @onstart="startRotation" @onstop="stopRotation"></v-lottery>

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
            target: '', // 所获奖品
            bgColor: '#ff5859', // 外环背景色
            width: 400,
            height: 400
        }
    }
}
```
onstart：转盘开始旋转，此时可以发起请求，获取所得奖品

onstop：转盘停止转动，可是提示所得奖品并进行后续操作