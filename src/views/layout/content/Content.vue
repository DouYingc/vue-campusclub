<template>
  <div>
    <!-- <Search /> -->
    <!-- 内容 -->
    <router-view></router-view>

    <BackToTop />
  </div>
</template>

<script>
  import BackToTop from '@/components/BackToTop.vue'
  import Search from '@/components/Search.vue'

  export default {
    components: {
      BackToTop,
      Search
    }
  }
</script>

<style lang="less" scoped>
</style>