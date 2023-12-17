<template>
  <div>
    <div class="allCommunityIntroduction">
      <div v-if="communityInfo.length > 0">
        <content-title
          icon-class="el-icon-s-tools"
          :title="communityInfo[0].communityName"
          :introduction="`创始人: ${communityInfo[0].communityResponsiblePerson} 成立时间: ${formatDate(communityInfo[0].CommunityCreateDate)} 目前人数: ${communityInfo[0].communityCurrentMembers}/${communityInfo[0].communityAnticipatMembers}`"
          content-background-color="#73B7FF"
          h1-border-color="#81BEFF"
          span-border-color="#51CBCE"
          icon-color="#004EFF"
        />
      </div>
      <div class="communityInfo">
        <div v-if="communityInfo.length > 0">
          <h3>
            <i class="el-icon-tickets"></i>社团简介
          </h3>
          <hr style="border-color: #FF4500;" />
          <p style="border-left: 5px solid #FF4500;">{{communityInfo[0].communityIntroduction}}</p>
        </div>
        <div v-if="communityInfo.length > 0">
          <h3>
            <i class="el-icon-picture"></i>社团海报
          </h3>
          <hr style="border-color: #8A2BE2;" />
          <img :src="communityInfo[0].communityPoster" alt="社团海报" />
        </div>
        <div v-if="communityInfo.length > 0">
          <h3>
            <i class="el-icon-trophy"></i>社团成就
          </h3>
          <hr style="border-color: #E46571;" />
          <p style="border-left: 5px solid #FF4500;">{{communityInfo[0].communityAchievement}}</p>
        </div>
        <div>
          <h3>
            <i class="el-icon-picture-outline"></i>社团生活照
          </h3>
          <hr style="border-color: #008000;" />
          <el-image
            v-for="(url, index) in srcList"
            :key="`image_${index}`"
            style="width: 200px; height: 200px; margin-right: 15px;"
            :src="url"
            :preview-src-list="srcList"
          ></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentTitle from "@/components/ContentTitle"
  import { mapGetters } from 'vuex'
  import { reqGetCommunityInfoById } from '@/api'
  import { reqGetCommunityPhotoURL } from '@/api'
  export default {
    components: { ContentTitle },
    data () {
      return {
        communityInfo: [],
        url: '',
        srcList: [
        ],
      }
    },
    methods: {
      async fetchPhotoURLs () {
        if (this.getCommunityInfo.length > 0) {
          try {
            const communityID = this.$route.params.communityID
            const response = await reqGetCommunityPhotoURL(communityID)
            // console.log(response)
            this.srcList = response.photoURLs
            // console.log(this.srcList)
            // console.error('获取照片URL失败: 数据格式不符合预期')
          } catch (error) {
            console.error('获取照片URL失败:', error)
          }
        }
      },
      formatDate (dateTime) {
        const date = new Date(dateTime)
        return date.toISOString().split('T')[0]
      },
    },
    created () {
      this.$store.dispatch('fetchCommunityInfo')
      const communityID = this.$route.params.communityID
      // this.fetchCommunityInfo()
      // 使用路由中的社团ID来获取信息
      reqGetCommunityInfoById(communityID)
        .then((response) => {
          this.communityInfo = response.communityInfo
        })
        .catch((error) => {
          console.error(error)
        })
      this.fetchPhotoURLs()
    },
    computed: {
      ...mapGetters(['getCommunityInfo']),// 将 Vuex 中的 communityInfo 映射为组件的计算属性
    },
  };
</script>

<style lang="less" scoped>
  .allCommunityIntroduction {
    display: flex;
    flex-direction: column;
    .communityInfo {
      width: 70%;
      margin-bottom: 80px;
      font-size: 25px;
      margin-left: 260px;
      div {
        margin-top: 50px;
      }
      i {
        text-align: center;
        font-weight: bold;
      }
      hr {
        margin-bottom: 40px;
      }
      p {
        font-size: 20px;
        padding-left: 35px;
      }
      img {
        display: block; /* 让图片独占一行 */
        margin: 0 auto; /* 水平居中 */
        width: 200px;
        height: 200px;
      }
    }
  }
</style>