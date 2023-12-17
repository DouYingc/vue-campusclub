const express = require('express')
const router = express.Router()
const db = require('../db/index')

// 将用户信息数据发送到数据库
router.post('/registerUser', (req, res) => {
  const { username, password } = req.body
  // 在这里执行数据库插入操作，将用户数据插入到数据库中
  const sql = "INSERT INTO user (username, password) VALUES (?, ?)"
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("注册失败:", err)
      res.status(500).send({ status: 1, message: '注册失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '注册成功！', code: 200 })
      console.log(username, password)
    }
  })
})

// 创建登录接口
router.post('/userLogin', (req, res) => {
  const { username, password } = req.body
  // 在数据库中查询用户信息，以验证登录
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?"
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("登录失败:", err)
      res.status(500).send({ status: 1, message: '登录失败！', code: 500 })
    } else if (results.length === 1) {
      const user = results[0]
      res.status(200).send({ status: 0, message: '登录成功！', code: 200, isAdmin: user.isAdmin })
    } else {
      res.status(401).send({ status: 2, message: '用户名或密码不正确', code: 401 })
    }
  })
})

// 创建注册社团接口
router.post('/registerCommunity', (req, res) => {
  const {
    username,
    communityName,
    communityResponsiblePerson,
    communityResponsiblePersonContactInformation,
    communityIntroduction,
    communityAnticipatMembers,
    communityCreateDate
  } = req.body

  const sql = "INSERT INTO community (communityID, username, communityName, communityResponsiblePerson, communityResponsiblePersonContactInformation, communityIntroduction, communityAnticipatMembers, communityCreateDate) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)"

  db.query(
    sql,
    [
      username,
      communityName,
      communityResponsiblePerson,
      communityResponsiblePersonContactInformation,
      communityIntroduction,
      communityAnticipatMembers,
      communityCreateDate
    ],
    (err, result) => {
      if (err) {
        console.error("社团注册失败:", err)
        res.status(500).send({ status: 1, message: '社团注册失败！', code: 500 })
      } else {
        res.status(200).send({ status: 0, message: '社团注册成功！', code: 200 })
      }
    }
  )
})

// 创建获取社团信息接口
router.get('/getCommunityInfo', (req, res) => {
  const { username } = req.query// 获取请求中的用户名参数

  // 查询特定用户名的社团信息
  const sql = "SELECT * FROM community WHERE username = ?" // 用户名字段为 username
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("获取社团信息失败:", err)
      res.status(500).send({ status: 1, message: '获取社团信息失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到用户的社团信息！', code: 404 })
      } else {
        // 发送检索到的社团信息到页面上
        res.status(200).send({ status: 0, message: '获取社团信息成功！', code: 200, communityInfo: results })
      }
    }
  })
})

// 创建获取所有社团信息接口
router.get('/getAllCommunityInfo', (req, res) => {
  // const { username } = req.query

  const sql = "SELECT * FROM community"
  db.query(sql, (err, results) => {
    if (err) {
      console.error("获取社团信息失败:", err)
      res.status(500).send({ status: 1, message: '获取社团信息失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到用户的社团信息！', code: 404 })
      } else {
        // 发送检索到的社团信息到页面上
        res.status(200).send({ status: 0, message: '获取社团信息成功！', code: 200, communityInfo: results })
      }
    }
  })
})

// 创建注册社团接口
router.post('/updateCommunityInfo', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  const {
    communityPoster,
    communityCurrentMembers,
    communityCreateDate,
    communityIntroduction,
    communityAchievement,
    username,
  } = req.body

  const sql = `
  UPDATE community SET communityPoster = ?, communityCurrentMembers = ?, communityCreateDate = ?, communityIntroduction = ?, communityAchievement = ? WHERE username = ?
`

  db.query(
    sql,
    [
      communityPoster,
      communityCurrentMembers,
      communityCreateDate,
      communityIntroduction,
      communityAchievement,
      username,
    ],
    (err, result) => {
      if (err) {
        console.error("社团注册失败:", err)
        res.status(500).send({ status: 1, message: '社团注册失败！', code: 500 })
      } else {
        res.status(200).send({ status: 0, message: '社团注册成功！', code: 200 })
      }
    }
  )
})

