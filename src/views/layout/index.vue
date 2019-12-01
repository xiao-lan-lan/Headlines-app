<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="more-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
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
