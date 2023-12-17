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
          <h1>注册界面</h1>
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
              <el-form-item label="确认密码" prop="checkPass" class="el-inputs">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item class="el-button-submit">
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="siginup-tips">
            <span>已有账号?</span>
            <span @click="goToLoginPage">登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reqRegisterUser } from '@/api/index' // 导入 reqRegisterUser 函数
  import '@/assets/css/registerAndLogin.css'
  // 引入 Axios
  export default {
    data () {
      var validataUsername = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]{6,16}$/
        if (!reg.test(value)) {
          callback(new Error('账号必须为6到16位个字符'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          username: '',
          password: '',
          checkPass: '',
          isAdmin: '',
        },
        rules: {
          username: [
            { validator: validataUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      goToLoginPage () {
        this.$router.push({ name: 'login' })
      },
      submitForm (formName) {
        // 构建发送给后端的数据对象，注意键名应该与数据库字段名匹配
        // 调用 reqRegisterUser 函数并传递 解构赋值
        const { username, password, } = this.ruleForm
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await reqRegisterUser({ username, password })
              .then(response => {
                // 注册成功，处理响应
                // console.log(response)
                this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success',
                  duration: 2000
                })
                // 延迟1.5秒后执行页面跳转
                setTimeout(() => {
                  this.$router.push({ name: 'login' })
                }, 1500)
              })
              .catch(error => {
                // 注册失败，处理错误
                console.error('注册失败:', error)
                // 根据错误信息提示用户注册失败
                this.$message({
                  message: '不好意思，注册失败，请重试',
                  type: 'error',
                  duration: 2000
                })
                // 延迟0.5秒后执行清空输入框
                setTimeout(() => {
                  this.ruleForm.username = ''
                  this.ruleForm.password = ''
                  this.ruleForm.checkPass = ''
                  this.$refs.ruleForm.clearValidate() // 清空验证状态
                }, 500)
              })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>