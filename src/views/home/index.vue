<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav" />

    <!-- 频道标签 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      channels: []
    }
  },
  methods: {
    // 获取频道列表
    async loadChannels () {
      const res = await getChannels()
      console.log(res)
      this.channels = res.data.data.channels
    },

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
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
