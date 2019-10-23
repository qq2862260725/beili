import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Home from '@/components/Home/Home'
import Detail from '@/components/Detail/Detail'
import User from '@/components/User/User'
import Card from '@/components/Card/Card'
import CarType from '@/components/CarType/CarType'
import TypeDetail from '@/components/TypeDetail/TypeDetail'
import UpFile from '@/components/UpFile/UpFile'
import Modify from '@/components/Modify/Modify'
import ModifyCard from '@/components/ModifyCard/ModifyCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '车主查询'
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册账号'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '车证列表'
      }
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      meta: {
        title: '车证详情'
      }
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta: {
        title: '车主信息'
      }
    },
    {
      path: '/Card',
      name: 'Card',
      component: Card,
      meta: {
        title: '我的证件'
      },
    },
    {
      path: '/CarType',
      name: 'CarType',
      component: CarType,
      meta: {
        title: '车证类型'
      }
    },
    {
      path: '/TypeDetail',
      name: 'TypeDetail',
      component: TypeDetail,
      meta: {
        title: '车证类型'
      }
    },
    {
      path: '/UpFile',
      name: 'UpFile',
      component: UpFile,
      meta: {
        title: '资料上传'
      }
    },
    {
      path: '/Modify',
      name: 'Modify',
      component: Modify,
      meta: {
        title: '车证详情'
      }
    },
    {
      path: '/ModifyCard',
      name: 'ModifyCard',
      component: ModifyCard,
      meta: {
        title: '修改车牌号信息'
      }
    },
  ]
})
