import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import router from '@/router'

import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
// import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction() {
      // 1. 账号登陆,获取token等信息
      // const loginResult = await accountLoginRequest(account)
      // console.log('loginResult', loginResult)
      // const id = 1
      this.token = 'hhhhh'
      // token进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      // const userInfoResult = await getUserInfoById(id)
      // const userInfo = userInfoResult.data
      this.userInfo = {}
      this.userMenus = [
        {
          id: 1,
          url: '/main/cmdb',
          icon: 'DataBoard',
          title: '任务中心',
          sort: 1,
          children: [
            {
              id: 12,
              url: '/main/cmdb/task',
              icon: '',
              title: '任务列表',
              sort: 2001
            }
          ]
        }
      ]
      // console.log(this.userInfo.role)

      // 3.根据角色请求用户的权限(菜单menus)
      // const userMenusResult = await getUserMenusByRoleId(id)
      // const userMenus = userMenusResult.data
      // this.userMenus = userMenus
      // 将角色信息和菜单进行缓存
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(USER_MENUS, this.userMenus)

      // 4.请求所有roles/departments数据
      // const mainStore = useMainStore()
      // mainStore.fetchEntireDataAction()

      // 4重要: 动态的添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 4. 跳转页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // // 1..请求所有roles/departments数据
        // const mainStore = useMainStore()
        // mainStore.fetchEntireDataAction()

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
