<template>
  <div class="home">
    <!-- 顶部导航 -->
    <van-nav-bar title="主页" class="nav" fixed />

    <!-- 频道标签 -->
    <van-tabs v-model="active" color="#3296fa" title-active-color="#3296fa">
      <!-- 右侧面包按钮 -->
      <van-icon name="wap-nav" slot="nav-right" size="30px" @click="isChannelShow=true" />

      <!-- 频道标签列表 -->
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
              <!-- 每一个文章 -->

              <van-grid-item
                v-for="article in channel.articles"
                :key="article.art_id.toString()"
                :text="article.title"
                class="articleItem"
              >
                <!-- 文章标题 -->
                <p style="margin:0;font-size:18px">{{article.title}}</p>

                <!-- 文章图片 -->
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

                <!-- 文章评论等 -->
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
      :style="{ height: '95%' }"
      closeable
      close-icon-position="top-left"
      @open="onChannelOpen"
    >
      <van-cell-group style="margin-top:50px">
        <!-- 我的频道 -->
        <van-cell title="我的频道" value="内容">
          <van-button plain type="danger" hairline round size="mini" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item v-for="(channel,index) in UserChannels" :key="channel.id" :text="channel.name">
            <van-icon name="close" slot="icon" size="18px" v-show="isEdit" @click="onDelUserchannel(index)"/>
          </van-grid-item>
        </van-grid>

        <!-- 推荐频道 -->
        <van-cell title="推荐频道" />
        <van-grid :gutter="10">
          <van-grid-item v-for="channel in CommendChannels" :key="channel.id" :text="channel.name" />
        </van-grid>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import { getArticles } from '@/api/articles'
import { getAllChannels } from '@/api/channels'
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
      // CommendChannels: [], // 推荐频道
      AllChannels: [], // 全部频道
      isLoading: false, // 上拉刷新加载
      isChannelShow: false, // 频道弹出层
      isEdit: false // 编辑状态,显示删除图标
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
    },

    // 频道列表打开,获取全部频道
    async onChannelOpen () {
      const res = await getAllChannels()
      console.log(res.data)
      this.AllChannels = res.data.data.channels
    },

    // 删除用户频道,去推荐频道
    onDelUserchannel (index) {
      console.log(index)
      this.UserChannels.splice(index, 1)
    }
  },
  created () {
    this.loadUserChannels()
  },
  computed: {
    CommendChannels () {
      const arr = []
      this.AllChannels.forEach(allchannel => {
        const res = this.UserChannels.find(userchannel => {
          return userchannel.id === allchannel.id
        })
        if (!res) {
          arr.push(allchannel)
        }
      })
      return arr
    }
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
  .van-icon-wap-nav {
    position: fixed;
    line-height: 46px;
    right: 0;
    opacity: 0.8;
    background-color: #fff;
  }
  /deep/ .van-grid-item__icon-wrapper {
    position: absolute;
    top: -16px;
    right: -8px;
    z-index: 2
  }
}
</style>
