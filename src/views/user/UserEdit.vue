<template>
  <div class="user">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="个人信息" left-arrow right-text="保存" />

    <!-- 编辑项 -->
    <van-cell-group>
      <van-cell title="头像" is-link value="内容">
        <van-image
          slot="default"
          width="40"
          height="40"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell title="昵称" is-link value="内容">
        <span slot="default"></span>
      </van-cell>
      <van-cell title="性别" is-link value="内容">
        <span slot="default"></span>
      </van-cell>
      <van-cell title="生日" is-link value="内容">
        <span slot="default"></span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
