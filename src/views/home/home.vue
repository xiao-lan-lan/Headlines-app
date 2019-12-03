<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav" fixed />

    <!-- 频道标签 -->
    <van-tabs v-model="active" color="#3296fa" title-active-color="#3296fa">
      <van-icon name="wap-nav" slot="nav-right" size="30px" @click="isChannelShow=true" />
      <van-tab v-for="channel in UserChannels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            />-->

            <van-grid :column-num="1" :center="false">
              <van-grid-item
                v-for="article in channel.articles"
                :key="article.art_id.toString()"
                :text="article.title"
                class="articleItem"
              >
                <p style="margin:0;font-size:18px">{{article.title}}</p>
                <div class="img">
                  <van-image
                    width="80px"
                    height="80px"
                    fit="contain"
                    :src="img"
                    v-for="(img,index) in article.cover.images"
                    :key="index"
                    lazy-load
                    style="margin-right:10px"
                  />
                </div>
                <div class="tag">
                  <van-tag style="margin-right:10px" mark type="danger" v-if="article.is_top">置顶</van-tag>
                  <van-tag style="margin-right:10px" plain type="primary">{{article.aut_name}}</van-tag>
                  <van-tag style="margin-right:10px" plain type="success">{{article.comm_count}}评论</van-tag>
                  <van-tag
                    style="margin-right:10px"
                    plain
                    type="warning"
                  >{{article.pubdate | dataFormat}}</van-tag>
                </div>
              </van-grid-item>
            </van-grid>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 弹出层,全部频道 -->
    <van-popup
      v-model="isChannelShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    />
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import { getArticles } from '@/api/articles'
import moment from 'moment'
import '@/utils/data.js'

// 相对时间中文
moment.locale('zh-cn')

export default {
  name: 'HomePage',
  data () {
    return {
      active: 0, // 激活的标签页
      loading: false, // 上拉加载
      UserChannels: [], // 用户频道
      isLoading: false, // 上拉刷新加载
      isChannelShow: false // 频道弹出层
    }
  },
  methods: {
    // 获取频道列表
    async loadUserChannels () {
      const res = await getChannels()
      console.log(res.data)
      this.UserChannels = res.data.data.channels
      this.UserChannels.forEach(item => {
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
      const currentChannel = this.UserChannels[this.active]

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
      const currentChannel = this.UserChannels[this.active]

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
      const message = res.data.data.results
        ? `更新了${res.data.data.results.length}条数据`
        : '暂无更新'
      this.$toast(message)

      // 结束刷新
      this.isLoading = false
    }
  },
  created () {
    this.loadUserChannels()
  },
  filters: {
    dataFormat: function (value) {
      // let myTime = moment(value).format('YYYY-MM-DD')
      // let nowtTime = moment(moment(new Date()).format('YYYY-MM-DD'))
      // console.log(nowtTime.diff(myTime, 'day'))
      // return nowtTime.diff(myTime, 'day')
      return moment(value).fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .van-tabs /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    width: 100%;
    z-index: 2;
  }
  .van-tabs /deep/ .van-tabs__content {
    margin-top: 90px;
  }
  .van-icon {
    position: fixed;
    line-height: 46px;
    right: 0;
    opacity: 0.8;
    background-color: #fff;
  }
}
</style>