// 创建发布社团公告接口
router.post('/postCommunityNotice', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  const {
    communityID,
    communityAnnouncement,
    AnnouncementDatetime,
  } = req.body
  const sql = `INSERT INTO communitynotice (communityID, communityAnnouncement, AnnouncementDatetime) VALUES (?, ?, ?)`

  db.query(
    sql,
    [
      communityID,
      communityAnnouncement,
      AnnouncementDatetime,
    ],
    (err, result) => {
      if (err) {
        console.error("社团注册失败:", err)
        res.status(500).send({ status: 1, message: '社团注册失败！', code: 500 })
      } else {
        res.status(200).send({ status: 0, message: '社团注册成功！', code: 200 })
      }
    }
  )
})

// 获取社团公告
router.get('/getCommunityNotice', (req, res) => {
  // const { communityID } = req.query

  const sql = "SELECT * FROM communitynotice"
  db.query(sql, (err, results) => {
    if (err) {
      console.error("获取社团公告失败:", err)
      res.status(500).send({ status: 1, message: '获取社团公告失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团公告！', code: 404 })
      } else {
        // 发送检索到的社团公告信息
        res.status(200).send({ status: 0, message: '成功获取社团公告！', code: 200, communityNotice: results })
      }
    }
  })
})

// 通过社团ID获取社团名
router.get('/getCommunityName', (req, res) => {
  const { communityID } = req.query

  // 根据社团ID查询社团名
  const sql = "SELECT communityName FROM community WHERE communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团名失败:", err)
      res.status(500).send({ status: 1, message: '获取社团名失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到提供的ID的社团名！', code: 404 })
      } else {
        const communityName = results[0].communityName
        // 发送检索到的社团名
        res.status(200).send({ status: 0, message: '成功获取社团名！', code: 200, communityName: communityName })
      }
    }
  })
})

// 上传资料
const moment = require('moment')
const iconv = require('iconv-lite')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, iconv.decode(file.originalname, 'utf-8')) // 文件名设置为原始文件名
  }
})

const upload = multer({ storage: storage })

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  if (!req.file) {
    return res.status(400).send({ status: 1, message: '未选择文件', code: 400 })
  }
  const { username } = req.body // 从请求体中获取用户名
  const { communityID } = req.body
  // 获取当前时间作为上传时间
  const uploadTime = moment().format('YYYY-MM-DD HH:mm:ss') // 使用 Moment.js 格式化当前时间
  const filePath = req.file.path // 获取文件路径
  // 可以在这里将文件信息保存到数据库
  const file = req.file
  // 将文件信息以及用户信息保存到数据库中
  const sql = "INSERT INTO communityresources (resourceName, uploadDate, username, resourcePath, communityID) VALUES (?, ?, ?, ?, ?)"
  db.query(sql, [iconv.decode(file.originalname, 'utf-8'), uploadTime, username, filePath, communityID], (err, result) => {
    if (err) {
      console.error("文件上传失败:", err)
      res.status(500).send({ status: 1, message: '文件上传失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '文件上传成功', code: 200, filePath: file.path })
    }
  })
})

