// vite默认提供的环境变量
console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://xxxxx'
} else {
  // 开发环境
  BASE_URL = 'http://127.0.0.1:8181'
}

console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)
// 后端超时设置
export const TIME_OUT = 10000
export { BASE_URL }
