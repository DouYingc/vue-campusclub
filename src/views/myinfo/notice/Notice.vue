<template>
  <div class="postNotice">
    <div>
      <content-title
        icon-class="el-icon-s-check"
        title="发布公告"
        introduction="在这里，你仿佛赋予了一个新的生命~"
        content-background-color="#FAA494"
        h1-border-color="#FBAD9F"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div class="myPostNoticeInfo">
      <i class="el-icon-s-order">基本信息</i>
      <div class="PostNoticeInfo">
        <h1 v-for="(community, index) in getCommunityInfo" :key="index">{{community.communityName}}</h1>
        <h3>公告内容</h3>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="最多输入300字"
          class="elInput"
          maxlength="300"
          v-model="communityAnnouncement"
        ></el-input>
      </div>
    </div>
    <div class="submitInfo">
      <el-button type="primary" class="submitInfoButton" @click="handleNoticeSubmission">
        <i class="el-icon-plus"></i>提交
      </el-button>
    </div>
    <hr />
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqPostCommunityNotice } from '@/api'
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    components: { ContentTitle },
    data () {
      return {
        communityInfo: [],
        communityAnnouncement: '',
        AnnouncementDatetime: '',
        communityName: ''
      }
    },
    methods: {
      getCurrentDateTime () {
        const currentDate = new Date()
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
        this.AnnouncementDatetime = formattedDate
      },
      handleNoticeSubmission () {
        this.getCurrentDateTime()
        // 从 Vuex 的 getCommunityInfo 中获取 communityID
        if (!this.communityAnnouncement) {
          this.$message.error('请填写社团公告')
          return // 阻止提交
        }
        const communityID = this.getCommunityInfo[0].communityID
        const {
          communityAnnouncement,
          AnnouncementDatetime
        } = this
        const AnnouncementData = {
          communityAnnouncement,
          AnnouncementDatetime,
          communityID
        }
        // 调用axios函数发送数据到后端
        reqPostCommunityNotice(AnnouncementData)
          .then(response => {
            // 处理成功的情况
            this.$message.success('社团公告发布成功！')
            // 在这里你可以进行一些成功后的操作，比如提示用户发布成功等等
            this.communityAnnouncement = ''
          })
          .catch(error => {
            // 处理错误情况
            console.error('社团公告发布失败！', error)
            // 在这里你可以进行一些失败后的操作，比如提示用户发布失败等等
          })
      }
    },
    created () {
      // 调用 Vuex action 来触发获取社团信息的过程
      this.$store.dispatch('fetchCommunityInfo')
    },
    computed: {
      ...mapGetters(['getCommunityInfo']),// 将 Vuex 中的 communityInfo 映射为组件的计算属性
    },
  }
</script>

<style lang="less" scoped>
  .postNotice {
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
    hr {
      width: 70%;
      margin-left: 245px;
      margin-bottom: 80px;
      border-color: #7facad;
      box-sizing: content-box;
      height: 0;
      overflow: visible;
      border: 0;
      border-top: 1px solid #7facad;
    }
    .myPostNoticeInfo {
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
      .PostNoticeInfo {
        border: 1px solid #ffc107;
        width: 70%;
        margin-left: 245px;
        padding-top: 50px;
        padding-bottom: 100px;
        height: auto;
        h1 {
          text-align: center;
          font-weight: 900;
          margin-bottom: 100px;
        }
        h3 {
          text-align: center;
          margin-bottom: 30px;
        }
        .elInput {
          width: 45%;
          height: auto;
          text-align: center;
          margin-left: 300px;
        }
      }
    }
  }
</style>