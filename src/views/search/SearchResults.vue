<template>
  <div class="box">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="xxx的搜索结果" left-arrow @click-left="$router.back()" />

    <!-- 搜索结果列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="SearchResult in SearchResults" :key="SearchResult" :title="SearchResult" />
    </van-list>
  </div>
</template>

<script>
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
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.SearchResults.push(this.SearchResults.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.SearchResults.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style>
</style>
