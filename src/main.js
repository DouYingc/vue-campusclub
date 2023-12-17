import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入初始化样式
import 'normalize.css'
// 自定义初始化样式
import './assets/css/base.css'
import '../src/assets/fonts/font.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
