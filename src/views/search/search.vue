<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
      background="#3296fa"
      @input="onInput"
    >
      <span slot="action" @click="onSearch(value)">搜索</span>
    </van-search>

    <!-- 联想 -->
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="onSearch(suggestion)"
      >
        <span slot="title" v-html="HigthLigth(suggestion)">{{suggestion}}</span>
      </van-cell>
    </van-cell-group>

    <!-- 搜索历史 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" color="red" />
      </van-cell>
      <van-cell :title="history" v-for="(history,index) in histories" :key="index">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { setItem, getItem } from '@/utils/localStorage'
export default {
  name: 'SearchPage',
  data () {
    return {
      value: '', // 搜索关键词
      suggestions: [], // 联想建议
      histories: getItem('history') || []// 历史记录
    }
  },
  methods: {
    // 获取联想词
    async onInput () {
      if (!this.value) {
        return
      }
      const res = await getSuggestion(this.value.trim())
      console.log(res.data)
      this.suggestions = res.data.data.options
    },

    // 高亮关键词
    HigthLigth (suggestion) {
      console.log(suggestion)
      const reg = new RegExp(this.value, 'gi')
      return suggestion.replace(reg, `<span style='color:red'>${this.value}</span>`)
    },

    // 携带参数,路由跳转
    onSearch (data) {
      // 非空
      if (!data.trim()) {
        this.$notify('请输入搜索内容')
        return
      }
      // 判断历史记录中是否包含此次搜索关键词,有-去除掉原来的，没有-正常添加
      const index = this.histories.indexOf(data)
      if (index !== -1) {
        this.histories.splice(index, 1)
      }
      // 添加到历史记录
      this.histories.unshift(data)
      // 存储历史记录
      setItem('history', this.histories)
      // 路由跳转
      this.$router.push(`/search/${data}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
