<template>
  <div class="login">
    <!-- 顶部导航 -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <ValidationObserver v-slot="{ invalid }" ref="loginForm">
      <van-cell-group>
        <!-- 手机号 -->
        <ValidationProvider rules="required|phone" v-slot="{ errors }" name="手机号">
          <van-field v-model="user.mobile" clearable left-icon="contact" placeholder="请输入手机号" />
          <!-- <span>{{ errors[0] }}</span> -->
          <van-tag mark type="danger" v-show=" errors[0] ">{{ errors[0] }}</van-tag>
        </ValidationProvider>

        <!-- 验证码 -->
        <ValidationProvider rules="required|max:6" v-slot="{ errors }" name="验证码">
          <van-field
            v-model="user.code"
            center
            clearable
            placeholder="请输入验证码"
            left-icon="closed-eye"
          >
            <van-button slot="button" size="small" type="primary" round>获取验证码</van-button>
          </van-field>
          <!-- <span>{{ errors[0] }}</span> -->
          <van-tag mark type="danger" v-show=" errors[0] ">{{ errors[0] }}</van-tag>
        </ValidationProvider>
      </van-cell-group>

      <!-- 登录按钮 -->
      <div class="button">
        <van-button type="info" @click="onLogin" :disabled="invalid">登录</van-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login-Page',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onLogin () {
      const res = await this.$refs.loginForm.validate()
      if (!res) {
        return
      }

      //   request({
      //     url: '/app/v1_0/authorizations',
      //     method: 'POST',
      //     data: this.user
      //   }).then(res => {
      //     console.log(res.data)
      //   })

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const res = await login(this.user)
        console.log(res)
        this.$store.commit('changeTokenObj', res.data.data)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
