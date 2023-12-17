<template>
  <div class="communityIndex">
    <div>
      <content-title
        icon-class="el-icon-s-home"
        title="社团大厅"
        introduction="生活不止眼前的苟且，还有生活和远方，愿你最终能成为你想成为的人~"
        content-background-color="#73B7FF"
        h1-border-color="#81BEFF"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div class="card">
      <router-link
        v-for="(community, index) in communityInfo"
        :key="index"
        :to="'/community/' + community.communityID"
        class="communityCard"
        style="color: inherit; text-decoration: none;"
      >
        <div class="communityPoster">
          <img :src="community.communityPoster" alt style="width: 525px; height: 350px" />
        </div>
        <div class="communityInfo">
          <div class="communityRP">
            <span>创始人：{{ community.communityResponsiblePerson}}</span>
          </div>
          <h1 class="communityName">{{community.communityName}}</h1>
          <p>{{shortenedIntroduction(community.communityIntroduction)}}</p>
        </div>
        <div class="communityDate">
          <p>创建时间：{{community.CommunityCreateDate}}</p>
        </div>
      </router-link>
    </div>
    <hr />
  </div>
</template>

<script>
  import ContentTitle from "@/components/ContentTitle"
  import { reqGetAllCommunityInfo } from "@/api"
  // 格式化时间
  import moment from 'moment'

  export default {
    components: { ContentTitle },
    data () {
      return {
        communityInfo: [] // 存储社团信息的数组
      }
    },
    created () {
      this.getAllCommunityInfo()
    },
    methods: {
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
    },
    computed: {
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
  }
</script>

<style lang="less" scoped>
  .communityIndex {
    display: flex;
    flex-direction: column;
    hr {
      width: 70%;
      margin-left: 245px;
      margin-bottom: 150px;
      margin-top: 50px;
      border-color: #efefef;
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .card {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)); /* 设置两列 */
      gap: 20px; /* 设置卡片之间的间距 */
      margin-left: 245px;
    }
    .communityCard {
      width: 525px;
      height: 600px;
      margin-bottom: 80px;
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
</style>