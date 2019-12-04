<template>
  <div class="box">
    <!-- 顶部导航标题 -->
    <van-nav-bar :title="$route.params.q+'的搜索结果'" left-arrow @click-left="$router.back()" />

    <!-- 搜索结果列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="SearchResult in SearchResults"
        :key="SearchResult.art_id"
        :title="SearchResult.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResults',
  data () {
    return {
      SearchResults: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      let page = 1
      // 1.异步请求
      const res = await getSearchResults({
        page: page,
        per_page: 15,
        q: this.$route.params.q
      })
      console.log(res.data)

      // 2.追加数据
      this.SearchResults.push(...res.data.data.results)

      // 3.加载状态结束
      this.loading = false

      // 4.数据加载全部完成
      if (res.data.data.results.length < 15) {
        this.finished = true
      } else {
        page++
      }
    }
  }
}
</script>

<style>
</style>
