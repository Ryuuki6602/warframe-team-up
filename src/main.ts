import { createApp } from 'vue'
import './style.css'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

import router from './routes/index'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(
  createPersistedState({
    storage: sessionStorage
  })
)

import moment from 'moment'
moment.locale('zh-cn')

import ElementPlus from 'element-plus'

// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'element-plus/dist/index.css'

import 'uno.css'

import 'nprogress/nprogress.css'

import 'animate.css'

// SvgIcon
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(moment)
app.use(MotionPlugin)
app.mount('#app')
