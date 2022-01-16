<template>
<div class="lottery" :style="{backgroundColor: mergedData.bgColor}">
  <div class="turntable" :style="{background: `url('${mergedData.dotImage}') no-repeat center center / 92%`}"></div>
  <canvas id="canvas" :width="mergedData.width" :height="mergedData.height" :style="{transform: `rotate(${rotateDeg}deg)`}"></canvas>
  <img :src="mergedData.goImage" class="lottery-go" @click.stop="startRotation">
</div>
</template>

<script>
export default {
  name: 'v-lottery',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    value: {
      type: [Number, String],
      required: true,
      default: ''
    },
    disabled: Boolean
  },
  data() {
    return {
      flag: false, // 转盘开关
      piece: 0,
      rotateDeg: 0,
      defaultData: {
        data: [],
        bgColor: '#ff5859',
        dotImage: require('./assets/dot.png'),
        goImage: require('./assets/go.png'),
        width: 350,
        height: 350
      }
    }
  },
  computed: {
    startAngle() {
      const areaArc = 360 / this.mergedData.data.length / 2
      return areaArc * Math.PI / 90
    },
    // 大圆盘半径
    outsideRadius() {
      return this.mergedData.width * 13 / 30
    },
    // 字体离圆心距离
    textRadius() {
      return this.mergedData.width * 0.35
    },
    // 防止默认值被覆盖
    mergedData() {
      return {
        ...this.defaultData,
        ...this.data
      }
    }
  },
  watch: {
    disabled(val) {
      this.flag = val
    },
    value(val) {
      if (val) {
        let finalDeg = this.getTargetAngel()
        this.rotateDeg += 270 - finalDeg + (360 - this.rotateDeg % 360) + 1800
      }
    }
  },
  mounted() {
    this.setLotteryHeight()
    window.addEventListener('resize', () => {
      this.setLotteryHeight()
    })
    this.drawLottery()
    const canvas = document.getElementById('canvas')
    canvas.addEventListener('transitionend', () => {
      this.flag = false
      this.$emit('onstop')
    })
  },
  methods: {
    // 设置转盘的高，使其与宽相等
    setLotteryHeight() {
      const lottery = document.querySelector('.lottery')
      lottery.style.height = lottery.clientWidth + 'px'
    },
    // 绘制转盘
    drawLottery() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      let devicePixelRatio = window.devicePixelRatio || 1
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      canvas.width = canvas.width * ratio
      canvas.height = canvas.height* ratio
      ctx.scale(ratio, ratio)
      ctx.translate(0.5, 0.5)
      this.ctx = ctx

      const [w, h, centerX, centerY] = [
        this.mergedData.width,
        this.mergedData.height,
        this.mergedData.width / 2,
        this.mergedData.height / 2
      ]
      this.centerX = centerX
      this.centerY = centerY
      // 根据奖品个数计算圆周角度
      let arc = Math.PI / (this.mergedData.data.length / 2)
      this.piece = arc
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'transparent'
      ctx.font = '16px Microsoft YaHei'

      this.mergedData.data.forEach((item, i) => {
        let angle = this.startAngle + i * arc
        ctx.fillStyle = item.color || 'transparent'
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)

        ctx.arc(centerX, centerY, this.outsideRadius, angle, angle + arc, false)
        // ctx.arc(centerX, centerY, this.insideRadius, angle + arc, angle, true)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.save()

        this.drawTitle(item, angle, arc)
        item.src && this.drawImage(item, angle, arc)
      })
    },
    // 重置绘图坐标
    resetCoordinate(angle, arc) {
      const ctx = this.ctx
      let x = this.centerX + Math.cos(angle + arc / 2) * this.textRadius
      let y = this.centerY + Math.sin(angle + arc / 2) * this.textRadius
      // translate重新映射画布上的（0，0）位置
      ctx.translate(x, y)
      ctx.rotate(angle + arc / 2 + Math.PI / 2)
    },
    /**
     * 绘制奖品名称
     * @param {Object} item 奖品信息
     * @param {Number} angle 开始绘制的位置角度
     * @param {Number} arc 绘制的弧度
     */
    drawTitle(item, angle, arc) {
      const ctx = this.ctx
      ctx.fillStyle = '#ffffff'
      ctx.font="12px 宋体"
      this.resetCoordinate(angle, arc)
      ctx.fillText(item.title, -ctx.measureText(item.title).width / 2, 50)
      ctx.restore()
      ctx.save()
    },
    // 根据图片宽高比计算图片的宽高和位置
    calcImgSize(img) {
      let [width, height, x, y] = []
      if (img.width > img.height) {
        width = 60
        height = 60 * img.height / img.width
        x = -30
        y = -15
      } else {
        height = 50
        width = 50 * img.width / img.height
        x = -20
        y = -15
      }
      return [width, height, x, y]
    },
    /**
     * 预下载图片
     * @param {String} url 图片地址
     * @param {Function} callback
     * @param {Object} {x: 横坐标, y: 纵坐标, width: 图像宽度, height: 图像高度}
     */
    preImage(url, callback) {
      //创建一个Image对象，实现图片的预下载
      const img = new Image()
      img.src = url
      if (img.complete) {
        const [width, height, x, y] = this.calcImgSize(img)
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img, x, y, width, height)
        return
      }
      img.onload = () => {
        const [width, height, x, y] = this.calcImgSize(img)
        // 图片下载完毕时异步调用callback函数
        callback.call(img, x, y, width, height)
      }
    },
    /**
     * 绘制奖品图片
     * @param {Object} item 奖品信息
     * @param {Number} angle 开始绘制的位置角度
     * @param {Number} arc 绘制的弧度
     */
    drawImage(item, angle, arc) {
      const ctx = this.ctx
      const self = this
      this.preImage(
        item.src,
        function(x, y, width, height) {
          ctx.save()
          self.resetCoordinate(angle, arc)
          ctx.drawImage(this, x, y, width, height)
          ctx.restore()
        }
      )
    },
    // 获取目标角度
    getTargetAngel() {
      let idx = this.mergedData.data.findIndex(item => {
        return item.rewardId === this.value
      })
      if (idx !== -1) {
        return (this.piece * (idx + 0.5) + this.startAngle) * 180 / Math.PI
      } else {
        return 360
      }
    },
    // 开始旋转
    startRotation() {
      if (!this.flag) {
        this.$emit('input', '')
        this.$emit('onstart')
        this.flag = true
      }
    }
  }
}
</script>

<style scoped>
.lottery {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#canvas {
  width: 92%;
  /* height: 92%; */
  position: absolute;
  top: 4%;
  left: 4%;
  transition: transform 5s ease-in-out;
  /* cubic-bezier(0.48, 0.76, 0.49, 0.97) */
  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
.turntable {
  height: 100%;
  animation: rotate180 7s linear both reverse infinite;
  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
.lottery-go {
  position: absolute;
  width: 20%;
  left: 50%;
  top: 47%;
  z-index: 1;
  transform: translate(-50%, -50%);
}
@keyframes rotate180 {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
