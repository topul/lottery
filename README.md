# 轮盘抽奖程序

![轮盘抽奖](https://user-images.githubusercontent.com/8213229/149622123-dd3134e1-3c3a-432b-91c7-6c8bacc62916.png)

安装：

```bash
npm i tp-lottery
```

使用：

1、在main.js中引入

```javascript
import TpLottery from 'tp-lottery'
Vue.use(TpLottery)
```

2、组件中引入模板

```html
<tp-lottery :data="awardsData" v-model="target"
      @onstart="startRotation" @onstop="stopRotation"></tp-lottery>
```

> onstart：转盘开始旋转，此时可以发起请求，获取所得奖品
>
> onstop：转盘停止转动，可以提示所得奖品并进行后续操作

3、组件中注入数据

```javascript
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
            goImage: require('./static/go.png') // 开始抽奖图片地址，支持线上图片和本地图片，本地图片需用require包裹
        },
        target: '' // 奖品ID
    }
}
```