// 获取资料信息
router.get('/getFileList', (req, res) => {
  // 查询数据库获取文件列表信息
  const sql = "SELECT * FROM communityresources"
  db.query(sql, (err, results) => {
    if (err) {
      console.error("获取文件列表失败:", err)
      res.status(500).send({ status: 1, message: '获取文件列表失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '获取文件列表成功！', code: 200, fileList: results })
    }
  })
})

// 下载
const path = require('path')
// 处理文件下载请求
router.get('/downloadFile/:filename', (req, res) => {
  // const filename = req.params.filename
  // const filePath = path.join(__dirname, '../uploads', filename) // 文件在服务器上的路径
  // res.download(filePath, (err) => {
  //   if (err) {
  //     console.error('文件下载失败:', err)
  //     res.status(500).send({ status: 1, message: '文件下载失败！', code: 500 })
  //   }
  // })
  const filename = req.params.filename
  const filePath = path.join(__dirname, '../uploads', filename) // 文件在服务器上的路径
  const file = fs.createReadStream(filePath)
  const stat = fs.statSync(filePath)

  res.setHeader('Content-Length', stat.size)
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

  file.pipe(res)
})

// 上传社团生活照
const communityPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'communityPhotos/') // 社团生活照的上传目标文件夹
  },
  filename: function (req, file, cb) {
    cb(null, iconv.decode(file.originalname, 'utf-8')) // 文件名设置为原始文件名
  }
})
const uploadCommunityPhoto = multer({ storage: communityPhotoStorage }) // 用于社团生活照上传的 Multer 实例
router.post('/uploadCommunityPhoto', uploadCommunityPhoto.single('communityPhoto'), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  if (!req.file) {
    return res.status(400).send({ status: 1, message: '未选择文件', code: 400 })
  }

  const { communityID, photoTitle } = req.body // 从请求体中获取社团 ID 和照片标题
  const uploadTime = moment().format('YYYY-MM-DD HH:mm:ss') // 使用 Moment.js 格式化当前时间
  const filePath = req.file.path // 获取文件路径
  const photoURL = `http://10.6.89.156:3000/${filePath}`

  // 在这里将社团生活照的文件信息保存到数据库
  const sql = "INSERT INTO communityphotos (communityID, photoTitle, photoURL, uploadDate) VALUES (?, ?, ?, ?)"
  db.query(sql, [communityID, photoTitle, photoURL, uploadTime], (err, result) => {
    if (err) {
      console.error("文件上传失败:", err)
      res.status(500).send({ status: 1, message: '文件上传失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '文件上传成功', code: 200, filePath: req.file.path })
    }
  })
})

// 获取社团照片
router.get('/getCommunityPhotoURL', (req, res) => {
  const { communityID } = req.query
  // 使用 communityID 查询数据库，获取对应的 photoURL
  const sql = "SELECT photoURL FROM communityphotos WHERE communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取照片URL失败:", err)
      res.status(500).send({ status: 1, message: '获取照片URL失败！', code: 500 })
    } else {
      const photoURLs = results.map(result => result.photoURL)
      res.status(200).send({ status: 0, photoURLs })
    }
  })
})

// 通过社团ID获取信息
router.get('/getCommunityInfoById', (req, res) => {
  const { communityID } = req.query

  // 根据社团ID社团信息
  const sql = "SELECT * FROM community WHERE communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团名失败:", err)
      res.status(500).send({ status: 1, message: '获取社团信息失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到提供的ID的社团信息！', code: 404 })
      } else {
        // 发送检索到的社团信息
        res.status(200).send({ status: 0, message: '成功获取社团信息！', code: 200, communityInfo: results })
      }
    }
  })
})

// 创建加入社团接口
router.post('/joinCommunity', (req, res) => {
  const {
    username,
    communityID,
    joinDate,
    status,
    contactInformation,
    reason
  } = req.body

  const sql = "INSERT INTO communityuser (username, communityID, joinDate, status, contactInformation, reason) VALUES (?, ?, ?, ?, ?, ?)"

  db.query(
    sql,
    [
      username,
      communityID,
      joinDate,
      status,
      contactInformation,
      reason
    ],
    (err, result) => {
      if (err) {
        console.error("加入社团失败:", err)
        res.status(500).send({ status: 1, message: '加入社团失败！', code: 500 })
      } else {
        res.status(200).send({ status: 0, message: '加入社团成功！', code: 200 })
      }
    }
  )
})

