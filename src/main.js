import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router from "./router/index.js";
// 引入状态管理器
import { createPinia } from "pinia";
const pinia=createPinia()

const app=createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
