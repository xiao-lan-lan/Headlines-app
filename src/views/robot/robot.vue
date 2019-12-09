<template>
  <div class="robot">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" fixed />

    <!-- 聊天列表 -->
    <div class="chat" ref="chat">
      <div
        :class="{l:!message.isMe,r:message.isMe}"
        v-for="(message,index) in messageList"
        :key="index"
      >
        <van-image round width="40px" height="40px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <span>{{message.msg}}</span>
      </div>
      <!-- <div class="r">
        <span>嘿嘿嘿</span>
        <van-image round width="40px" height="40px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>-->
    </div>

    <!-- 底部发送消息 -->
    <van-cell-group>
      <van-field v-model="userText" center clearable placeholder="小智等待您的输入哦">
        <van-button slot="button" size="small" type="primary" @click="onSubmit">发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/localStorage'
export default {
  name: 'ChatPage',
  data () {
    return {
      userText: '', // 输入内容
      socket: null, // 通信对象
      messageList: getItem('chat') || []// 消息列表
    }
  },
  methods: {
    onSubmit () {
      // 发送消息
      const data = {
        msg: this.userText,
        timestamp: Date.now(),
        isMe: true
      }
      this.socket.emit('message', data)
      this.messageList.push(data)
      this.userText = ''
    }
  },
  created () {
    // 建立连接
    this.socket = io('http://ttapi.research.itcast.cn')
    // 接收消息
    this.socket.on('message', data => {
      console.log(data)
      data.isMe = false
      this.messageList.push(data)
    })
    // this.socket = socket
  },
  mounted () {
    const chat = this.$refs.chat
    chat.scrollTop = chat.scrollHeight
  },
  watch: {
    messageList: function (newval, oldval) {
      setItem('chat', newval)
      console.dir(this.$refs.chat)
      const chat = this.$refs.chat
      this.$nextTick(() => {
        chat.scrollTop = chat.scrollHeight
      })
    }
  }
}
</script>

<style lang="less" scoped>
.robot {
  position: absolute;
  background-color: #f5f5f6;
  left: 0;
  right: 0;
  .chat {
    margin-top: 46px;
    padding: 15px 15px 50px 15px;
    span {
      padding: 8px;
      background-color: #fff;
      border-radius: 10px;
      margin-left: 8px;
      font-size: 16px;
      white-space: wrap;
    }
    .l {
      display: flex;
      align-items: center;
      margin: 12px 0;
    }
    .r {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      span {
        margin-right: 8px;
        background-color: #07c160;
        color: #fff;
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
