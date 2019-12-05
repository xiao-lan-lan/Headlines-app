<template>
  <div class="articles">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章内容 -->
    <div class="article">
      <!-- 文章标题 -->
      <h5>文章标题</h5>
      <div class="t">
        <div class="author">
          <van-image
            round
            width="30px"
            height="30px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            lazy-load
          />
          <div class="time">
            <span style="font-weight:700">作者</span>
            <span style="color:grey">发布时间</span>
          </div>
        </div>
        <van-button type="info" icon="plus" size="small" round>关注</van-button>
      </div>
      <div class="m">文章详情内容</div>
      <div class="b">
        <van-button
          plain
          type="primary"
          round
          icon="good-job-o"
          size="small"
          style="margin-right:20px"
          hairline
        >+点赞</van-button>
        <van-button plain type="danger" round icon="delete" size="small" hairline>不喜欢</van-button>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <div class="author">
        <van-image
          round
          width="30px"
          height="30px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          lazy-load
        />
        <div class="time">
          <span style="font-weight:700;color:#466b9d">评论者</span>
          <span>评论内容</span>
          <span style="color:grey">
            评论时间
            <van-button type="default" style="margin-left:10px" size="mini">回复</van-button>
          </span>
        </div>
      </div>
      <van-icon name="like-o" size="14px" />
    </div>

    <!-- 水平线 -->
    <van-divider />
    <div style="text-align:center">
      <span style="color:grey;font-size:14px;">没有更多了</span>
    </div>

    <!-- 底部发表评论 -->
    <van-cell-group>
      <van-field v-model="sms" center clearable placeholder="请输入评论内容">
        <van-button slot="button" size="small" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticlePage',
  data () {
    return {
      sms: ''
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.articles {
  .article {
    padding: 10px;
    margin-bottom: 30px;
    h5 {
      margin: 10px 0 30px 0;
    }
    .t {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .author {
        display: flex;
        .time {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .m {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .b {
      display: flex;
      justify-content: center;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .author {
      display: flex;
      .time {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        margin-left: 10px;
        span {
          margin-bottom: 15px;
        }
      }
    }
  }
  .van-cell-group {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
