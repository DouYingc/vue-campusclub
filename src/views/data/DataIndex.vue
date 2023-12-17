<template>
  <div class="DataIndex">
    <div>
      <content-title
        icon-class="el-icon-folder-opened"
        title="资料大厅"
        introduction="愿你找不到的这里都能找到，愿你想要的这里都有~"
        content-background-color="#B4ACE5"
        h1-border-color="#BCB4E8"
        span-border-color="#51CBCE"
        icon-color="#004EFF"
      />
    </div>
    <div class="uploadData">
      <h1 style="margin-bottom: 20px;">上传资料</h1>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:3000/api/uploadFile"
        :auto-upload="false"
        :multiple="true"
        :data="extraData"
      >
        <div slot="tip" class="el-upload__tip">温馨提示：上传资料前最好将资料先重命名哦~</div>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </el-upload>
    </div>
    <hr />
    <div
      v-for="(file, index) in fileList"
      :key="index"
      class="dataInfo"
      :style="{ background: file.randomBackgroundColor }"
      v-show="dataInfoVisible"
    >
      <i class="el-icon-close" @click="closeDataInfo(file)"></i>
      <h3>文件名：{{file.resourceName}}</h3>
      <h4>上传用户：{{file.username}}</h4>
      <h4>上传时间：{{file.uploadDate}}</h4>
      <i class="el-icon-download download" @click="handleDownload(file.resourceName)">下载</i>
    </div>
    <hr />
  </div>
</template>

<script>
  import ContentTitle from "@/components/ContentTitle"
  import { downloadFile } from "@/api"
  // import { reqUploadFile } from "@/api"
  import { mapGetters } from 'vuex'
  import { fetchFileList } from "@/api"
  // 格式化时间
  import moment from 'moment'

  export default {
    components: { ContentTitle },
    data () {
      return {
        uploadedFileName: '',
        dataInfoVisible: true, // 控制用户信息的显示状态
        fileList: [], // 存储文件列表
        extraData: {
          username: localStorage.getItem('username'),// 将用户名作为附加的数据
          communityID: ''
        }
      }
    },
    methods: {
      // 获取并显示文件列表的方法
      displayFileList () {
        fetchFileList()
          .then((response) => {
            // 将获取到的文件列表赋值给组件的 fileList 属性
            this.fileList = response.fileList
            this.formatDateTime() // 格式化日期时间
            this.randomBackgroundColor() // 分配随机颜色
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
      submitUpload () {
        // const files = this.$refs.upload.uploadFiles.map((fileItem) => fileItem.raw)
        // const username = localStorage.getItem('username') // 从本地存储中获取用户名
        // // 遍历上传所有文件
        // files.forEach((file) => {
        //   reqUploadFile(file, username)
        //     .then((response) => {
        //       console.log('文件上传成功:', response)
        //     })
        //     .catch((error) => {
        //       console.error('文件上传失败:', error)
        //     })
        // })
        const files = this.$refs.upload.uploadFiles.map((fileItem) => fileItem.raw)
        if (files.length === 0) {
          // 如果未选择文件，通过消息提示或其他方式提醒用户选择文件
          this.$message.error('请先选择文件')
          return // 不执行上传操作
        }
        const communityID = this.getCommunityInfo[0].communityID
        this.extraData.communityID = communityID
        this.$message.success('上传资料成功！')
        this.$refs.upload.submit()
      },
      closeDataInfo (file) {
        const index = this.fileList.indexOf(file)
        if (index !== -1) {
          this.fileList.splice(index, 1)
        }
        localStorage.setItem('dataInfoVisible', false) // 将状态保存到本地存储
      },
      randomBackgroundColor () {
        const colors = ['#E4C4A1', '#CC90CC', '#86D9AB', '#6EC7E0', '#FCD27B']
        this.fileList.forEach((file) => {
          const randomIndex = Math.floor(Math.random() * colors.length)
          file.randomBackgroundColor = colors[randomIndex]
        })
      },
      handleDownload (filename) {
        downloadFile(filename)
      }
    },
    mounted () {
      this.displayFileList() // 调用获取文件列表的方法
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
  .DataIndex {
    display: flex;
    flex-direction: column;
    hr {
      margin-bottom: 100px;
      width: 1110px;
      margin-left: 245px;
      border: 1px solid !important;
      border-color: #bac9ff !important;
      &:nth-of-type(2) {
        border: 1px solid !important;
        border-color: #ff4500 !important;
      }
    }
    .uploadData {
      margin-left: 245px;
      margin-bottom: 100px;
      .gradientBackground {
        background: linear-gradient(to right, #51cbce, #cfaaaa);
        color: white;
      }
      .uploadDataButton {
        vertical-align: middle;
        .submitData {
          font-size: 20px;
          border: none !important;
          width: 150px;
        }
      }
      :deep(.el-input__inner) {
        width: 80%;
        border-width: 0 0 1px; /* 仅底部边框 */
        border-radius: 0;
      }
      /* 获取焦点时的样式 */
      :deep(.el-input__inner:focus) {
        border-color: #3bb6b6; /* 底部边框获取焦点时的颜色 */
      }
      .submitDatabase {
        border: none !important;
        width: 100px;
        font-size: 18px;
      }
    }
    .dataInfo {
      position: relative;
      width: 1110px;
      height: auto;
      margin-left: 245px;
      margin-bottom: 100px;
      padding-left: 10px;
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
  }
</style>