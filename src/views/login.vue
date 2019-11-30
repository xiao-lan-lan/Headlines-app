<template>
  <div class="login">
    <!-- 顶部导航 -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <van-cell-group>
      <van-field clearable left-icon="contact" placeholder="请输入手机号" />
      <van-field center clearable placeholder="请输入验证码" left-icon="closed-eye">
        <van-button slot="button" size="small" type="primary" round >获取验证码</van-button>
      </van-field>
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="button">
      <van-button disabled type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login-Page'
}
</script>

<style lang="less">
.login {
    .van-button--primary {
        background-color: #ededed;
        border-color: #ededed;
        color: rgba(49, 48, 48, 0.733);
        font-size: 14px;
    }
    .button {
        padding: 30px 15px;
        .van-button {
            width: 100%;
        }
    }
}
</style>
