import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { createRouter, createWebHashHistory } from 'vue-router'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/404/Notfound.vue')
    }
  ]
})
// 路由导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})
export default router
