<template>
  <div :style="contentTitleStyle" class="contentTitle">
    <h1 :style="h1Style">
      <i :style="iconStyle" :class="iconClass"></i>
      <span :style="spanStyle">{{ title }}</span>
    </h1>
    <div class="contentIntroduction">
      <i class="el-icon-info"></i>
      <span>{{introduction}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      iconClass: String,
      title: String,
      introduction: String,
      contentBackgroundColor: String,
      h1BorderColor: String,
      spanBorderColor: String,
      iconColor: String,
    },
    computed: {
      // 根据传入的 props 动态生成样式
      contentTitleStyle () {
        return {
          background: this.contentBackgroundColor || '#73b7ff',
        }
      },
      h1Style () {
        return {
          'border-bottom': `5px solid ${this.h1BorderColor || '#81beff'}`,
        }
      },
      spanStyle () {
        return {
          'border-bottom': `5px solid ${this.spanBorderColor || '#51cbce'}`,
        }
      },
      iconStyle () {
        return {
          color: this.iconColor || '#004eff',
          // 其他样式属性
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .contentTitle {
    background: #73b7ff;
    float: right;
    clear: right;
    width: 1050px;
    margin-top: 100px;
    padding-top: 50px;
    padding-bottom: 55px;
    padding-left: 60px;
    padding-right: 240px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 90px;
  }
  h1 {
    border-bottom: 5px solid #81beff;
    font-weight: bold;
    font-size: 40px;
  }
  h1 span {
    color: #ffffff;
    font-weight: bold;
    border-bottom: 5px solid #51cbce;
  }
  .contentIntroduction {
    margin-top: 25px;
    span {
      font-size: 20px;
      color: #fbfcff;
    }
  }
  .el-icon-info {
    color: #ff0000;
    font-size: 20px;
    margin-right: 5px;
  }
</style>