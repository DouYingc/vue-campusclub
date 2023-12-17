<template>
  <div class="menuAll">
    <div class="menuTop">
      <img src="../../../assets/images/menu_logo.png" alt class="menuLogo" />
    </div>
    <div class="menuMid">
      <el-row class="tac">
        <el-col :span="12" class="menu">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#FFFFFF"
            text-color="#000000"
            :router="true"
            active-text-color="#51CBCE"
          >
            <el-menu-item index="/" class="menuLi">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="/myinfo">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>我的信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/myinfo/registerCommunity">注册社团</el-menu-item>
                <el-menu-item index="/myinfo/userInfo">用户信息</el-menu-item>
                <el-menu-item index="/myinfo/mycommunity">我的社团</el-menu-item>
                <el-menu-item index="/myinfo/reviseinfo">修改信息</el-menu-item>
                <el-menu-item index="/myinfo/fillcommunity">加入社团</el-menu-item>
                <el-menu-item index="/myinfo/notice">发布公告</el-menu-item>
                <el-menu-item index="/myinfo/managingcommunity" v-if="showManagingCommunity">管理社团</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/community" class="menuLi">
              <i class="el-icon-menu"></i>
              <span slot="title">社团大厅</span>
            </el-menu-item>
            <el-menu-item index="/announcement" class="menuLi">
              <i class="el-icon-s-comment"></i>
              <span slot="title">公告大厅</span>
            </el-menu-item>
            <el-menu-item index="/data" class="menuLi">
              <i class="el-icon-s-data"></i>
              <span slot="title">资料大厅</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="menuBottom">
      <div class="menuBottomInner">
        <router-link v-if="!isLoggedIn" :to="{ name: 'login' }" target="_blank">
          <el-button type="text" icon="el-icon-user-solid" class="menuBottomButton">登录</el-button>
        </router-link>
        <router-link v-else :to="{ name: 'userinfo' }" target="_blank">
          <el-button
            type="text"
            icon="el-icon-user-solid"
            class="menuBottomButton"
          >用户 {{ username }} 欢迎你</el-button>
        </router-link>
        <br />
        <router-link @click="logout" :to="{name: 'home'}">
          <el-button
            type="text"
            icon="el-icon-delete-solid"
            class="menuBottomButton"
            @click="logout"
          >注销</el-button>
        </router-link>
      </div>
    </div>
    <!-- 新增的白色区域 -->
    <div class="whiteSpace"></div>
  </div>
</template>

<script>
  import { reqGetAllCommunityInfo } from '@/api'
  export default {
    data () {
      return {
        isLoggedIn: false, // 是否已登录
        communityUsername: [],
        username: '', // 用户名
        showManagingCommunity: true
      }
    },
    methods: {
      openNewTab (route) {
        window.open(this.$router.resolve(route).href, '_blank')
      },
      handleOpen (key, keyPath) {
      },
      handleClose (key, keyPath) {
      },
      logout () {
        if (this.isLoggedIn) {
          // 清除社团信息
          // 清除 localStorage 中的用户名
          localStorage.removeItem('username')
          localStorage.removeItem('isAdmin')
          // 清除社团信息
          this.$store.commit('SET_COMMUNITY_INFO', [])
          // 设置登录状态为 false，以便显示登录按钮
          this.isLoggedIn = false
          if (this.$route.name === 'home') {
            // 如果在首页，延迟1秒后刷新页面
            setTimeout(() => {
              location.reload()
            }, 1000)
          } else {
            // 否则，执行路由跳转
            this.$router.push({ name: 'home' })
          }
        }
      }
    },
    created () {
      // 检查用户是否已登录
      this.isLoggedIn = !!localStorage.getItem('username')
      // 如果已登录，获取用户名
      if (this.isLoggedIn) {
        this.username = localStorage.getItem('username')
      }
      // 或者使用你的 reqGetAllCommunityInfo() 方法
      reqGetAllCommunityInfo().then((response) => {
        // 获取到的信息在 response.communityInfo 中
        const communityUsername = response.communityInfo.map(community => community.username)
        // 检查当前用户名是否在 communityUsername 数组中
        if (!communityUsername.includes(this.username)) {
          // 当前用户名不在 communityUsername 中，隐藏管理社团菜单项
          this.showManagingCommunity = false
        }
      }).catch((error) => {
        console.error('Failed to fetch community info:', error)
      })
    },
  }
</script>

<style lang="less" scoped>
  .menuAll {
    box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.2);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto; /* 允许内容滚动，但不显示滚动条 */
  }

  .menuMid {
    flex-grow: 1; /* 占据剩余空间，使内容可滚动 */
    .tac {
      .menu {
        width: 310px;
        margin: 0;
        padding: 0px;
        list-style: none;
        font-weight: 700;
        font-size: 1.1rem;
        text-transform: uppercase;
        line-height: 1.4;
        .el-menu-vertical-demo {
          padding-left: 20px;
          // element在有二级菜单的元素中，无法使用自定义类去更改样式，需要找到原类名进行更改覆盖，style如果是scoped的话，可以加上/deep/，也可以去除scoped
          .el-submenu /deep/ .el-submenu__title {
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            font-size: 1.33333333em;
            height: 70px;
          }
          .menuLi {
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            font-size: 1.33333333em;
            height: 70px;
          }
        }
      }
    }
  }

  .menuTop {
    padding: 35px;
    .menuLogo {
      display: block;
      width: 100%;
      height: auto;
      margin: 0 auto;
      padding: 0;
      max-width: 230px;
    }
  }

  .menuBottom {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    height: auto;
    margin-top: 130px;
    padding: 40px 0;
    background-color: #51cbce;
    .menuBottomInner {
      padding-left: 40px;
      .menuBottomButton {
        width: 270px;
        height: auto;
        font-size: 1em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        color: white;
        text-align: left;
      }
    }
  }
  .whiteSpace {
    background-color: #fff; /* 白色背景 */
    height: 100px; /* 设置白色区域高度 */
  }
</style>
