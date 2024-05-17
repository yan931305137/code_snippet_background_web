import {createApp} from 'vue'
import App from './App.vue'

//导入路由
import router from './router/index'

//全局导入Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);


import api from '../src/api/index'
app.config.globalProperties.$api=api;
app.use(api)
app.use(router);
app.use(ElementPlus);
app.mount('#app')
