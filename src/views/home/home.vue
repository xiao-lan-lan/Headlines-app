<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav" />

    <!-- 频道标签 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            />
          </van-list>
        </van-pull-refresh>
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
      channels: [],
      isLoading: false
    }
  },
  methods: {
    // 获取频道列表
    async loadChannels () {
      const res = await getChannels()
      console.log(res.data)
      this.channels = res.data.data.channels
      this.channels.forEach(item => {
        item.articles = []
        item.finished = false
        item.timestamp = ''
      })
    },

    // 上拉加载更多文章列表
    async onLoad () {
      // 1.请求加载数据
      // 2.将数据添加到列表中
      // 3.loading改为 false
      // 4.如果没有数据了,把 finished 改为 true

      // 当前频道
      const currentChannel = this.channels[this.active]

      // 请求文章列表
      const res = await getArticles({
        channel_id: currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      console.log(res.data)

      // 追加文章列表
      currentChannel.articles.push(...res.data.data.results)

      // 结束加载
      this.loading = false

      // 判断是否还有数据，即后端返回数据是否还有上一次时间戳pre_timestamp
      if (res.data.data.pre_timestamp) {
        currentChannel.timestamp = res.data.data.pre_timestamp
      } else {
        currentChannel.finished = true
      }
    },

    // 下拉刷新文章列表
    async onRefresh () {
      // 当前频道
      const currentChannel = this.channels[this.active]

      // 请求文章列表
      const res = await getArticles({
        channel_id: currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      console.log(res.data)

      // 追加到当前频道的文章列表中
      currentChannel.articles.unshift(...res.data.data.results)

      // 提示刷新成功
      this.$toast('刷新成功')

      // 结束刷新
      this.isLoading = false
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
