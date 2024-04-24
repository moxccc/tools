import axios from 'axios'
import NProgress from 'nprogress' //顶部加载条
import 'nprogress/nprogress.css'  //加载条css样式
import { clearToken,getToken } from '@/utils/auth'
import { Notification } from '@arco-design/web-vue';
import router from '@/routes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
export const baseURL =import.meta.env.VITE_API_BASE_URL // 测试版nginx
// 创建axios实例
const request = axios.create({
    baseURL: baseURL,// 测试版
    // timeout: 80000, // 请求超时时间(毫秒)
    // withCredentials: true,// 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        // 'token': x-auth-token',//一开始就要token
        // 'X-Requested-With': 'XMLHttpRequest',
    },
})
// request拦截器
request.interceptors.request.use(
    config => {
        NProgress.start() // 进度条
        // 如果你要去localStor获取token
        let token = getToken();
        if (token) {
            //添加请求头
            config.headers["Authorization"] = "Bearer " + token
            // config.headers["Referer"]="shgxshop.com"
            // config.headers["User-Agent"]="Ariba-Covestro"
        }
        if (config.responseType) {
            config.responseType = config.responseType;
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)
// response 拦截器
request.interceptors.response.use(
    response => {
        NProgress.done();
        return Promise.resolve(response)
        // 对响应数据做点什么
    },
    error => {
        NProgress.done();
        if (error.response && error.response.status === 401) {
            // 如果响应状态码为401，显示一个消息并重定向到登录页面
            // 显示消息（假设你有一个显示消息的函数或方法）
            Notification.warning({
                title: "提示",
                content: error.response.data.message,
                duration:5000
            })
            clearToken();
            router.replace('/login')
        }
        return Promise.reject(error);
    }
)
export default request