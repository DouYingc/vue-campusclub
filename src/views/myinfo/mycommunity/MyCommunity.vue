<template>
  <div class="CommunityIntroduction">
    <div v-if="isLoggedIn">
      <content-title
        v-for="(community, index) in getCommunityInfo"
        :key="`community_${index}_${community.communityName}`"
        icon-class="el-icon-s-tools"
        :title="community.communityName"
        :introduction="`创始人: ${community.communityResponsiblePerson} 成立时间: ${formatDate(community.CommunityCreateDate)} 目前人数: ${community.communityCurrentMembers}/${community.communityAnticipatMembers}`"
        content-background-color="#22AAAA"
        h1-border-color="#39B3B3"
        span-border-color="#51CBCE"
        icon-color="#ffffff"
      />
    </div>
    <!-- 显示注册或加入社团的按钮 -->
    <el-dialog v-if="isLoggedIn && getCommunityInfo.length === 0">
      <el-button type="primary" @click="registerCommunity">注册社团</el-button>
      <el-button type="success" @click="joinCommunity">加入社团</el-button>
    </el-dialog>
    <el-dialog title="请登录" :visible="!isLoggedIn" @close="handleDialogClose">
      <p>您还没有登录，请登录查看您的社团</p>
    </el-dialog>
    <div class="CommunityInfo">
      <div
        v-for="(community, index) in getCommunityInfo"
        :key="`intro_${index}_${community.communityIntroduction}`"
      >
        <h3>
          <i class="el-icon-tickets"></i>社团简介
        </h3>
        <hr style="border-color: #FF4500;" />
        <p style="border-left: 5px solid #FF4500;">{{community.communityIntroduction}}</p>
      </div>
      <div
        v-for="(community, index) in getCommunityInfo"
        :key="`poster_${index}_${community.communityPoster}`"
      >
        <h3>
          <i class="el-icon-picture"></i>社团海报
        </h3>
        <hr style="border-color: #8A2BE2;" />
        <img :src="community.communityPoster" alt="社团海报" />
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
      <div>
        <h3>
          <i class="el-icon-s-comment"></i>社团生活照上传
        </h3>
        <hr style="border-color: #008000;" />
        <el-upload
          class="upload-demo"
          action="http://10.6.89.156:3000/api/uploadCommunityPhoto"
          ref="upload"
          :list-type="'picture-card'"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :multiple="true"
          name="communityPhoto"
          :data="extraData"
          :before-upload="handleBeforeUpload"
          accept="image/*"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-button
          style="margin-left: 40%; margin-top: 30px; font-size: 30px"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </div>
      <div
        v-for="(community, index) in getCommunityInfo"
        :key="`achievement_${index}_${community.communityAchievement}`"
      >
        <h3>
          <i class="el-icon-trophy"></i>社团成就
        </h3>
        <hr style="border-color: #E46571;" />
        <p style="border-left: 5px solid #FF4500;">{{community.communityAchievement}}</p>
      </div>
    </div>
  </div>
</template>

<script>      
  import ContentTitle from '@/components/ContentTitle.vue'
  import { Dialog, Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { reqGetCommunityPhotoURL } from '@/api'
  export default {
    components: { ContentTitle },
    data () {
      return {
        communityInfo: [],
        communityID: '',
        isLoggedIn: false,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        extraData: {
          photoTitle: [],
          communityID: ''
        },
        url: '',
        srcList: [
        ],
      }
    },
    methods: {
      async fetchPhotoURLs () {
        if (this.getCommunityInfo.length > 0) {
          try {
            const communityID = this.getCommunityInfo[0].communityID
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
      submitUpload () {
        this.extraData.communityID = this.getCommunityInfo[0].communityID
        this.$message.success('上传社团生活照成功！')
        this.$refs.upload.submit()
      },
      handleRemove (file) {
        console.log(file)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleBeforeUpload (file) {
        // 清空数组，确保每次选择文件时只收集新选择的文件名
        this.extraData.photoTitle = []
        // 将文件名添加到 photoTitle 数组中
        this.extraData.photoTitle.push(file.name)
        return true // 允许上传
      },
      handleDownload (file) {
        console.log(file)
      },
      fetchCommunityInfo () {
        const username = localStorage.getItem('username')
        if (username) {
          this.isLoggedIn = true
        }
      },
      formatDate (dateTime) {
        const date = new Date(dateTime)
        return date.toISOString().split('T')[0]
      },
      registerCommunity () {
        this.$router.push('/register')
      },
      joinCommunity () {
      },
      handleDialogClose () {
        // 显示消息提示
        Message({
          message: '您即将跳转到登录页面',
          type: 'warning'
        })
        // 延迟跳转到登录页面
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500) // 1.5秒后执行跳转
      }
    },
    created () {
      this.fetchCommunityInfo()
      // 调用 Vuex action 来触发获取社团信息的过程
      this.$store.dispatch('fetchCommunityInfo').then(() => {
        if (this.getCommunityInfo.length > 0) {
          const communityID = this.getCommunityInfo[0].communityID
        }
      })
      this.fetchPhotoURLs()
    },
    computed: {
      ...mapGetters(['getCommunityInfo']),// 将 Vuex 中的 communityInfo 映射为组件的计算属性
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .CommunityIntroduction {
    display: flex;
    flex-direction: column;
    .CommunityInfo {
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