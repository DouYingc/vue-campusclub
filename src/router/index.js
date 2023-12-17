import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import axios from 'axios'
import Menu from '@/views/layout/menu/Menu.vue'
import Register from '@/views/register/Register.vue'
import CommunityPageId from '@/views/communitypageid/CommunityPageId.vue'

const MyInfo = () => import('@/views/myinfo/MyInfo.vue')
const RegisterCommunity = () => import('@/views/myinfo/registerCommunity/RegisterCommunity.vue')
const UserInfo = () => import('@/views/myinfo/userinfo/UserInfo.vue')
const ReviseInfo = () => import('@/views/myinfo/reviseinfo/ReviseInfo.vue')
const MyCommunity = () => import('@/views/myinfo/mycommunity/MyCommunity.vue')
const Notice = () => import('@/views/myinfo/notice/Notice.vue')
const FillCommunity = () => import('@/views/myinfo/fillcommunity/FillCommunity.vue')
const ManagingCommunity = () => import('@/views/myinfo/managingcommunity/ManagingCommunity.vue')
const CommunityIndex = () => import('@/views/community/CommunityIndex.vue')
const AnnouncementIndex = () => import('@/views/announcement/AnnouncementIndex.vue')
const DataIndex = () => import('@/views/data/DataIndex.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/myinfo',
        name: 'myinfo',
        component: MyInfo,
      },
      {
        path: '/myinfo/userinfo',
        name: 'userinfo',
        component: UserInfo
      },
      {
        path: '/myinfo/reviseinfo',
        name: 'reviseinfo',
        component: ReviseInfo
      },
      {
        path: '/myinfo/mycommunity',
        name: 'mycommunity',
        component: MyCommunity
      },
      {
        path: '/myinfo/notice',
        name: 'notice',
        component: Notice
      },
      {
        path: '/myinfo/fillcommunity',
        name: 'fillcommunity',
        component: FillCommunity
      },
      {
        path: '/myinfo/managingcommunity',
        name: 'managingcommunity',
        component: ManagingCommunity
      },
      {
        path: '/community',
        name: 'communityindex',
        component: CommunityIndex
      },
      {
        path: '/announcement',
        name: 'announcementindex',
        component: AnnouncementIndex
      },
      {
        path: '/data',
        name: 'DataIndex',
        component: DataIndex
      },
      {
        path: '/myinfo/registerCommunity',
        name: 'registerCommunity',
        component: RegisterCommunity
      },
      {
        path: '/community/:communityID', // 动态路由参数 ":communityID"
        name: 'CommunityPage',
        component: CommunityPageId, // 这里是 CommunityPageId 组件
        props: true, // 将路由参数作为 props 传递给组件
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE.URL,
  routes
})

export default router
