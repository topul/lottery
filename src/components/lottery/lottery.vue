<template>
<div class="lottery" :style="{backgroundColor: mergedData.bgColor, width: mergedData.width+'px', height: mergedData.height+'px'}">
  <div class="turntable"></div>
  <canvas id="canvas" :width="mergedData.width" :height="mergedData.height"></canvas>
  <img src="./assets/go.png" class="lottery-go" @click.stop="startRotation">
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
    }
  },
  data() {
    return {
      startAngle: 0,
      flag: false, // 转盘开关
      piece: 0,
      rotateDeg: 0,
      defaultData: { 
        data: [], 
        target: '', 
        bgColor: '#ff5859', 
        dotImage: './assets/dot.png',
        width: 300,
        height: 300,
      }
    }
  },
  computed: {
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
  mounted() {
    this.drawLottery()
    this.$watch('mergedData.target', () => {
      this.mergedData.target && this.stopRotation()
    })
    const canvas = document.getElementById('canvas')
  },
  methods: {
    // 重置转盘
    reset() {
      this.startAngle = 0
      this.rotateDeg = 0
    },
    // 绘制转盘
    drawLottery() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      this.ctx = ctx

      const [w, h, centerX, centerY] = [
        this.mergedData.width,
        this.mergedData.height,
        this.mergedData.width / 2,
        this.mergedData.height / 2
      ]
      this.centerX = centerX
      this.centerY = centerY
      const line_height = 17
      // 根据奖品个数计算圆周角度
      let arc = Math.PI / (this.mergedData.data.length / 2)
      this.piece = arc
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#e95455'
      ctx.font = '16px Microsoft YaHei'

      this.mergedData.data.forEach((item, i) => {
        let angle = this.startAngle + i * arc
        ctx.fillStyle = item.color || '#ef8781'
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
      ctx.fillStyle = '#fff'
      this.resetCoordinate(angle, arc)
      ctx.fillText(item.title, -ctx.measureText(item.title).width / 2, 0)
      ctx.restore()
      ctx.save()
    },
    /**
     * 预下载图片
     * @param {String} url 图片地址
     * @param {Function} callback
     * @param {Object} {x: 横坐标, y: 纵坐标, width: 图像宽度, height: 图像高度}
     */
    preImage(url,callback, wh) {
      //创建一个Image对象，实现图片的预下载
      const img = new Image()
      img.src = url
      if (img.complete) {
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img, wh.x, wh.y, wh.width, wh.height)
        return
      }
      img.onload = function() {
        // 图片下载完毕时异步调用callback函数
        callback.call(img, wh.x, wh.y, wh.width, wh.height)
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
      this.preImage(item.src, function (x, y, width, height) {
        ctx.save()
        self.resetCoordinate(angle, arc)
        ctx.drawImage(this, -20, 10, 40, 30)
        ctx.restore()
      }, {x: -20, y: 10, width: 40, height: 30})
    },
    // 获取目标角度
    getTargetAngel() {
      let idx = this.mergedData.data.findIndex(item => {
        return item.title === this.mergedData.target
      })
      if (idx !== -1) {
        return this.piece * (idx + 0.5) * 180 / Math.PI
      } else {
        return 360
      }
    },
    // 旋转转盘
    startRotation() {
      if(this.flag) return
      this.$emit('onstart')
      const canvas = document.getElementById('canvas')
      canvas.style.transition = 'transform 60s ease-in'
      canvas.style.transform = 'rotate(172800deg)'
      this.rotateDeg += this.rotateDeg % 360 + 360
      this.flag = true
    },
    // 停止转盘
    stopRotation() {
      let finalDeg = this.getTargetAngel()
      const canvas = document.getElementById('canvas')
      canvas.style.transition = 'transform 3s ease-out'
      this.rotateDeg += 270 - finalDeg + (360 - this.rotateDeg % 360) + 1800
      canvas.style.transform = `rotate(${this.rotateDeg}deg)`
      setTimeout(() => {
        this.flag = false
        this.$emit('onstop')
      }, 3000)
    }
  }
}
</script>

<style scoped>
.lottery {
  position: relative;
  border-radius: 50%;
}
#canvas {
  width: 84%;
  position: absolute;
  top: 8%;
  left: 8%;
  /* transition: transform 2s linear; */
  /* cubic-bezier(0.48, 0.76, 0.49, 0.97) */
  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
.turntable {
  height: 100%;
  background: url('./assets/dot.png') no-repeat center center;
  background-size: 92%;
  animation: rotate180 7s linear both reverse infinite;
  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
.lottery-go {
  position: absolute;
  left: 50%;
  top: 50%;
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
