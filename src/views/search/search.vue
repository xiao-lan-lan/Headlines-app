<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    >
      <span slot="action" @click="$router.push(`/search/${value}`)">搜索</span>
    </van-search>

    <!-- 联想 -->
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="$router.push(`/search/${suggestion}`)"
      >
        <span slot="title" v-html="HigthLigth(suggestion)">{{suggestion}}</span>
      </van-cell>
    </van-cell-group>

    <!-- 搜索历史 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" color="red" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  name: 'SearchPage',
  data () {
    return {
      value: '', // 搜索关键词
      suggestions: [],
      str: "<span style='color:red'>哈哈</span>"
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

    // 搜索
    onSearch () {},

    // 取消搜索
    onCancel () {}
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
