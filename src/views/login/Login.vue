<template>
  <div class="content">
    <div class="login-wrapper">
      <div class="left-img">
        <div class="glass">
          <div class="tips">
            <div class="title">DouYing</div>
            <h1>有爱,有梦想,有向往的方向</h1>
            <span>去拼搏,去创造,敢为人先,追求卓越</span>
            <span>我们邀请您加入我们的圈子</span>
          </div>
        </div>
      </div>
      <div class="right-login-form">
        <div class="form-wrapper">
          <h1>登录界面</h1>
          <div class="input-items">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="username" class="el-inputs">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="el-inputs">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="el-button-submit">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="siginup-tips">
            <span>没有账号?</span>
            <span @click="goToRegisterPage">注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/css/registerAndLogin.css'
  import { reqLoginUser } from '@/api/index'
  import { mapActions } from 'vuex'

  export default {
    data () {
      var validataUsername = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]+$/
        if (!reg.test(value)) {
          callback(new Error('账号必须由字母或数字组合'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          // 使用正则表达式来检查密码是否包含至少一个字母和至少一个数字，并且至少为8位数
          let hasLetter = /[a-zA-Z]/.test(value)
          let hasNumber = /[0-9]/.test(value)
          if (!hasLetter || !hasNumber || value.length < 8) {
            callback(new Error('密码必须包含至少一个字母和至少一个数字，且至少为8位数'))
          } else {
            callback()
          }
        }
      }
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { validator: validataUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      goToRegisterPage () {
        this.$router.push({ name: 'register' })
      },
      async submitForm () {
        // 检查账号和密码字段是否为空
        if (!this.ruleForm.username || !this.ruleForm.password) {
          alert('请输入账号和密码')
          return
        }
        // 创建包含账号和密码的对象
        const userData = {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        }
        try {
          // 发起登录请求
          const response = await reqLoginUser(userData)
          // 输出登录响应数据
          // console.log('登录响应数据：', response)
          if (response.status === 0) {
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              duration: 2000
            })
            // 在登录成功后保存用户名到localStorage
            const username = this.ruleForm.username
            localStorage.setItem('username', username)
            // 获取社团信息
            this.fetchCommunityInfo(username)
            // 延迟1.5秒后执行页面跳转 首页
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1500)
          }
        } catch (error) {
          // 登录失败，处理错误
          console.error('登录失败:', error)
          // 根据错误信息提示用户登录失败
          this.$message({
            message: '用户名或密码错误',
            type: 'error',
            duration: 2000
          })
        }
      },
      // 使用 mapActions 映射 Vuex 中的 actions
      ...mapActions(['fetchCommunityInfo']),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped></style>