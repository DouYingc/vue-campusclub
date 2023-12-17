<template>
  <div>
    <i class="searchButton" @click="toggleSearchBox">
      <i class="el-icon-search"></i>
    </i>
    <div class="searchOverlay" v-show="showSearchBox">
      <div class="searchBox">
        <el-input v-model="input" placeholder="输入社团名" class="searchInput"></el-input>
        <i class="searchButton2">
          <i class="el-icon-search"></i>
        </i>
        <i class="close" @click="closeSearchBox">
          <i class="el-icon-close"></i>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showSearchBox: false,
        input: ''
      }
    },
    methods: {
      toggleSearchBox () {
        this.showSearchBox = !this.showSearchBox
      },
      closeSearchBox () {
        this.showSearchBox = false // 关闭搜索框
      }
    }
  }
</script>

<style lang="less" scoped>
  .searchButton {
    position: fixed;
    top: 0;
    right: 30px;
    width: 50px;
    height: 60px;
    background-color: #51cbce;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px #cccccc;
  }
  .el-icon-search {
    font-size: 30px;
    display: flex;
    align-items: center;
    transition: transform 0.2s; /* 添加过渡效果 */
  }
  .el-icon-search:hover {
    transform: scale(1.2); /* 鼠标悬停时放大 10% */
  }
  .searchButton:hover {
    cursor: pointer;
    color: #cccccc;
  }
  .searchOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchBox {
    background-color: #ffffff;
    width: 65%;
    height: 80px;
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: row; /* 横向排列元素 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }
  .searchInput {
    width: 55%;
  }
  .searchButton2 {
    height: 78px !important;
    background-color: #51cbce;
    color: #ffffff;
    cursor: pointer;
    width: 100px;
    text-align: center;
    display: flex; /* 使用弹性盒子布局 */
    justify-content: center; /* 在水平方向上居中 */
    align-items: center; /* 在垂直方向上居中 */
  }
  .searchInput /deep/ .el-input__inner {
    height: 78px;
    border-radius: 0;
  }
  .close {
    position: fixed;
    top: 50px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #51cbce;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close:hover {
    cursor: pointer;
    background-color: #f5593d;
  }
</style>