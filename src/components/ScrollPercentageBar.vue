<template>
  <div class="scrollPercentageBar" :style="barStyle">
    <div class="scrollBar" :style="innerBarStyle"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        scrollPercentage: 0,
      }
    },
    computed: {
      barStyle () {
        return {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "4px",
          backgroundColor: "#FFFFFF",
          zIndex: "9999",
        }
      },
      innerBarStyle () {
        return {
          width: this.scrollPercentage + "%",
          height: "100%",
          backgroundColor: "#51CBCE",
          transition: "width 0.3s",
        }
      },
    },
    methods: {
      updateScrollPercentage () {
        const windowHeight = window.innerHeight
        const scrollHeight = document.body.scrollHeight - windowHeight
        const scrollTop = window.scrollY
        this.scrollPercentage = (scrollTop / scrollHeight) * 100
      },
      resetScrollPercentage () {
        this.scrollPercentage = 0
      },
    },
    created () {
      window.addEventListener("scroll", this.updateScrollPercentage)
      this.$router.beforeEach((to, from, next) => {
        this.resetScrollPercentage()
        next()
      })
    },
    beforeDestroy () {
      window.removeEventListener("scroll", this.updateScrollPercentage)
    },
  };
</script>

<style>
</style>
