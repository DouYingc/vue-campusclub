import axios from 'axios'
// 对axios进行二次封装
const requests = axios.create({

  // 发请求时都带上 /api
  // baseURL:'/api',
  // 5秒之内无反应则自动请求失败
  timeout: 5000,
  headers: {
    // 为了不进行预处理请求需要用这种格式的数据
    "Content-Type": "application/json"
  }
})



// 请求拦截器:在发送请求之前可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面有一个属性很主要 headers 请求头
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数:服务器相应数据回来后，响应拦截器可以检测到，可以做的事情
  return res.data
}, (error) => {
  // 失败的调函数
  return Promise.reject(new Error('faile'))
})

// 传递注册用户信息
export const reqRegisterUser = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/registerUser',
    method: 'post',
    data // 将账号和密码数据包含在请求体中
  })
}
// 登录
export const reqLoginUser = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/userLogin',
    method: 'post',
    data
  })
}

// 注册社团
export const reqRegisterCommunity = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/registerCommunity',
    method: 'post',
    data
  })
}

// 获取社团信息
export const reqGetCommunityInfo = (username) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityInfo',
    method: 'get',
    params: {
      username: username
    }
  })
}

// 获取所有社团信息
export const reqGetAllCommunityInfo = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getAllCommunityInfo',
    method: 'get',
    data
  })
}

// 更新社团信息
export const reqUpdateCommunityInfo = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/updateCommunityInfo',
    method: 'post',
    data
  })
}

// 发布公告
export const reqPostCommunityNotice = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/postCommunityNotice',
    method: 'post',
    data
  })
}

// 获取公告
export const reqGetCommunityNotice = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityNotice',
    method: 'get',
  })
}

// 获取社团名
export const reqGetCommunityName = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityName',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 上传资料
export const reqUploadFile = (file, username) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('username', username) // 将用户名放入 FormData 中
  return requests({
    url: 'http://10.6.89.156:3000/api/uploadFile',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 获取资料信息
export const fetchFileList = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getFileList',
    method: 'get',
    data
  })
}


// 下载文件
export const downloadFile = (filename) => {
  return axios({
    url: `http://10.6.89.156:3000/api/downloadFile/${filename}`,
    method: 'GET',
    responseType: 'blob', // 设置响应类型为二进制数据流
  })
    .then((response) => {
      // 创建一个临时 URL，并使用 <a> 标签触发下载
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) // 设置下载文件的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error) => {
      console.error('文件下载失败:', error)
      // 处理文件下载失败的情况
    })
}

// 上传社团生活照
export const reqUploadCommunityPhoto = (file, communityID, photoTitle) => {
  const formData = new FormData()
  formData.append('communityPhoto', file)
  formData.append('communityID', communityID) // 将社团 ID 放入 FormData 中
  formData.append('photoTitle', photoTitle) // 将照片标题放入 FormData 中

  return axios.post('http://10.6.89.156:3000/api/uploadCommunityPhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 获取社团生活照URL
export const reqGetCommunityPhotoURL = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityPhotoURL',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 通过ID获取社团信息
export const reqGetCommunityInfoById = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityInfoById',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 加入社团
export const reqJoinCommunity = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/joinCommunity',
    method: 'post',
    data
  })
}

// 获取社团用户信息（未审核）
export const reqGetCommunityUserInfo = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityUserInfo',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 审核用户
export const reqApproveUser = (communityID, usernames) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/approveUser',
    method: 'post',
    data: {
      communityID: communityID,
      usernames: usernames
    }
  })
}

export const reqRefuseUser = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/refuseUser',
    method: 'post',
    data
  })
}

// 获取社团用户信息（已通过）
export const reqGetCommunityUserInfoSuccess = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityUserInfoSuccess',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 删除用户数据
export const reqDeleteUser = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/deleteUser',
    method: 'delete',
    data
  })
}

// 通过社团ID获取社团公告
export const reqGetCommunityNoticeById = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityNoticeById',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 删除社团公告
export const reqDeleteCommunityNotice = (data) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/deleteCommunityNotice',
    method: 'delete',
    data
  })
}

// 通过社团ID获取社团生活照
export const reqGetCommunityPhotoById = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityPhotoById',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 删除社团生活照
export const reqDeleteCommunityPhotos = (communityID, photoTitles) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/deleteCommunityPhotos',
    method: 'delete',
    data: {
      communityID: communityID,
      photoTitles: photoTitles
    }
  })
}

// 通过社团ID获取社团资料
export const reqGetCommunityResourceById = (communityID) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/getCommunityResourceById',
    method: 'get',
    params: {
      communityID: communityID
    }
  })
}

// 删除社团资料
export const reqDeleteCommunityResource = (communityID, resourceNames) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/deleteCommunityResources',
    method: 'delete',
    data: {
      communityID: communityID,
      resourceNames: resourceNames
    }
  })
}

// 更新用户密码
export const reqUpdateUserPassword = (username, newPassword) => {
  return requests({
    url: 'http://10.6.89.156:3000/api/updateUserPassword',
    method: 'post',
    data: {
      username: username,
      newPassword: newPassword
    }
  })
}
