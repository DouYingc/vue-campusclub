<template>
  <div class="wrap">
    <div>
      <content-title
        icon-class="el-icon-s-shop"
        title="加入社团"
        introduction="在这里，你寻找与你志同道合的人吧~"
        content-background-color="#22AAAA"
        h1-border-color="#39B3B3"
        span-border-color="#51CBCE"
        icon-color="#ffffff"
      />
    </div>
    <div class="filCommunity">
      <i class="el-icon-s-order">基础信息</i>
      <div class="fillInfo">
        <!-- 社团名 -->
        <div class="communityName">
          <span>社团名：</span>
          <el-select
            ref="communitySelect"
            v-model="selectedCommunityId"
            placeholder="请选择社团名"
            class="elInput"
          >
            <el-option
              v-for="community in communityInfo"
              :key="community.id"
              :label="community.communityName"
              :value="community.communityID"
            ></el-option>
          </el-select>
        </div>
        <!-- 用户名 -->
        <div class="contactInformation">
          <span>用户名：</span>
          <el-input
            v-model="username"
            placeholder="请输入您的用户名"
            class="elInput"
            maxlength="30"
            type="text"
          ></el-input>
        </div>
        <!-- 联系方式 -->
        <div class="contactInformation">
          <span>联系方式：</span>
          <el-input
            v-model="contactInformation"
            placeholder="请输入您的联系方式"
            class="elInput"
            maxlength="30"
            type="text"
            onkeyup="this.value=this.value.replace(/[^\w.@]/ig,'')"
          ></el-input>
        </div>
        <!-- 加入社团的理由 -->
        <div class="reason">
          <span>自我介绍：</span>
          <el-input
            v-model="reason"
            placeholder="自我介绍,为什么选择加入这个社团"
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
      <el-button type="primary" class="submitInfoButton" @click="handleSubmission">
        <i class="el-icon-plus"></i>提交
      </el-button>
    </div>
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqGetAllCommunityInfo } from '@/api'
  import { reqJoinCommunity } from '@/api'
  // 格式化时间
  import moment from 'moment'

  export default {
    components: {
      ContentTitle
    },
    data () {
      return {
        communityInfo: [],
        communityName: [],
        contactInformation: '',
        username: localStorage.getItem('username'),
        reason: '',
        selectedCommunityId: ''
      }
    },
    methods: {
      handleSubmission () {
        if (!this.selectedCommunityId) {
          this.$message.error('请填写社团名！')
          return // 阻止提交
        }
        if (!this.username) {
          this.$message.error('请填写用户名！')
          return // 阻止提交
        }
        if (!this.contactInformation) {
          this.$message.error('请填写联系方式！')
          return // 阻止提交
        }
        if (!this.reason) {
          this.$message.error('请填写自我介绍！')
          return // 阻止提交
        }
        const formData = {
          username: localStorage.getItem('username'),
          communityID: this.selectedCommunityId, // 假设这个属性是选定的社团ID
          joinDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          status: 0, // 默认为0 审核通过为1 审核失败为2
          contactInformation: this.contactInformation,
          reason: this.reason
        }
        reqJoinCommunity(formData)
          .then(response => {
            // 清空表单数据
            this.$message.success('提交申请成功，请等待审核！')
            this.username = ''
            this.contactInformation = ''
            this.reason = ''
            this.selectedCommunityId = ''
          })
          .catch(error => {
            // 处理提交失败
            console.error('Submission failed:', error)
            // 可以在这里添加用户提示或错误处理逻辑
          })
      },
    },
    created () {
      // 或者使用你的 reqGetAllCommunityInfo() 方法
      reqGetAllCommunityInfo().then((response) => {
        // 假设获取到的信息在 response.data.communityInfo 中
        this.communityInfo = response.communityInfo
      }).catch((error) => {
        console.error('Failed to fetch community info:', error)
      })
    },
    computed: {
    },
  }
</script>

<style lang="less" scoped>
  .wrap {
    display: flex;
    flex-direction: column;
    .filCommunity {
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
      .fillInfo {
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