<template>
<div class="lottery" :style="{backgroundColor: mergedData.bgColor}">
  <div class="turntable"></div>
  <canvas id="canvas" width="300" height="300" :style="{transform: `rotate(${rotateDeg}deg)`}" :class="[canvasAnimation]"></canvas>
  <img src="./assets/go.png" class="lottery-go" @click.stop="startRotation">
</div>
</template>

<script>
export default {
  name: 'VLottery',
  props: {
    prizeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      width: 300,
      height: 300,
      startAngle: 0,
      outsideRadius: 140,
      insideRadius: 30,
      textRadius: 105,
      flag: false, // 转盘开关
      piece: 0,
      canvasAnimation: '',
      rotateDeg: 0,
      defaultData: { data: [], target: '', bgColor: '#ff5859', dotImage: './assets/dot.png' }
    }
  },
  computed: {
    // 防止默认值被覆盖
    mergedData() {
      return {
        ...this.defaultData,
        ...this.prizeData
      }
    }
  },
  mounted() {
    this.drawLottery()
    // this.$watch('lotteryTarget', () => {
    //   this.lotteryTarget && this.stopRotation()
    // })
    const canvas = document.getElementById('canvas')
    canvas.addEventListener('animationiteration', e => {
      if (this.mergedData.target) {
        // console.log('animationend')
        this.stopRotation()
      }
    })
    canvas.addEventListener('transitionend', e => {
      // console.log('lottery-end')
      this.$emit('onstop')
    })
  },
  methods: {
    // 重置转盘
    reset() {
      this.startAngle = 0
      this.rotateDeg = 0
    },
    /**
     * 绘制转盘
     */
    drawLottery() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      this.ctx = ctx

      const [w, h, centerX, centerY] = [
        this.width,
        this.height,
        this.width / 2,
        this.height / 2
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
    // 绘制奖品名称
    drawTitle(item, angle, arc) {
      const ctx = this.ctx
      ctx.fillStyle = '#fff'
      let x = this.centerX + Math.cos(angle + arc / 2) * this.textRadius
      let y = this.centerY + Math.sin(angle + arc / 2) * this.textRadius
      // translate重新映射画布上的（0，0）位置
      ctx.translate(x, y)
      ctx.rotate(angle + arc / 2 + Math.PI / 2)
      ctx.fillText(item.title, -ctx.measureText(item.title).width / 2, 0)
      ctx.restore()
      ctx.save()
    },
    // 绘制奖品图片
    drawImage(item, angle, arc) {
      const ctx = this.ctx
      let x = this.centerX + Math.cos(angle + arc / 2) * this.textRadius
      let y = this.centerY + Math.sin(angle + arc / 2) * this.textRadius
      // translate重新映射画布上的（0，0）位置
      ctx.translate(x, y)
      ctx.rotate(angle + arc / 2 + Math.PI / 2)
      const img = new Image()
      img.src = item.src
      ctx.drawImage(img, -20, 10, 40, 30)
      ctx.restore()
      ctx.save()
    },
    getTargetAngel() {
      // 获取目标角度
      let idx = this.mergedData.data.findIndex(item => {
        return item.title === this.mergedData.target
      })
      return this.piece * (idx + 0.5) * 180 / Math.PI
    },
    // 旋转转盘
    startRotation() {
      // console.log('startRotation')
      this.$emit('onstart')
      this.rotateDeg = 0
      this.canvasAnimation = 'canvas-animaiton'
    },
    // 停止转盘
    stopRotation() {
      // console.log('stopRotation')
      let finalDeg = this.getTargetAngel()
      // this.canvasAnimation = 'animation-transform'
      // this.rotateDeg = 270 - finalDeg + 360 * 4
      this.canvasAnimation = ''
      setTimeout(() => {
        this.rotateDeg = 270 - finalDeg + 360 * 4
      }, 0)
    }
  }
}
</script>

<style scoped>
.lottery {
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: 50%;
}
#canvas {
  width: 84%;
  position: absolute;
  top: 8%;
  left: 8%;
  transition: transform 6s cubic-bezier(0, 0, 0.54, 1);
}
.turntable {
  height: 100%;
  background: url('./assets/dot.png') no-repeat center center;
  background-size: 92%;
  animation: rotate180 7s linear both reverse infinite;
}
.canvas-animaiton {
  animation: rotate360 0.8s linear both reverse infinite;
}
.animation-transform {
  animation: 0;
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
@keyframes rotate360 {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
