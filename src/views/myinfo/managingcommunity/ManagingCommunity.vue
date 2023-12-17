<template>
  <div class="wrap">
    <div>
      <content-title
        icon-class="el-icon-s-shop"
        title="管理社团"
        introduction="在这里，管理你的社团吧~"
        content-background-color="#22AAAA"
        h1-border-color="#39B3B3"
        span-border-color="#51CBCE"
        icon-color="#ffffff"
      />
    </div>
    <div class="managingContent">
      <div class="Mcontent">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 85%">
          <el-tab-pane label="用户审核" name="first" style="width: 100%">
            <el-table
              ref="multipleTable"
              :data="communityUserData"
              tooltip-effect="dark"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="username" label="用户名" width="120" align="center" sortable></el-table-column>
              <el-table-column prop="joinDate" label="申请日期" width="220" align="center" sortable></el-table-column>
              <el-table-column prop="contactInformation" label="联系方式" width="300" align="center"></el-table-column>
              <el-table-column prop="reason" label="理由" width="455" align="center"></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-popover
                placement="top"
                width="160"
                v-model="visibleApprove"
                style="margin-right: 20px"
              >
                <p>你确定允许此用户加入社团吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleApprove = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleApproval">确定</el-button>
                </div>
                <el-button slot="reference">通过</el-button>
              </el-popover>
              <el-popover placement="top" width="160" v-model="visibleRefuse">
                <p>你确定拒绝此用户加入社团吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleRefuse = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleRefuse">确定</el-button>
                </div>
                <el-button slot="reference">拒绝</el-button>
              </el-popover>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户管理" name="second">
            <el-table
              ref="multipleTable"
              :data="communityUserDataSuccess"
              tooltip-effect="dark"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="username" label="用户名" width="365" align="center" sortable></el-table-column>
              <el-table-column prop="joinDate" label="加入日期" width="365" align="center" sortable></el-table-column>
              <el-table-column prop="contactInformation" label="联系方式" width="365" align="center"></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-popover placement="top" width="160" v-model="visibleDeleteUser">
                <p>你确定将此用户踢出社团吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleDeleteUser = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteUser">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公告管理" name="third">
            <el-table
              ref="multipleTable"
              :data="communityNoticeData"
              tooltip-effect="dark"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column
                prop="AnnouncementDatetime"
                label="发布日期"
                width="300px"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="communityAnnouncement"
                label="公告内容"
                width="795px"
                align="center"
              ></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-popover placement="top" width="160" v-model="visibleDeleteNotice">
                <p>你确定要删除这条公告吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleDeleteNotice = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteNotice">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生活照管理" name="fourth">
            <el-table
              ref="multipleTable"
              :data="communityPhotoData"
              tooltip-effect="dark"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="photoTitle" label="图片名" width="250px" align="center" sortable></el-table-column>
              <el-table-column prop="uploadDate" label="上传日期" width="300px" align="center" sortable></el-table-column>
              <el-table-column prop="photoURL" label="图片" width="545px" align="center">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.photoURL"
                    :preview-src-list="[scope.row.photoURL]"
                  ></el-image>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-popover placement="top" width="160" v-model="visibleDeletePhoto">
                <p>你确定要删除图片吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleDeletePhoto = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deletePhoto">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资料管理" name="fifth">
            <el-table
              ref="multipleTable"
              :data="communityResourceData"
              tooltip-effect="dark"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="username" label="上传用户" width="300px" align="center" sortable></el-table-column>
              <el-table-column prop="uploadDate" label="上传日期" width="300px" align="center" sortable></el-table-column>
              <el-table-column
                prop="resourceName"
                label="资源名"
                width="495px"
                align="center"
                sortable
              ></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-popover placement="top" width="160" v-model="visibleDeleteResource">
                <p>你确定要删除图片吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleDeleteResource = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteResource">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle.vue'
  import { reqGetCommunityUserInfo } from '@/api'
  import { reqApproveUser } from '@/api'
  import { reqRefuseUser } from '@/api'
  import { reqGetCommunityUserInfoSuccess } from '@/api'
  import { reqDeleteUser } from '@/api'
  import { reqGetCommunityNoticeById } from '@/api'
  import { reqDeleteCommunityNotice } from '@/api'
  import { reqGetCommunityPhotoById } from '@/api'
  import { reqDeleteCommunityPhotos } from '@/api'
  import { reqGetCommunityResourceById } from '@/api'
  import { reqDeleteCommunityResource } from '@/api'
  import { mapGetters } from 'vuex'
  // 格式化时间
  import moment from 'moment'
  export default {
    components: {
      ContentTitle
    },
    data () {
      return {
        activeName: 'first',
        communityUserData: [],
        multipleSelection: [],
        communityUserDataSuccess: [],
        communityNoticeData: [],
        communityPhotoData: [],
        communityResourceData: [],
        visibleApprove: false,
        visibleRefuse: false,
        visibleDeleteUser: false,
        visibleDeleteNotice: false,
        visibleDeletePhoto: false,
        visibleDeleteResource: false,
      }
    },
    methods: {
      handleClick (tab, event) {
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      async handleApproval () {
        const communityID = this.getCommunityInfo[0].communityID
        const usernames = this.multipleSelection.map(user => user.username)
        try {
          await reqApproveUser(communityID, usernames) // 发送通过请求
          // 更新页面上的内容
          await this.updateCommunityUserData() // 调用获取数据的方法更新页面内容
          this.visibleApprove = false
          this.$message.success('通过用户申请！')
        } catch (error) {
          console.error('更新用户状态失败:', error)
        }
      },
      async handleRefuse () {
        const usernames = this.multipleSelection.map(user => user.username)
        try {
          await reqRefuseUser(usernames) // 发送拒绝请求
          // 更新页面上的内容
          await this.updateCommunityUserData() // 调用获取数据的方法更新页面内容
          this.visibleRefuse = false
          this.$message.error('拒绝用户申请！')
        } catch (error) {
          console.error('更新用户状态失败:', error)
        }
      },
      async updateCommunityUserData () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const response = await reqGetCommunityUserInfo(communityID) // 重新获取数据
          this.communityUserData = response.communityUserInfo.map(user => ({
            ...user,
            joinDate: moment(user.joinDate).format('YYYY-MM-DD HH:mm:ss')
          }))
        } catch (error) {
          console.error('获取社团用户信息失败:', error)
        }
      },
      async deleteUser () {
        const usernames = this.multipleSelection.map(user => user.username)
        try {
          await reqDeleteUser(usernames) // 发送删除请求以从数据库中删除用户
          await this.updateCommunityUserDataSuccess()
          this.visibleDeleteUser = false
          this.$message.success('用户删除成功！')
        } catch (error) {
          console.error('删除用户失败:', error)
        }
      },
      async updateCommunityUserDataSuccess () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const response = await reqGetCommunityUserInfoSuccess(communityID) // 重新获取数据
          this.communityUserDataSuccess = response.communityUserInfoSuccess.map(user => ({
            ...user,
            joinDate: moment(user.joinDate).format('YYYY-MM-DD HH:mm:ss')
          }))
        } catch (error) {
          console.error('更新社团用户信息失败:', error)
        }
      },
      async deleteNotice () {
        try {
          const communityAnnouncements = this.multipleSelection.map(notice => notice.communityAnnouncement)
          // 调用删除公告的接口函数
          await reqDeleteCommunityNotice(communityAnnouncements)
          await this.updateCommunityNotice()
          // 删除成功后更新公告列表
          this.visibleDeleteNotice = false
          this.$message.success('社团公告删除成功！')
        } catch (error) {
          console.error('删除公告失败:', error)
        }
      },
      async updateCommunityNotice () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const response = await reqGetCommunityNoticeById(communityID) // 重新获取数据
          this.communityNoticeData = response.communityNoticeData.map(communityNotice => ({
            ...communityNotice,
            AnnouncementDatetime: moment(communityNotice.AnnouncementDatetime).format('YYYY-MM-DD HH:mm:ss')
          }))
        } catch (error) {
          console.error('更新社团用户信息失败:', error)
        }
      },
      async deletePhoto () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const photoTitles = this.multipleSelection.map(communityPhoto => communityPhoto.photoTitle)
          const response = await reqDeleteCommunityPhotos(communityID, photoTitles)
          await this.updateCommunityPhoto()
          this.visibleDeletePhoto = false
          this.$message.success('社团生活照删除成功！')
        } catch (error) {
          console.error('删除图片失败:', error)
          // 处理删除失败的情况
        }
      },
      async updateCommunityPhoto () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const response = await reqGetCommunityPhotoById(communityID) // 重新获取数据
          this.communityPhotoData = response.communityPhotoData.map(communityPhoto => ({
            ...communityPhoto,
            uploadDate: moment(communityPhoto.uploadDate).format('YYYY-MM-DD HH:mm:ss')
          }))
        } catch (error) {
          console.error('更新社团照片数据失败:', error)
        }
      },
      async deleteResource () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const resourceNames = this.multipleSelection.map(communityResource => communityResource.resourceName)
          const response = await reqDeleteCommunityResource(communityID, resourceNames)
          this.visibleDeleteResource = false
          await this.updateCommunityResource()
          this.$message.success('社团资料删除成功！')
        } catch (error) {
          console.error('删除资料失败:', error)
          // 处理删除失败的情况
        }
      },
      async updateCommunityResource () {
        try {
          const communityID = this.getCommunityInfo[0].communityID
          const response = await reqGetCommunityResourceById(communityID) // 重新获取数据
          this.communityResourceData = response.communityResourceData.map(communityResource => ({
            ...communityResource,
            uploadDate: moment(communityResource.uploadDate).format('YYYY-MM-DD HH:mm:ss')
          }))
        } catch (error) {
          console.error('更新社团资料失败:', error)
        }
      },
    },
    async created () {
      // 调用 Vuex action 来触发获取社团信息的过程
      await this.$store.dispatch('fetchCommunityInfo')
      const communityID = this.getCommunityInfo[0].communityID
      reqGetCommunityUserInfo(communityID)
        .then(response => {
          // 使用 moment 格式化日期
          this.communityUserData = response.communityUserInfo.map(user => {
            return {
              ...user,
              // 格式化日期为 YYYY-MM-DD HH:mm:ss
              joinDate: moment(user.joinDate).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(error => {
          console.error('获取社团用户信息失败:', error)
        })
      reqGetCommunityUserInfoSuccess(communityID)
        .then(response => {
          // 使用 moment 格式化日期
          this.communityUserDataSuccess = response.communityUserInfoSuccess.map(user => {
            return {
              ...user,
              // 格式化日期为 YYYY-MM-DD HH:mm:ss
              joinDate: moment(user.joinDate).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(error => {
          console.error('获取社团用户信息失败:', error)
        })
      reqGetCommunityNoticeById(communityID)
        .then(response => {
          // 使用 moment 格式化日期
          this.communityNoticeData = response.communityNoticeData.map(communityNotice => {
            return {
              ...communityNotice,
              // 格式化日期为 YYYY-MM-DD HH:mm:ss
              AnnouncementDatetime: moment(communityNotice.AnnouncementDatetime).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(error => {
          console.error('获取社团用户信息失败:', error)
        })
      reqGetCommunityPhotoById(communityID)
        .then(response => {
          // 使用 moment 格式化日期
          this.communityPhotoData = response.communityPhotoData.map(communityPhoto => {
            return {
              ...communityPhoto,
              // 格式化日期为 YYYY-MM-DD HH:mm:ss
              uploadDate: moment(communityPhoto.uploadDate).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(error => {
          console.error('获取社团生活照失败:', error)
        })
      reqGetCommunityResourceById(communityID)
        .then(response => {
          // 使用 moment 格式化日期
          this.communityResourceData = response.communityResourceData.map(communityResource => {
            return {
              ...communityResource,
              // 格式化日期为 YYYY-MM-DD HH:mm:ss
              uploadDate: moment(communityResource.uploadDate).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(error => {
          console.error('获取社团生活照失败:', error)
        })
    },
    computed: {
      ...mapGetters(['getCommunityInfo']),// 将 Vuex 中的 communityInfo 映射为组件的计算属性
    },
  }
</script>

<style lang="less" scoped>
  .wrap {
    display: flex;
    flex-direction: column;
    .managingContent {
      margin-left: 245px;
      margin-bottom: 80px;
      .content {
        border: 1px solid #ffc107;
        width: 85%;
      }
    }
  }
</style>