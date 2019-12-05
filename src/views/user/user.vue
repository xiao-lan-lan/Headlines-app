<template>
  <div class="user" style="padding:10px">
    <!-- 用户名头像 -->
    <van-cell :title="UserData.name" is-link style="margin-bottom:10px" @click="$router.push('/my')">
      <van-image
        width="50"
        height="50"
        :src="UserData.photo"
        slot="icon"
        style="margin-right:15px"
      />
    </van-cell>

    <!-- 关注信息 -->
    <van-grid :border="false">
      <van-grid-item icon="photo-o" text="头条">
        <span slot="icon">{{UserData.art_count}}</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="关注">
        <span slot="icon">{{UserData.follow_count}}</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="粉丝">
        <span slot="icon">{{UserData.fans_count}}</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="获赞">
        <span slot="icon">{{UserData.like_count}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 我的关注 -->
    <van-grid>
      <van-grid-item icon="star" text="我的收藏" />
      <van-grid-item icon="chat" text="我的评论" />
      <van-grid-item icon="like" text="我的点赞" />
      <van-grid-item icon="browsing-history" text="浏览历史" />
    </van-grid>

    <!-- 设置，小智等 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserData } from '@/api/user'
export default {
  name: 'UserPage',
  data () {
    return {
      UserData: {}
    }
  },
  methods: {
    async loadUserData () {
      const res = await getUserData()
      console.log(res.data)
      this.UserData = res.data.data
    }
  },
  created () {
    this.loadUserData()
  }
}
</script>

<style>
</style>
