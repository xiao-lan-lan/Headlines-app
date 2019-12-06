<template>
  <div class="robot">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" fixed />

    <!-- 聊天列表 -->
    <div class="chat">
      <div class="l">
        <van-image round width="40px" height="40px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <span>哈哈哈</span>
      </div>
      <div class="r">
        <span>嘿嘿嘿</span>
        <van-image round width="40px" height="40px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
    </div>

    <!-- 底部发送消息 -->
    <van-cell-group>
      <van-field v-model="userText" center clearable placeholder="小智等待您的输入哦">
        <van-button slot="button" size="small" type="primary">发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  data () {
    return {
      userText: ''
    }
  }
}
</script>

<style lang="less" scoped>
.robot {
  position: absolute;
  background-color: #f5f5f6;
  height: 100%;
  left: 0;
  right: 0;
  .chat {
    margin-top: 46px;
    padding: 15px;
    span {
      padding: 8px;
      background-color: #fff;
      border-radius: 10px;
      margin-left: 8px;
    }
    .l {
      display: flex;
      align-items: center;
    }
    .r {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        margin-right: 8px;
      }
    }
  }
  .van-cell-group {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  /deep/ .van-popup {
    .van-popup__close-icon {
      color: #fff;
    }
  }
}
</style>
