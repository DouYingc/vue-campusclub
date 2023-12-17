<template>
  <div class="home">
    <div class="title" style>
      <h1>
        <i class="el-icon-s-home" style="color: red; margin-right: 20px"></i>社团
      </h1>
    </div>
    <div class="card">
      <router-link
        v-for="(community, index) in communityInfo.slice(0, 2)"
        :key="index"
        :to="'/community/' + community.communityID"
        class="communityCard"
        style="color: inherit; text-decoration: none;"
      >
        <div class="communityPoster">
          <img :src="communityInfo[index].communityPoster" alt style="width: 525px; height: 350px" />
        </div>
        <div class="communityInfo">
          <div class="communityRP">
            <span>创始人：{{ communityInfo[index].communityResponsiblePerson}}</span>
          </div>
          <h1 class="communityName">{{communityInfo[index].communityName}}</h1>
          <p>{{shortenedIntroduction(community.communityIntroduction)}}</p>
        </div>
        <div class="communityDate">
          <p>创建时间：{{communityInfo[index].CommunityCreateDate}}</p>
        </div>
      </router-link>
      <div class="jump">
        <el-button type="primary" class="jumpButton">
          <router-link to="/community" style="color: inherit; text-decoration: none;">
            <i class="el-icon-plus" style="font-weight: bold"></i>查看更多
          </router-link>
        </el-button>
      </div>
    </div>
    <div class="title">
      <h1>
        <i class="el-icon-message-solid" style="color: red; margin-right: 20px"></i>最新公告
      </h1>
    </div>
    <el-carousel indicator-position="outside" height="200px" :interval="8000" class="elCarousel">
      <el-carousel-item v-for="(notice, index) in communityNotices.slice(0, 5)" :key="index">
        <div class="announcementInfo" :style="{ backgroundColor: notice.backgroundColor }">
          <i class="el-icon-close" @click="closeAnnouncementInfo(notice)"></i>
          <h3>社团名：{{ notice.communityName }}</h3>
          <h4>发布时间：{{ notice.AnnouncementDatetime }}</h4>
          <h4>公告内容：{{ notice.communityAnnouncement }}</h4>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="jump" style="margin-left: 245px">
      <el-button type="primary" class="jumpButton" style="width: 300px; margin-left: 915px">
        <router-link to="/announcement" style="color: inherit; text-decoration: none;">
          <i class="el-icon-plus" style="font-weight: bold"></i>查看更多
        </router-link>
      </el-button>
    </div>
    <div class="title">
      <h1>
        <i class="el-icon-download" style="color: red; margin-right: 20px"></i>资料下载
      </h1>
    </div>
    <el-carousel indicator-position="outside" height="200px" :interval="8000" class="elCarousel">
      <el-carousel-item v-for="(file, index) in fileList.slice(0, 3)" :key="index">
        <div
          class="dataInfo"
          :style="{ backgroundColor: file.backgroundColor }"
          v-show="dataInfoVisible"
        >
          <i class="el-icon-close" @click="closeDataInfo(file)"></i>
          <h3>文件名：{{file.resourceName}}</h3>
          <h4>上传用户：{{file.username}}</h4>
          <h4>上传时间：{{file.uploadDate}}</h4>
          <i class="el-icon-download download" @click="handleDownload(file.resourceName)">下载</i>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="jump" style="margin-left: 245px; margin-bottom: 100px">
      <el-button type="primary" class="jumpButton" style="width: 300px; margin-left: 915px">
        <router-link to="/data" style="color: inherit; text-decoration: none;">
          <i class="el-icon-plus" style="font-weight: bold"></i>查看更多
        </router-link>
      </el-button>
    </div>
    <div @click="toggleContent" class="arrow" :class="{ 'active': showContent }">
      <i :class="arrowIconClass"></i>
    </div>
    <transition name="fade">
      <div v-if="showContent" class="content">
        <h1>
          <i class="el-icon-s-custom"></i>注册属于你自己的社团
        </h1>
        <router-link to="/myinfo/registerCommunity">
          <el-button style="background: #333333">社团注册</el-button>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  import { reqGetAllCommunityInfo } from '@/api'
  import { reqGetCommunityNotice, reqGetCommunityName } from '@/api'
  import { downloadFile } from "@/api"
  import { fetchFileList } from "@/api"
  import 'font-awesome/css/font-awesome.min.css'
  // 格式化时间
  import moment from 'moment'

  export default {
    data () {
      return {
        communityInfo: [],// 存储社团信息的数组
        communityNotices: [],
        communityID: '',
        communityName: '',
        announcementInfoVisible: true, // 控制用户信息的显示状态
        dataInfoVisible: true, // 控制用户信息的显示状态
        fileList: [], // 存储文件列表
        extraData: {
          username: localStorage.getItem('username') // 将用户名作为附加的数据
        },
        showContent: false // 控制内容显示与隐藏的状态
      }
    },
    methods: {
      toggleContent () {
        this.showContent = !this.showContent // 点击按钮时切换内容的显示与隐藏
      },
      getAllCommunityInfo () {
        reqGetAllCommunityInfo()
          .then(response => {
            this.communityInfo = response.communityInfo
            this.formatDateTime() // 格式化日期时间
          })
          .catch(error => {
            console.error("获取社团信息失败:", error)
            // 处理获取失败的情况
          })
      },
      // 格式化时间函数
      formatDateTime () {
        this.communityInfo.forEach((community) => {
          community.CommunityCreateDate = moment(community.CommunityCreateDate).format('YYYY-MM-DD HH:mm:ss')
        })
      },
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
      displayFileList () {
        fetchFileList()
          .then((response) => {
            // 将获取到的文件列表赋值给组件的 fileList 属性
            this.fileList = response.fileList
            this.formatDateTime() // 格式化日期时间
            // 分配与公告相同的随机颜色
            this.fileList.forEach(file => {
              file.backgroundColor = this.randomBackgroundColor()
            })
          })
          .catch((error) => {
            console.error('获取文件列表出错:', error)
          })
      },
      formatDateTime () {
        this.fileList.forEach((file) => {
          file.uploadDate = moment(file.uploadDate).format('YYYY-MM-DD HH:mm:ss')
        })
      },
      closeDataInfo (file) {
        const index = this.fileList.indexOf(file)
        if (index !== -1) {
          this.fileList.splice(index, 1)
        }
        localStorage.setItem('dataInfoVisible', false) // 将状态保存到本地存储
      },
      handleDownload (filename) {
        downloadFile(filename)
      }
    },
    computed: {
      arrowIconClass () {
        return this.showContent ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
      },
      // 截取文本长度的计算属性
      shortenedIntroduction () {
        return (text) => {
          const maxLength = 100 // 设置最大长度
          if (text.length > maxLength) {
            return text.slice(0, maxLength) + '......'
          }
          return text
        }
      },
    },
    created () {
      this.getAllCommunityInfo()
      // 调用 Vuex action 来触发获取社团信息的过程
    },
    async mounted () {
      this.displayFileList() // 调用获取文件列表的方法
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

  }
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    flex-direction: column;
    .title {
      margin-left: 245px;
      margin-top: 100px;
      width: 1185px;
      background-color: #fafafa;
      padding: 15px;
      font-weight: bold;
      font-family: '东方大楷' !important;
    }
    .card {
      margin-top: 100px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)); /* 设置两列 */
      gap: 20px; /* 设置卡片之间的间距 */
      margin-left: 245px;
      .communityCard {
        width: 525px;
        height: 600px;
        margin-bottom: 50px;
        border: 1px solid #e5e5e5;
        transition: transform 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
        &:hover {
          transform: translateY(-15px); /* 鼠标悬停时向上移动 */
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
        }
        .communityPoster {
          border-bottom: 1px solid #e5e5e5;
        }
        .communityInfo {
          padding-top: 30px;
          padding-left: 30px;
          height: 170px;
          .communityRP {
            font-weight: bold;
            color: #51d5e4;
            margin-bottom: 10px;
          }
          .communityName {
            margin-bottom: 20px;
          }
        }
        .communityDate {
          padding-top: 17px;
          padding-left: 30px;
          border-top: 1px solid #e5e5e5;
        }
      }
    }
    .jump {
      width: 1215px;
      background-color: #fafafa;
      height: 50px;
      margin-bottom: 50px;
      display: flex;
      grid-column: span 2;
      .jumpButton {
        width: 607px;
        margin-left: 608px;
        border-radius: 0 !important;
        background-color: #333333;
        border-color: #333333;
        font-size: 25px;
        .el-icon-plus {
          font-size: 25px;
        }
      }
      .jumpButton:hover {
        cursor: pointer;
        color: #cccccc;
      }
    }
    .elCarousel {
      width: 1215px;
      margin-left: 245px;
      margin-bottom: 50px;
    }
    .announcementInfo {
      position: relative;
      width: 1195px;
      height: auto;
      padding: 10px;
      margin-top: 30px;
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
    .dataInfo {
      position: relative;
      width: 1195px;
      height: auto;
      margin-bottom: 50px;
      margin-top: 30px;
      padding: 10px;
      border-radius: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-20px);
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
      .download {
        color: black;
        margin-top: 43px;
        margin-right: 130px;
        font-size: 25px;
      }
    }
    .arrow {
      width: 1215px;

      text-align: center;
      margin-left: 245px;
      font-size: 50px;
      font-weight: bold;
      background-color: #fafafa;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      i {
        cursor: pointer;
        &:hover {
          color: #f5deb3;
        }
      }
    }
    .content {
      width: 1215px;
      text-align: center;
      margin-left: 245px;
      background-color: #fafafa;
      height: 100px;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* 添加过渡效果 */
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
    .fade-enter,
    .fade-leave-to {
      transform: translateX(-120px); /* 初始状态下向上偏移 */
    }
    .fade-enter-done,
    .fade-leave {
      transform: translateX(0); /* 完成状态下不偏移 */
    }
  }
</style>