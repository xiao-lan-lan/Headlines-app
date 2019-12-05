<template>
  <div class="user">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="个人信息" left-arrow right-text="保存" />

    <!-- 编辑项 -->
    <van-cell-group>
      <van-cell title="头像" is-link value="内容">
        <van-image slot="default" width="40" height="40" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link value="内容">
        <span slot="default">{{user.name}}</span>
      </van-cell>
      <van-cell title="性别" is-link value="内容">
        <span slot="default">{{user.gender?'女':'男'}}</span>
      </van-cell>
      <van-cell title="生日" is-link value="内容">
        <span slot="default">{{user.birthday}}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserSelf } from '@/api/user'
export default {
  name: 'UserEditPage',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    // 获取用户个人信息
    async loadUser () {
      const res = await getUserSelf()
      console.log(res.data)
      this.user = res.data.data
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style>
</style>
