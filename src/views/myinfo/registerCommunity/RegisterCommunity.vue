<template>
  <div class="registerCommunityWrap">
    <div>
      <content-title
        icon-class="el-icon-s-custom"
        title="社团和用户注册"
        introduction="在这里，你仿佛赋予了一个新的生命~"
        content-background-color="#FAA494"
        h1-border-color="#FBAD9F"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div class="registerCommunityInfo">
      <i class="el-icon-s-order">基础信息</i>
      <div class="fillregisterCommunityInfo">
        <!-- 社团名 -->
        <div class="communityName">
          <span>社团名：</span>
          <el-input v-model="communityName" placeholder="请输入社团名" class="elInput" maxlength="10"></el-input>
        </div>
        <!-- 负责人 -->
        <div class="communityResponsiblePerson">
          <span>负责人：</span>
          <el-input
            v-model="communityResponsiblePerson"
            placeholder="请输入社团负责人的姓名"
            class="elInput"
            maxlength="10"
            type="text"
          ></el-input>
        </div>
        <!-- 联系方式 -->
        <div class="communityResponsiblePersonContactInformation">
          <span>联系方式：</span>
          <el-input
            v-model="communityResponsiblePersonContactInformation"
            placeholder="请输入您的联系方式"
            class="elInput"
            maxlength="30"
            type="text"
          ></el-input>
        </div>
        <div class="communityPersonQuantity">
          <span>社团人数：</span>
          <el-input
            v-model="communityAnticipatMembers"
            placeholder="请输入您预期的社团人数"
            class="elInput"
            maxlength="100"
            type="text"
          ></el-input>
        </div>
        <!-- 社团简介 -->
        <div class="communityIntroduction">
          <span>社团简介：</span>
          <el-input
            v-model="communityIntroduction"
            placeholder="简短描述社团的宗旨或目标"
            class="elInput autoHeight"
            type="textarea"
            maxlength="300"
            show-word-limit
            :rows="3"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="submitInfo">
      <el-button type="primary" class="submitInfoButton" @click="submitForm">
        <i class="el-icon-plus"></i>提交
      </el-button>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqRegisterCommunity } from '@/api/index' // 导入 reqRegisterUser 函数
  // 格式化时间
  import moment from 'moment'
  export default {
    components: { ContentTitle },
    data () {
      return {
        communityName: '',
        communityResponsiblePerson: '',
        communityResponsiblePersonContactInformation: '',
        communityIntroduction: '',
        communityAnticipatMembers: '',
        communityCreateDate: ''
      }
    },
    methods: {
      getCurrentDateTime () {
        const currentDate = new Date()
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
        this.communityCreateDate = formattedDate
      },
      async submitForm () {
        if (!this.communityName) {
          this.$message.error('请填写社团名')
          return // 阻止提交
        }
        if (!this.communityResponsiblePerson) {
          this.$message.error('请填写社团负责人')
          return // 阻止提交
        }
        if (!this.communityResponsiblePersonContactInformation) {
          this.$message.error('请填写社团负责人联系方式')
          return // 阻止提交
        }
        if (!this.communityAnticipatMembers) {
          this.$message.error('请填写社团预期人数')
          return // 阻止提交
        }
        if (!this.communityIntroduction) {
          this.$message.error('请填写社团简介')
          return // 阻止提交
        }
        const username = localStorage.getItem('username') // 获取本地存储中的用户名
        if (!username) {
          Message({
            message: '请先登录',
            type: 'warning',
            duration: 2000
          })
          return // 如果未登录，停止执行提交操作
        }
        // 确保获取当前时间
        this.getCurrentDateTime()
        const {
          communityName,
          communityResponsiblePerson,
          communityResponsiblePersonContactInformation,
          communityIntroduction,
          communityAnticipatMembers,
          communityCreateDate,
        } = this
        const communityData = {
          username,
          communityName,
          communityResponsiblePerson,
          communityResponsiblePersonContactInformation,
          communityIntroduction,
          communityAnticipatMembers,
          communityCreateDate
        }
        try {
          const response = await reqRegisterCommunity(communityData)
          Message({
            message: '注册成功！',
            type: 'success',
            duration: 4000
          })

          // 使用 setTimeout 延迟执行 
          setTimeout(() => {
            // 提交成功后重置表单数据
            this.communityName = ''
            this.communityResponsiblePerson = ''
            this.communityResponsiblePersonContactInformation = ''
            this.communityIntroduction = ''
            this.communityAnticipatMembers = ''
            this.communityCreateDate = ''
          }, 2000) // 1000毫秒即1秒后执行
        } catch (error) {
          console.error('社团注册失败:', error)
          // 可以添加错误处理，比如显示错误信息给用户
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .registerCommunityWrap {
    display: flex;
    flex-direction: column;
    .registerCommunityInfo {
      margin-bottom: 80px;
      i {
        width: 144px;
        margin-left: 245px;
        border: 1px solid #ffc107;
        border-bottom: none;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      .fillregisterCommunityInfo {
        display: flex;
        flex-direction: column;
        border: 1px solid #ffc107;
        width: 70%;
        margin-left: 245px;
        padding-top: 100px;
        padding-bottom: 80px;
        height: auto !important;
        span {
          font-weight: bold;
          font-size: 20px;
          margin-left: 100px;
          margin-right: 50px;
          padding-left: 50px;
          line-height: 40px;
          vertical-align: middle;
        }
        div {
          margin-bottom: 40px;
          width: 70%;
          height: auto;
        }
        .elInput {
          width: 60%;
          height: 0;
          float: right;
        }
        .autoHeight {
          height: auto;
          vertical-align: middle;
          margin-bottom: 0px;
        }
      }
    }
    .submitInfo {
      width: 70%;
      background-color: #fafafa;
      height: 50px;
      margin-left: 245px;
      margin-bottom: 100px;
      display: flex;
      justify-content: center;
      .submitInfoButton {
        border-radius: 0 !important;
        width: 15%;
        background-color: #51cbce;
        border-color: #51cbce;
        font-size: 25px;
        .el-icon-plus {
          font-size: 25px;
        }
      }
      .submitInfoButton:hover {
        cursor: pointer;
        color: #cccccc;
      }
    }
  }
</style>