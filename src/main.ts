import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router/index'
import store from './store'
import icons from './global/register-icons'

// 全局引入样式
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')
