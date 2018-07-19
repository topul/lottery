<template>
<div>
  <canvas id="canvas" width="300" height="300"></canvas>
</div>
</template>

<script>
export default {
  name: 'VLottery',
  props: {
    prizeData: { type: Array, default: () => [] },
    target: String
  },
  data () {
    return {
      width: 300,
      height: 300,
      startAngle: 0,
      outsideRadius: 140,
      insideRadius: 30,
      textRadius: 105,
      flag: false,  // 转盘开关
      piece: 0
    }
  },
  computed: {
    targetAngel() {
      // 获取目标初始角度
      let idx = this.prizeData.findIndex(item => {
        return item.title === this.target
      })
      console.log(idx)
      return this.piece * (idx - 0.5)
    }
  },
  mounted() {
    this.drawLottery()
    this._currentTime = 0
    this._totalTime = Math.random() * 500 + 4000
    this._finalValue = Math.random() * 20 + 20
    console.log('this._totalTime, this._finalValue: ', this._totalTime, this._finalValue)
    const canvas = document.getElementById('canvas')
    canvas.addEventListener('click', e => {
      if (this.isInPath(e.offsetX, e.offsetY)) {
        // 如果点击的是抽奖
        console.log('before-rotate')
        this.startRotation()
      }
    })
    console.log(this.targetAngel)
  },
  methods: {
    drawLottery() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      this.ctx = ctx

      const [w, h, centerX, centerY] = [this.width, this.height, this.width / 2, this.height / 2]
      this.centerX = centerX
      this.centerY = centerY
      const line_height = 17
      // 根据奖品个数计算圆周角度
      let arc = Math.PI / (this.prizeData.length / 2)
      this.piece = arc
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#e95455'
      ctx.font = '16px Microsoft YaHei'

      this.prizeData.forEach((item, i) => {
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

        ctx.fillStyle = '#fff'
        let x = centerX + Math.cos(angle + arc / 2) * this.textRadius
        let y = centerY + Math.sin(angle + arc / 2) * this.textRadius
        // translate重新映射画布上的（0，0）位置
        ctx.translate(x, y)
        ctx.rotate(angle + arc / 2 + Math.PI / 2)
        ctx.fillText(item.title, -ctx.measureText(item.title).width / 2, 0)
        ctx.restore()
      })
      this.drawArrows()
      this.drawCenterCircle()
      this.drawLotteryText()
    },
    // 绘制箭头
    drawArrows() {
      const ctx = this.ctx
      ctx.strokeStyle = '#FF5722'
      ctx.fillStyle = '#FF5722'
      ctx.save()
      ctx.translate(this.centerX, this.centerY - 26)
      ctx.moveTo(-10, 0)
      ctx.beginPath()
      ctx.lineTo(-10, 0)
      ctx.lineTo(-10, -20)
      ctx.lineTo(-20, -20)
      ctx.lineTo(0, -40)
      ctx.lineTo(20, -20)
      ctx.lineTo(10, -20)
      ctx.lineTo(10, 0)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    },
    // 绘制中心圆
    drawCenterCircle() {
      const ctx = this.ctx
      ctx.fillStyle = '#FF5722'
      ctx.beginPath()
      ctx.arc(this.centerX, this.centerY, this.insideRadius, 0, 2 * Math.PI, false)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    },
    // 绘制抽奖文字
    drawLotteryText() {
      const ctx = this.ctx
      ctx.font = '24px Microsoft YaHei'
      ctx.fillStyle = '#fff'
      const text = '抽奖'
      ctx.save()
      ctx.translate(this.centerX, this.centerY)
      ctx.fillText(text, -ctx.measureText(text).width / 2, 10)
      ctx.restore()
    },
    // 判断是否在路径内
    isInPath(x, y) {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.arc(this.centerX, this.centerY, this.insideRadius, 0, 2 * Math.PI)
      return ctx.isPointInPath(x, y)
    },
    // 旋转转盘
    startRotation() {
      console.log('startRotation')
      this._currentTime += 30
      if (this._currentTime >= this._totalTime) {
        this.stopRotation()
        return
      }
      let currentAngle = this._finalValue - this.easeOut(
        this._currentTime, 0, this._finalValue, this._totalTime
      )
      console.log('currentAngle: ', currentAngle)
      this.startAngle += currentAngle * Math.PI / 180
      console.log('this.startAngle: ', this.startAngle)
      this.drawLottery()
      this.animateID = requestAnimationFrame(this.startRotation)
    },
    // 停止转盘
    stopRotation() {
      console.log('stopRotation')
      cancelAnimationFrame(this.animateID)
      let arc = this.startAngle + Math.PI / 2
      let index = this.prizeData.length - 1 - ((arc % (2 * Math.PI) / this.piece) >> 0)
      console.log(this.prizeData[index].title)
      this._currentTime = 0
    },
    easeOut(t, b, c, d) {
      return - c * (t /= d) * (t - 2) + b
    }
  }
}
</script>

<style>
</style>