// 创建通过communityID获取communityuser表信息的接口
router.get('/getCommunityUserInfo', (req, res) => {
  const { communityID } = req.query

  // 查询特定社团ID的用户信息
  const sql = "SELECT username, joinDate, contactInformation, reason FROM communityuser WHERE communityID = ? AND status = 0"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团用户信息失败:", err)
      res.status(500).send({ status: 1, message: '获取社团用户信息失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团用户信息！', code: 404 })
      } else {
        // 发送检索到的社团用户信息到页面上
        res.status(200).send({ status: 0, message: '获取社团用户信息成功！', code: 200, communityUserInfo: results })
      }
    }
  })
})

// 审核用户
// 同意
router.post('/approveUser', (req, res) => {
  const usernames = req.body.usernames // 获取前端传来的用户名列表
  const communityID = req.body.communityID // 假设这里是获取 communityID 的方式
  const usersCount = usernames.length // 获取用户名列表的长度，即用户数量
  const sqlUpdateUsers = "UPDATE communityuser SET status = 1 WHERE username IN (?)"
  db.query(sqlUpdateUsers, [usernames], (err, result) => {
    if (err) {
      console.error("更新用户状态失败:", err)
      return res.status(500).send({ status: 1, message: '更新用户状态失败！', code: 500 })
    } else {
      // 更新成功后，在 community 表中根据用户数量增加 communityCurrentMembers
      const sqlIncrementMembers = "UPDATE community SET communityCurrentMembers = communityCurrentMembers + ? WHERE communityID = ?"
      db.query(sqlIncrementMembers, [usersCount, communityID], (err, result) => {
        if (err) {
          console.error("增加社团成员数失败:", err)
          return res.status(500).send({ status: 1, message: '增加社团成员数失败！', code: 500 })
        } else {
          res.status(200).send({ status: 0, message: '更新用户状态和社团成员数成功！', code: 200 })
        }
      })
    }
  })
})
// 拒绝
router.post('/refuseUser', (req, res) => {
  const usernames = req.body // 获取前端传来的用户名列表
  // 假设 communityuser 表中的 username 是唯一标识符，可以用 IN 语句更新多个用户的状态为 1
  const sql = "UPDATE communityuser SET status = 2 WHERE username IN (?)"
  db.query(sql, [usernames], (err, result) => {
    if (err) {
      console.error("更新用户状态失败:", err)
      res.status(500).send({ status: 1, message: '更新用户状态失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '更新用户状态成功！', code: 200 })
    }
  })
})

// 获取社团用户信息
router.get('/getCommunityUserInfoSuccess', (req, res) => {
  const { communityID } = req.query

  // 查询特定社团ID的用户信息
  const sql = "SELECT username, joinDate, contactInformation, reason FROM communityuser WHERE communityID = ? AND status = 1"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团用户信息失败:", err)
      res.status(500).send({ status: 1, message: '获取社团用户信息失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团用户信息！', code: 404 })
      } else {
        // 发送检索到的社团用户信息到页面上
        res.status(200).send({ status: 0, message: '获取社团用户信息成功！', code: 200, communityUserInfoSuccess: results })
      }
    }
  })
})

// 删除社团用户
router.delete('/deleteUser', (req, res) => {
  const usernames = req.body // 从请求体中获取要删除的用户名

  // 在数据库中删除特定用户名的数据
  const sql = "DELETE FROM communityuser WHERE username IN (?)"
  db.query(sql, [usernames], (err, result) => {
    if (err) {
      console.error("删除用户数据失败:", err)
      res.status(500).send({ status: 1, message: '删除用户数据失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '删除用户数据成功！', code: 200 })
    }
  })
})

// 通过社团ID获取社团公告
router.get('/getCommunityNoticeById', (req, res) => {
  const { communityID } = req.query

  const sql = "SELECT * FROM communitynotice where communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团公告失败:", err)
      res.status(500).send({ status: 1, message: '获取社团公告失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团公告！', code: 404 })
      } else {
        // 发送检索到的社团公告信息
        res.status(200).send({ status: 0, message: '成功获取社团公告！', code: 200, communityNoticeData: results })
      }
    }
  })
})

