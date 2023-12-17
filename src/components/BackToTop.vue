<template>
  <i v-show="showBtn" class="return" @click="scrollTop">
    <i class="el-icon-arrow-up"></i>
  </i>
</template>

<script>
  export default {
    data () {
      return {
        scrollTopNum: '',
        showBtn: false,
      }
    },
    methods: {
      //实时监控元素与窗口滚动的距离
      handleScroll () {
        let top =
          document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
        this.scrollTopNum = top
      },
      // 返回顶部处理函数（滑动滚动）
      scrollTop () {
        const upRoll = setInterval(() => {
          const top = document.documentElement.scrollTop // 每次获取页面被卷去的部分
          const speed = Math.ceil(top / 10) // 每次滚动多少 （步长值）
          if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop -= speed // 不在顶部 每次滚动到的位置
          } else {
            clearInterval(upRoll) // 回到顶部清除定时器
          }
        }, 20)
      },
    },
    mounted () {
      // 实时监控滑动距离
      window.addEventListener("scroll", this.handleScroll, true)
    },
    watch: {
      // 监控滑动距离的变化，显示和隐藏元素
      scrollTopNum: function () {
        if (this.scrollTopNum > 50) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .return {
    position: fixed;
    bottom: 20px; /* 修改距离底部的值 */
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #51cbce;
    border-radius: 50%;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    color: #ffffff;
    box-shadow: 0 0 10px #cccccc;

    .el-icon-arrow-up {
      font-size: 30px;
      vertical-align: middle; /* 调整图标的垂直对齐 */
    }
  }
  .return:hover {
    cursor: pointer;
    color: #cccccc;
  }
</style>