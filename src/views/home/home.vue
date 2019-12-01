<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav" />

    <!-- 频道标签 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-list
          v-model="loading"
          :finished="channel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="article in channel.articles"
            :key="article.art_id"
            :title="article.title"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import { getArticles } from '@/api/articles'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      loading: false,
      channels: []
    }
  },
  methods: {
    // 获取频道列表
    async loadChannels () {
      const res = await getChannels()
      console.log(res)
      this.channels = res.data.data.channels
      this.channels.forEach(item => {
        item.articles = []
        item.finished = false
        item.timestamp = ''
      })
    },

    async onLoad () {
      // 1.请求加载数据
      // 2.将数据添加到列表中
      // 3.loading改为 false
      // 4.如果没有数据了,把 finished 改为 true

      // 当前频道
      const currentChannel = this.channels[this.active]
      const res = await getArticles({
        channel_id: currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      console.log(res)
      currentChannel.articles.push(...res.data.data.results)
      this.loading = false

      if (res.data.data.pre_timestamp) {
        currentChannel.timestamp = res.data.data.pre_timestamp
      } else {
        currentChannel.finished = true
      }
    }

    // onLoad () {
    //   // 当前频道文章
    //   console.log(this.channels[this.active])
    //   const currentArticles = this.channels[this.active].articles

    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       currentArticles.push(currentArticles.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (currentArticles.length >= 40) {
    //       this.channels[this.active].finished = true
    //     }
    //   }, 500)
    // }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>