// 删除社团公告
router.delete('/deleteCommunityNotice', (req, res) => {
  const communityAnnouncements = req.body
  // 在数据库中根据特定的社团公告信息执行删除操作
  const sql = "DELETE FROM communitynotice WHERE communityAnnouncement IN (?)"
  db.query(sql, [communityAnnouncements], (err, result) => {
    if (err) {
      console.error("删除社团公告失败:", err)
      res.status(500).send({ status: 1, message: '删除社团公告失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '删除社团公告成功！', code: 200 })
    }
  })
})

// 通过社团ID获取社团生活照
router.get('/getCommunityPhotoById', (req, res) => {
  const { communityID } = req.query

  const sql = "SELECT * FROM communityphotos where communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团生活照失败:", err)
      res.status(500).send({ status: 1, message: '获取社团生活照失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团生活照！', code: 404 })
      } else {
        // 发送检索到的社团公告信息
        res.status(200).send({ status: 0, message: '成功获取社团生活照！', code: 200, communityPhotoData: results })
      }
    }
  })
})

// 删除社团生活照
const fs = require('fs')
router.delete('/deleteCommunityPhotos', (req, res) => {
  const photoTitles = req.body.photoTitles
  const communityID = req.body.communityID
  // 删除数据库中的相应数据
  const sql = "DELETE FROM communityphotos WHERE communityID = ? AND photoTitle IN (?)"
  db.query(sql, [communityID, photoTitles], (err, result) => {
    if (err) {
      console.error("图片删除失败:", err)
      return res.status(500).send({ status: 1, message: '图片删除失败！', code: 500 })
    }
    // 删除文件
    photoTitles.forEach(photoTitle => {
      const filePath = path.join(__dirname, '..', 'communityPhotos', `${photoTitle}`)
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ status: 1, message: '图片删除失败！', code: 500 })
        }
      })
    })
    res.status(200).send({ status: 0, message: '图片删除成功！', code: 200 })
  })
})

// 通过社团ID获取社团资料
router.get('/getCommunityResourceById', (req, res) => {
  const { communityID } = req.query

  const sql = "SELECT * FROM communityresources where communityID = ?"
  db.query(sql, [communityID], (err, results) => {
    if (err) {
      console.error("获取社团资料失败:", err)
      res.status(500).send({ status: 1, message: '获取社团资料失败！', code: 500 })
    } else {
      if (results.length === 0) {
        res.status(404).send({ status: 1, message: '未找到社团资料！', code: 404 })
      } else {
        res.status(200).send({ status: 0, message: '成功获取社团资料！', code: 200, communityResourceData: results })
      }
    }
  })
})

// 删除社团资料
router.delete('/deleteCommunityResources', (req, res) => {
  const resourceNames = req.body.resourceNames
  const communityID = req.body.communityID
  // 删除数据库中的相应数据
  const sql = "DELETE FROM communityresources WHERE communityID = ? AND resourceName IN (?)"
  db.query(sql, [communityID, resourceNames], (err, result) => {
    if (err) {
      console.error("资料删除失败:", err)
      return res.status(500).send({ status: 1, message: '资料删除失败！', code: 500 })
    }
    // 删除文件
    resourceNames.forEach(resourceName => {
      const filePath = path.join(__dirname, '..', 'uploads', `${resourceName}`)
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ status: 1, message: '资料删除失败！', code: 500 })
        }
      })
    })
    res.status(200).send({ status: 0, message: '资料删除成功！', code: 200 })
  })
})

// 更新用户密码
router.post('/updateUserPassword', (req, res) => {
  const { username, newPassword } = req.body
  // 验证用户名和新密码是否存在
  if (!username || !newPassword) {
    return res.status(400).send({ status: 1, message: '需要用户名和新密码！', code: 400 })
  }
  // 更新数据库中用户的密码
  const sql = "UPDATE user SET password = ? WHERE username = ?"
  db.query(sql, [newPassword, username], (err, result) => {
    if (err) {
      console.error("密码更新失败:", err)
      return res.status(500).send({ status: 1, message: '密码更新失败！', code: 500 })
    } else {
      res.status(200).send({ status: 0, message: '密码更新成功！', code: 200 })
    }
  })
})

module.exports = router