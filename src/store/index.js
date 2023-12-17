import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetCommunityInfo } from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 社团信息
    communityInfo: [],
  },
  getters: {
    getCommunityInfo: state => state.communityInfo,
  },
  mutations: {
    // 添加一个 mutation 以更新社团信息
    SET_COMMUNITY_INFO (state, communityInfo) {
      state.communityInfo = communityInfo
    },
  },
  actions: {
    async fetchCommunityInfo ({ commit }) {
      try {
        const username = localStorage.getItem('username') // 从本地存储获取用户名
        if (!username) {
          // 如果用户名不存在，不进行请求
          return
        }
        const response = await reqGetCommunityInfo(username) // 调用 API 根据用户名获取社团信息
        commit('SET_COMMUNITY_INFO', response.communityInfo) // 提交 mutation 存储社团信息到 state
      } catch (error) {
        console.error('获取社团信息失败:', error)
        // 可以添加错误处理逻辑，比如提示用户信息获取失败等
      }
    },
  },
  modules: {
  }
})
