<template>
  <div class="reviseInfoWrap">
    <div>
      <content-title
        icon-class="el-icon-s-promotion"
        title="社团信息修改"
        introduction="过去的一页，能不翻就不要翻，翻落了灰尘会迷了双眼~"
        content-background-color="#73B7FF"
        h1-border-color="#81BEFF"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <hr />
    <div class="myCommunityInfo">
      <h1
        style="text-align: center"
        v-for="(community, index) in getCommunityInfo"
        :key="index"
      >{{community.communityName}}</h1>
      <i class="el-icon-s-order">基础信息</i>
      <div class="modifyCommunityInfo">
        <div class="uploadPoster" style="display: flex; align-items: center;">
          <span>社团海报：</span>
          <div class="uploadPosterButton">
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              @change="handleFileChange"
              accept="image/*"
            />
            <el-button type="primary" icon="el-icon-upload" @click="openFileInput">选择文件</el-button>
            <span style="margin-left:10px ">{{ uploadedPictureName }}</span>
          </div>
        </div>
        <!-- 社团人数 -->
        <div class="communityPersonQuantity">
          <span>社团人数：</span>
          <el-input v-model="communityCurrentMembers" placeholder="请输入当前人数" class="elInput"></el-input>
        </div>
        <!-- 创始时间 -->
        <div class="communityCreateDate">
          <span>创始时间：</span>
          <el-date-picker
            v-model="communityCreateDate"
            align="right"
            type="datetime"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            class="elDate"
            format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <!-- 社团简介 -->
        <div class="communityIntroduction">
          <span>社团简介：</span>
          <el-input
            type="textarea"
            rows="3"
            placeholder="请输入内容"
            v-model="communityIntroduction"
            class="elInput autoHeight"
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <!-- 社团成就 -->
        <div class="communityAchievement">
          <span>社团成就：</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="communityAchievement"
            class="elInput autoHeight"
            maxlength="200"
            show-word-limit
          ></el-input>
        </div>
      </div>
    </div>
    <hr />
    <div class="submitInfo">
      <el-button type="primary" class="submitInfoButton" @click="submitInfo">
        <i class="el-icon-plus"></i>提交
      </el-button>
    </div>
  </div>
</template>

<script>  
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqUpdateCommunityInfo } from '@/api'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  // 格式化时间
  import moment from 'moment'
  export default {
    components: { ContentTitle },
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        communityInfo: [],
        communityCreateDate: '',
        communityIntroduction: '',
        communityAchievement: '',
        communityCurrentMembers: '',
        uploadedPictureName: '未选择任何文件',
        communityPoster: '',
      }
    },
    methods: {
      // 格式化时间
      getCurrentDateTime () {
        const currentDate = new Date()
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
        this.communityCreateDate = formattedDate
      },
      submitInfo () {
        this.getCurrentDateTime()
        if (!this.communityPoster) {
          this.$message.error('请上传社团海报')
          return // 阻止提交
        }

        if (!this.communityCurrentMembers) {
          this.$message.error('请填写社团目前人数')
          return // 阻止提交
        }

        if (!this.communityCreateDate) {
          this.$message.error('请选择社团创始时间')
          return // 阻止提交
        }

        if (!this.communityIntroduction) {
          this.$message.error('请填写社团简介')
          return // 阻止提交
        }
        if (!this.communityAchievement) {
          this.$message.error('请填写社团成就')
          return // 阻止提交
        }
        const username = localStorage.getItem('username')
        const {
          communityPoster,
          communityCurrentMembers,
          communityCreateDate,
          communityIntroduction,
          communityAchievement
        } = this
        // 假设这些数据已经在页面中填写或获取
        const updateCommunityInfo = {
          username,
          communityPoster,
          communityCurrentMembers,
          communityCreateDate,
          communityIntroduction,
          communityAchievement
        }
        // const username = localStorage.getItem('username')
        // const formData = new FormData()
        // formData.append('username', username)
        // formData.append('communityPoster', this.communityPoster)
        // 使用封装的 Axios 请求函数发送更新请求
        reqUpdateCommunityInfo(updateCommunityInfo)
          .then(response => {
            // 处理成功响应
            this.$message.success('更新社团信息成功')
            // 可以进行其他操作，比如重置表单
            // 提交成功后重置表单数据
            this.communityPoster = ''
            this.communityCurrentMembers = ''
            this.communityCreateDate = ''
            this.communityIntroduction = ''
            this.communityIntroduction = ''
            this.communityAchievement = ''
          })
          .catch(error => {
            // 处理错误
            console.error('更新社团信息失败:', error)
            // 可以给出用户错误提示
          })
      },

      openFileInput () {
        this.$refs.fileInput.click()
      },
      handleFileChange (event) {
        const file = event.target.files[0]
        if (file) {
          // 检查文件类型是否为图片
          if (this.isImage(file)) {
            // 将选择的文件名赋值给 uploadedPictureName
            this.uploadedPictureName = file.name
            // 将文件内容存储在 this.communityPoster 中
            const reader = new FileReader()
            reader.onload = (e) => {
              this.communityPoster = e.target.result
            }
            reader.readAsDataURL(file)
            // 这里执行文件处理逻辑
          } else {
            // 非图片文件，给出提示
            Message.error('请选择图片文件')
          }
        }
      },
      isImage (file) {
        // 允许的图片类型，可以根据需要扩展
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        // 检查文件类型是否为允许的图片类型
        return allowedImageTypes.includes(file.type)
      },

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
  .reviseInfoWrap {
    display: flex;
    flex-direction: column;
    hr {
      width: 70%;
      margin-left: 245px;
      margin-bottom: 80px;
      border-color: #efefef;
      box-sizing: content-box;
      height: 0;
      overflow: visible;
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    h2 {
      margin: 0 auto;
      margin-bottom: 40px;
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
    .myCommunityInfo {
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
      .modifyCommunityInfo {
        border: 1px solid #ffc107;
        width: 70%;
        margin-left: 245px;
        padding-top: 100px;
        padding-bottom: 100px;
        height: auto;
        span {
          font-weight: bold;
          font-size: 20px;
          margin-left: 150px;
          margin-right: 50px;
          vertical-align: middle;
        }
        div {
          margin-bottom: 40px;
        }
        .elInput {
          width: 40%;
          height: 0;
        }
        .autoHeight {
          height: auto;
          vertical-align: middle;
          margin-bottom: 0px;
        }
        .communityCreateDate {
          height: 40px;
          .elDate {
            width: 40%;
          }
        }
        .uploadPoster {
          height: 80px;
          .uploadPosterButton {
            margin-top: 40px;
            vertical-align: middle;
          }
          .submitPoster {
            background-color: #51cbce;
            border-color: #51cbce;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>