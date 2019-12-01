// 按需引入vant组件,创建单独文件存放引入并注册vant组件,都在main.js中不易维护

import Vue from 'vue'
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Field,
  Icon,
  Toast,
  Tag,
  Tabbar,
  TabbarItem
} from 'vant'

Vue
  .use(Button)
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Icon)
  .use(Toast)
  .use(Tag)
  .use(Tabbar)
  .use(TabbarItem)