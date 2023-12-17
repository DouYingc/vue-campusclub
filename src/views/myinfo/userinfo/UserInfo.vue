<template>
  <div class="userInfoWrap">
    <div>
      <content-title
        icon-class="el-icon-s-tools"
        title="用户信息"
        introduction="看着这些你可能就像看着自己的孩子一样~"
        content-background-color="#73B7FF"
        h1-border-color="#81BEFF"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div class="userInfo" :style="{ background: randomBackgroundColor }" v-show="userInfoVisible">
      <i class="el-icon-close" @click="closeUserInfo"></i>
      <h3>用户名：{{ storedUsername }}（{{ isAdmin ? '社团管理员' : '普通用户' }}）</h3>
      <el-button class="elButton" @click="showPasswordInputs">修改密码</el-button>
      <div v-if="showInputs">
        <!-- 根据 showInputs 变量控制是否显示密码输入框 -->
        <el-input v-model="password" placeholder="请输入密码" class="elInput" type="password"></el-input>
        <el-input v-model="confirmPassword" placeholder="请确认密码" class="elInput" type="password"></el-input>
        <br />
        <el-button class="elButton" @click="updatePassword">确定修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqGetAllCommunityInfo } from '@/api'
  import { reqUpdateUserPassword } from '@/api'
  export default {
    components: { ContentTitle },
    data () {
      return {
        userInfoVisible: true, // 控制用户信息的显示状态
        isAdmin: false,
        storedUsername: '',
        showInputs: false, // 控制密码输入框显示与隐藏
        password: '', // 绑定密码输入
        confirmPassword: '' // 绑定确认密码输入
      }
    },
    computed: {
      randomBackgroundColor () {
        // 随机生成五种颜色中的一种
        const colors = ['#E4C4A1', '#CC90CC', '#86D9AB', '#6EC7E0', '#FCD27B']
        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex]
      },
    },
    methods: {
      closeUserInfo () {
        this.userInfoVisible = false // 点击关闭图标时隐藏用户信息
        localStorage.setItem('userInfoVisible', false) // 将状态保存到本地存储
      },
      fetchUserInfo () {
        reqGetAllCommunityInfo()
          .then(response => {
            const userInfoArray = response.communityInfo || [] // 假设返回的数据为数组
            this.storedUsername = localStorage.getItem('username') // 获取本地存储的用户名
            // 循环比较 userinfo 数组中的每个对象的 username 字段
            for (const userInfo of userInfoArray) {
              if (userInfo.username === this.storedUsername) {
                this.isAdmin = true
                return // 如果找到匹配的用户名，设置为管理员并跳出循环
              }
            }
            // 如果未找到匹配的用户名，设置为普通用户
            this.isAdmin = false
          })
          .catch(error => {
            console.error('Error fetching user info:', error)
          })
      },
      showPasswordInputs () {
        // 点击按钮时显示密码输入框
        this.showInputs = true
      },
      // 检查密码格式
      checkPasswordFormat (password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return passwordRegex.test(password)
      },
      showPasswordInputs () {
        this.showInputs = true
      },
      updatePassword () {
        const isPasswordValid = this.checkPasswordFormat(this.password)
        const isConfirmPasswordValid = this.checkPasswordFormat(this.confirmPassword)
        if (!isPasswordValid || !isConfirmPasswordValid) {
          this.$message.error('密码格式不正确')
          return
        }
        if (this.password !== this.confirmPassword) {
          this.$message.error('两次输入密码不一致')
          return
        }
        // 调用 reqUpdateUserPassword 方法更新用户密码
        reqUpdateUserPassword(this.storedUsername, this.password)
          .then(response => {
            // 处理密码更新成功的情况
            this.$message.success('修改密码成功')
            // 这里可以添加一些成功更新密码后的操作，比如提示用户密码更新成功
            // 使用 setTimeout 延迟执行 this.showInputs = false
            setTimeout(() => {
              this.password = ''
              this.confirmPassword = ''
              this.showInputs = false
            }, 1000) // 1000毫秒即1秒后执行
          })
          .catch(error => {
            console.error('密码更新失败:', error)
            // 处理密码更新失败的情况，比如提示用户密码更新失败
          })
      }
    },
    created () {
      this.fetchUserInfo()
    },
  }
</script>

<style lang="less" scoped>
  .userInfoWrap {
    display: flex;
    flex-direction: column;
    .userInfo {
      position: relative;
      width: 1110px;
      height: auto;
      margin-left: 245px;
      margin-bottom: 100px;
      border-radius: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
      padding-bottom: 15px;
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
      }
      i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        &:hover {
          cursor: pointer;
        }
      }
      h3 {
        color: #ffffff;
        font-size: 25px;
        margin-top: 15px;
        margin-left: 10px;
      }
      .elButton {
        font-size: 20px;
        margin-top: 30px;
        margin-left: 30px;
      }
      .elInput {
        width: 70%;
        margin-top: 15px;
        margin-left: 30px;
      }
    }
  }
</style>