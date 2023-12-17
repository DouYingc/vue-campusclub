<template>
  <div class="footer">
    <div class="dailySayingTitle">
      <span class="dailySaying">每日一言</span>
    </div>
    <div class="dailySayingContainer">
      <p>{{dailySaying}}</p>
      <span class="dailySayingAuthor">
        {{dailySayingAuthor}}
        <span class="dailySayingSource">「{{dailySayingSource}}」</span>
      </span>
    </div>
    <div class="friendLinks">
      <router-link to="https://v2.cn.vuejs.org/" style="color: #51cbce;">友情链接&加入我们</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // 一天只获取一次接口，将其保存在本地存储中并显示
  export default {
    data () {
      return {
        dailySaying: '',
        dailySayingAuthor: '',
        dailySayingSource: '',
      }
    },
    mounted () {
      // 存储每日一言的数据
      const storedData = localStorage.getItem('dailySayingData')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        // 检查数据是否在同一天内
        if (this.isSameDay(new Date(parsedData.timestamp), new Date())) {
          this.dailySaying = parsedData.hitokoto
          this.dailySayingAuthor = parsedData.creator
          this.dailySayingSource = parsedData.from
          return
        }
      }
      // 如果没有本地数据或数据已过期，则重新获取数据
      this.fetchDailySaying()
    },
    methods: {
      fetchDailySaying () {
        axios.get('https://v1.hitokoto.cn/')
          .then(response => {
            this.dailySaying = response.data.hitokoto
            this.dailySayingAuthor = response.data.from_who
            this.dailySayingSource = response.data.from
            // 将数据和时间戳存储在本地存储中
            localStorage.setItem('dailySayingData', JSON.stringify({
              hitokoto: this.dailySaying,
              creator: this.dailySayingAuthor,
              from: this.dailySayingSource,
              timestamp: new Date().getTime(),
            }))
          })
          .catch(error => {
            console.error('获取数据失败：', error)
          })
      },
      //检查是否为当天
      isSameDay (date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
      },
    },
  }


  // 第二种，每次刷新会重新获取内容
  // export default {
  //   data () {
  //     return {
  //       dailySaying: '',
  //       dailySayingAuthor: '',
  //       dailySayingSource: '',
  //     }
  //   },
  //   mounted () {
  //     // 在组件挂载后，使用Axios获取数据
  //     axios.get('https://v1.hitokoto.cn/')
  //       .then(response => {
  //         this.dailySaying = response.data.hitokoto
  //         this.dailySayingAuthor = response.data.from_who
  //         this.dailySayingSource = response.data.from
  //       })
  //       .catch(error => {
  //         console.error('获取数据失败：', error)
  //       })
  //   },
  // };
</script>

<style lang="less" scoped>
  .footer {
    padding-top: 70px;
    padding-left: 200px;
    background-color: #fafafa;
    .dailySayingTitle {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      border-bottom: 3px solid #f5f5f5;
      margin-bottom: 20px;
      .dailySaying {
        border-bottom: 3px solid #51cbce;
      }
    }
    .dailySayingContainer {
      position: relative;
      margin-bottom: 20px;
      padding-bottom: 70px;
      .dailySayingAuthor {
        display: flex;
        justify-content: flex-end; /* 将作者和来源都靠右对齐 */
        align-items: center; /* 垂直居中 */
        margin-top: 20px;
        padding-right: 300px;
      }
    }
    .dailySayingContainer::after {
      content: '';
      position: absolute;
      left: calc(10% + 10px); /* 调整左边距 */
      right: calc(10% + 10px); /* 调整右边距 */
      bottom: 0;
      height: 1px;
      background-color: #e1e1e1;
      width: calc(80% - 20px); /* 调整宽度 */
    }
    .friendLinks {
      display: flex;
      justify-content: center;
      font-size: 16px;
      padding: 15px 0;
    }
  }
</style>