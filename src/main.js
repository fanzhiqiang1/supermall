import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//安装插件
Vue.use(toast)

//图片懒加载 -- 需要修改使用img的src 为 v-lazy
Vue.use(VueLazyload,{
  loading: require('assets/img/common/placeholder.png')

})

//解决移动端延迟300ms
Fastclick.attach(document.body)

//通过vue实例 声明一个事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
