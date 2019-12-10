<template>
  <div class="user" style="padding:10px">
    <!-- 登录圆环 -->
    <div class="nologin" v-if="!$store.state.TokenObj">
      <div class="circle" @click="$router.push('/login')">登录</div>
    </div>

    <!-- 登录用户信息 -->
    <div class="login" v-else>
      <!-- 用户名头像 -->
      <van-cell
        :title="UserData.name"
        is-link
        style="margin-bottom:10px"
        @click="$router.push('/my')"
      >
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
    </div>

    <!-- 设置，小智等 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link to="/chat" />
      <van-cell title="系统设置" is-link />
      <van-cell title="退出登录" is-link @click="onLogout"/>
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

    // 获取用户数据
    async loadUserData () {
      const res = await getUserData()
      console.log(res.data)
      this.UserData = res.data.data
    },

    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定要退出么？'
      }).then(() => {
        // on confirm
        this.$store.commit('changeTokenObj', null)
      }).catch(() => {
        // on cancel
      })
    }
  },
  created () {
    this.loadUserData()
    this.$store.commit('changeUserPhoto', this.UserData.photo)
  }
}
</script>

<style lang="less" scoped>
.user {
  .van-grid {
    flex-wrap: nowrap
  }
  .nologin {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
    .circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      color: #fff;
      background-color: red;
    }
  }
}
</style>
