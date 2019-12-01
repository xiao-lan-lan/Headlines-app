<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav"/>

    <!-- 频道标签 -->
    <van-tabs>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>

    <!-- 文章列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style>
</style>
