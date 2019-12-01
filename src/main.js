import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant'
import 'amfe-flexible'
import '@/styles/index.less'

// vee-validate表单验证
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'
// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}
// 验证手机号
extend('phone', {
  validate (value) {
    return /^1\d{10}$/.test(value)
  },
  message: '请输入有效的手机号码'
})
// 注册为全局组件
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
