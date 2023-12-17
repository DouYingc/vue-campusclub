<template>
  <div class="announcementIndex">
    <div>
      <content-title
        icon-class="el-icon-message-solid"
        title="公告大厅"
        introduction="任何时间任何地点所有人的一举一动皆在你的眼里~"
        content-background-color="#73B7FF"
        h1-border-color="#81BEFF"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div
      class="announcementInfo"
      :style="{ backgroundColor: notice.backgroundColor }"
      v-show="announcementInfoVisible"
      v-for="(notice, index) in communityNotices"
      :key="index"
    >
      <i class="el-icon-close" @click="closeAnnouncementInfo(notice)"></i>
      <h3>社团名：{{ notice.communityName }}</h3>
      <h4>发布时间：{{notice.AnnouncementDatetime}}</h4>
      <h4>公告内容：{{notice.communityAnnouncement}}</h4>
    </div>
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle'
  import { reqGetCommunityNotice, reqGetCommunityName } from '@/api'
  import moment from 'moment'

  export default {
    components: { ContentTitle },
    data () {
      return {
        communityInfo: [],
        communityNotices: [],
        communityID: '',
        communityName: '',
        announcementInfoVisible: true, // 控制用户信息的显示状态
      }
    },
    methods: {
      fetchCommunityNotices () {
        // const communityID = this.getCommunityInfo[0].communityID
        reqGetCommunityNotice()
          .then(response => {
            this.communityNotices = response.communityNotice || []
            // 格式化时间
            this.communityNotices.forEach(notice => {
              notice.AnnouncementDatetime = moment(notice.AnnouncementDatetime).format('YYYY-MM-DD HH:mm:ss')
            })
          })
          .catch(error => {
            console.error('获取社团公告失败:', error)
          })
      },
      closeAnnouncementInfo (notice) {
        const index = this.communityNotices.indexOf(notice)
        if (index !== -1) {
          this.communityNotices.splice(index, 1)
        }
        localStorage.setItem('announcementInfoVisible', false) // 将状态保存到本地存储
      },
      async getCommunityName (communityID) {
        try {
          const communityNameResponse = await reqGetCommunityName(communityID)
          return communityNameResponse.communityName
        } catch (error) {
          console.error('获取社团名失败:', error)
          return ''
        }
      },
      randomBackgroundColor () {
        // 随机生成五种颜色中的一种
        const colors = ['#E4C4A1', '#CC90CC', '#86D9AB', '#6EC7E0', '#FCD27B']
        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex]
      },
    },
    created () {
      // 调用 Vuex action 来触发获取社团信息的过程
    },
    async mounted () {
      // 页面加载时获取社团公告信息
      this.fetchCommunityNotices()
      try {
        // 获取社团公告信息
        const response = await reqGetCommunityNotice()
        // 存储到 communityNotices 中
        this.communityNotices = response.communityNotice || []
        // 对每条公告获取对应社团名
        // 确保 communityNotices 已经获取后再进行后续操作
        await Promise.all(this.communityNotices.map(async notice => {
          // 通过社团ID获取对应的社团名
          const communityID = notice.communityID
          const communityName = await this.getCommunityName(communityID)
          // 将社团名存入公告信息中
          notice.communityName = communityName
          // 设置随机背景颜色
          notice.backgroundColor = this.randomBackgroundColor()
        }))
        // 格式化时间
        this.communityNotices.forEach(notice => {
          notice.AnnouncementDatetime = moment(notice.AnnouncementDatetime).format('YYYY-MM-DD HH:mm:ss')
        })
      } catch (error) {
        console.error('获取社团公告失败:', error)
      }
    },
    computed: {
    },

  }
</script>

<style lang="less" scoped>
  .announcementIndex {
    display: flex;
    flex-direction: column;
    .announcementInfo {
      position: relative;
      width: 1110px;
      height: auto;
      margin-left: 245px;
      margin-bottom: 100px;
      border-radius: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
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
      h4 {
        color: #ffffff;
        font-size: 20px;
        margin-top: 15px;
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
  }
</style>