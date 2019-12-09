<template>
  <div class="tabbar">
    <!-- 二级路由出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon="wap-home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="more-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-circle-o">{{$store.state.TokenObj?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>
