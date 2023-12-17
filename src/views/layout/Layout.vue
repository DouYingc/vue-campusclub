<template>
  <div class="layout">
    <scroll-percentage-bar></scroll-percentage-bar>
    <!-- 左侧侧边导航区域 -->
    <div class="menu">
      <Menu></Menu>
    </div>
    <!-- 右侧内容 -->
    <div class="layoutContentWithFooter">
      <div class="layoutContent">
        <Content></Content>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Menu from './menu/Menu.vue'
  import Content from './content/Content.vue'
  import Footer from '@/views/layout/content/Footer.vue'
  import ScrollPercentageBar from "@/components/ScrollPercentageBar"

  export default {
    components: {
      Menu,
      Content,
      Footer,
      ScrollPercentageBar,
    }

  }
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    min-height: 100vh; /* 设置最小高度以覆盖整个视口高度 */
    .menu {
      width: 310px;
      position: fixed; /* 固定菜单 */
      top: 0; /* 使菜单位于屏幕顶部 */
      left: 0; /* 使菜单位于屏幕左侧 */
      height: 100%; /* 菜单高度占满整个屏幕 */
    }
    .layoutContentWithFooter {
      flex: 1;
      margin-left: 310px;
      display: flex;
      flex-direction: column;
      margin-top: 5px;
    }
  }
</style>
