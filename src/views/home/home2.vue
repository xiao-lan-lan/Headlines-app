<template>
  <div class="home">
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        {{ channel.name }}
        <van-list v-model="loading" :finished="channel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in channel.articles" :key="article.art_id" :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hhh',
  data () {
    return {
      active: 0,
      channels: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    //   频道
    loadChannels () {
      axios({
        method: 'GET',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/user/channels',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).token
          }`
        }
      }).then(res => {
        console.log(res.data)
        this.channels = res.data.data.channels
        this.channels.forEach(channel => {
          channel.articles = []
          channel.finished = false
          channel.timestamp = ''
        })
      })
    },

    onLoad () {
      // 当前频道
      const currentChannel = this.channels[this.active]
      console.log(currentChannel)

      axios({
        method: 'GET',
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).token
          }`
        },
        params: {
          channel_id: currentChannel.id,
          timestamp: currentChannel.timestamp || Date.now(),
          with_top: 1
        }
      }).then(res => {
        console.log(res.data)
        currentChannel.articles.push(...res.data.data.results)
        this.loading = false
        if (!res.data.data.pre_timestamp) {
          currentChannel.finished = true
        } else {
          currentChannel.timestamp = res.data.data.pre_timestamp
        }
      })

      // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //     //   currentChannel.articles.push(currentChannel.articles.length + 1)
      //     }
      //     // 加载状态结束
      //     this.loading = false

    //     // 数据全部加载完成
    //     if (currentChannel.articles.length >= 40) {
    //       currentChannel.finished = true
    //     }
    //   }, 500)
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
