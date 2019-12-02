// 处理时间的模块

import Vue from 'vue'

import dayjs from 'dayjs'

// 中文
import 'dayjs/locale/zh-cn'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

Vue.filter('relativeTime', function (value) {
  return dayjs().from(dayjs(value))
})

// 格式化
dayjs('2019-01-25').format('YYYY-MM-DD HH:mm:ss')

// 时间差
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // 20214000000
date1.diff(date2, 'month') // 7
date1.diff(date2, 'month', true) // 7.645161290322581
date1.diff(date2, 'day') // 233
