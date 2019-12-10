<template>
  <div class="articles">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.push('/')" :fixed="true"/>

    <!-- 加载转圈圈 -->
    <van-loading
      type="spinner"
      color="#1989fa"
      style="text-align:center;margin-top:15px"
      v-if="articleloading"
    />

    <!-- 文章内容 -->
    <div class="article" v-else-if="article.title">
      <!-- 文章标题 -->
      <h5>{{article.title}}</h5>
      <div class="t">
        <div class="author">
          <van-image round width="80px" height="80px" :src="article.aut_photo" lazy-load />
          <div class="time">
            <span style="font-weight:700">{{article.aut_name}}</span>
            <span style="color:grey">{{article.pubdate | relativeTime}}</span>
          </div>
        </div>
        <van-button
          type="info"
          icon="plus"
          size="small"
          round
          v-show="!article.is_followed"
          @click="onFollow"
        >关注</van-button>
        <van-button size="small" round plain v-show="article.is_followed" @click="onFollow">取消关注</van-button>
      </div>
      <div class="m" v-html="article.content"></div>
      <div class="b">
        <van-button
          plain
          type="primary"
          round
          icon="good-job-o"
          size="small"
          style="margin-right:20px"
          hairline
          v-show="article.attitude===-1 || article.attitude===0"
          @click="onLike"
        >+点赞</van-button>
        <van-button
          plain
          type="default"
          round
          size="small"
          style="margin-right:20px"
          hairline
          v-show="article.attitude===1"
          @click="onLike"
        >取消点赞</van-button>

        <!-- <van-button plain type="primary" round icon="like-o" size="small" hairline >喜欢</van-button> -->
        <van-button
          plain
          type="danger"
          round
          icon="delete"
          size="small"
          hairline
          @click="onDislike"
        >{{article.attitude===0?'取消不喜欢':'不喜欢'}}</van-button>
      </div>
    </div>

    <!-- 评论 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
      <div
        class="comment"
        slot="default"
        v-for="comment in comments"
        :key="comment.com_id.toString()"
      >
        <div class="author">
          <van-image round width="40px" height="40px" :src="comment.aut_photo" lazy-load />
          <div class="time">
            <span style="font-weight:700;color:#466b9d">{{comment.aut_name}}</span>
            <span>{{comment.content}}</span>
            <span style="color:grey">
              {{comment.pubdate | relativeTime}}
              <van-button
                type="default"
                style="margin-left:10px"
                size="mini"
                @click="onComment(comment)"
              >回复</van-button>
            </span>
          </div>
        </div>
        <van-icon
          :name="comment.is_liking?'like':'like-o'"
          size="16px"
          color="red"
          @click="onCommentLike(comment)"
        />
      </div>
    </van-list>

    <!-- 评论回复 -->
    <van-popup
      v-model="isCommentShow"
      round
      position="bottom"
      :style="{ height: '95%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 顶部导航标题 -->
      <van-nav-bar :title="totalComment+' 条回复'" />

      <!-- 此条评论 -->
      <div class="comment">
        <div class="author">
          <van-image round width="40px" height="40px" :src="currentcomment.aut_photo" lazy-load />
          <div class="time">
            <span style="font-weight:700;color:#466b9d">{{currentcomment.aut_name}}</span>
            <span>{{currentcomment.content}}</span>
            <span style="color:grey">{{currentcomment.pubdate | relativeTime}}</span>
          </div>
        </div>
        <van-icon :name="currentcomment.is_liking?'like':'like-o'" size="14px" color="red" />
      </div>

      <van-divider />
      <!-- 回复 -->
      <div class="comment" v-for="(comment,index) in CommentReply" :key="index">
        <div class="author">
          <van-image round width="40px" height="40px" :src="comment.aut_photo" lazy-load />
          <div class="time">
            <span style="font-weight:700;color:#466b9d">{{comment.aut_name}}</span>
            <span>{{comment.content}}</span>
            <span style="color:grey">{{comment.pubdate | relativeTime}}</span>
          </div>
        </div>
        <van-icon
          :name="comment.is_liking?'like':'like-o'"
          size="16px"
          color="red"
          @click="onCommentReplyLike(comment)"
        />
      </div>

      <!-- 底部发表回复 -->
      <van-cell-group>
        <van-field v-model="commentReplyText" center clearable placeholder="请输入评论内容">
          <van-button
            slot="button"
            size="small"
            type="info"
            @click="onAddCommentReply(currentcomment.com_id.toString())"
          >发布</van-button>
        </van-field>
      </van-cell-group>
    </van-popup>

    <!-- 水平线 -->
    <van-divider />

    <!-- 底部发表文章评论 -->
    <van-cell-group>
      <van-field v-model="commentText" center clearable placeholder="请输入评论内容">
        <van-button slot="button" size="small" type="info" @click="onAddArticleComment">发布</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import {
  getArticleDetail,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike
} from '@/api/articles'
import {
  getComments,
  addComments,
  addCommentLike,
  addCommentDislike
} from '@/api/comment'
import { followUser, unfollowUser } from '@/api/user'
import '@/utils/data'
export default {
  name: 'ArticlePage',
  data () {
    return {
      commentText: '', // 发布文章评论
      commentReplyText: '', // 回复评论内容
      article: {}, // 文章详情
      comments: [], // 文章评论
      isCommentShow: false, // 评论弹窗
      CommentReply: [], // 评论回复
      totalComment: 0, // 评论回复数
      currentcomment: {}, // 当前评论
      loading: false, // 评论列表加载转圈
      finished: false, // 加载完成
      offset: null, // 评论列表下一页
      articleloading: true // 进入加载
    }
  },
  methods: {
    // 获取文章详情
    async loadArticlesDetail () {
      const res = await getArticleDetail(this.$route.params.id)
      console.log(res.data)
      this.article = res.data.data
      this.articleloading = false
    },

    // 获取文章评论
    async onLoad () {
      // 1.异步请求
      const res = await getComments({
        type: 'a',
        source: this.$route.params.id,
        offset: this.offset
      })
      console.log(res.data)
      // 2.数据追加到列表
      this.comments.push(...res.data.data.results)
      // 3.停止转圈圈
      this.loading = false
      // 4.结束加载判断
      if (res.data.data.last_id) {
        this.offset = res.data.data.last_id
      } else {
        this.finished = true
      }
    },

    // 获取评论回复
    async onComment (comment) {
      // 弹出框
      this.isCommentShow = true
      console.log(comment)

      // 当前评论
      this.currentcomment = comment

      // 评论回复请求
      const res = await getComments({
        type: 'c',
        source: comment.com_id.toString()
      })
      console.log(res.data)

      // 评论回复数组
      this.CommentReply = res.data.data.results
      // 总回复数
      this.totalComment = res.data.data.total_count
    },

    // 发表文章评论
    async onAddArticleComment () {
      const res = await addComments({
        target: this.$route.params.id,
        content: this.commentText
      })
      console.log(res)
      if (res.status === 201) {
        this.$toast({ type: 'success', message: '发布成功' })
        // this.loadArticleComments()
        // 直接追加到数组，不需要重新加载评论列表
        this.comments.unshift(res.data.data.new_obj)
        this.commentText = ''
      } else {
        this.$toast({ type: 'fail', message: '发布失败' })
      }
    },

    // 发表评论回复
    async onAddCommentReply (id) {
      const res = await addComments({
        target: id,
        content: this.commentReplyText,
        art_id: this.$route.params.id
      })
      console.log(res)
      if (res.status === 201) {
        if (res.status === 201) {
          this.CommentReply.unshift(res.data.data.new_obj)
          this.$toast({ type: 'success', message: '发布成功' })
          this.commentReplyText = ''
        } else {
          this.$toast({ type: 'fail', message: '发布失败' })
        }
      }
    },

    // 关注,取消关注用户
    async onFollow () {
      // 已关注，请求取消关注
      if (this.article.is_followed) {
        const res = await unfollowUser(this.article.aut_id)
        console.log(res)
      } else {
        // 未关注，请求关注
        const res = await followUser(this.article.aut_id)
        console.log(res)
      }
      this.article.is_followed = !this.article.is_followed
      this.$toast({ type: 'success', message: '操作成功' })
    },

    // 点赞,取消点赞文章
    async onLike () {
      if (this.article.attitude === 1) {
        // 点赞状态,请求取消点赞
        const res = await deleteLike(this.$route.params.id)
        console.log(res)
        this.article.attitude = -1
      } else {
        // 无态度状态,请求点赞
        const res = await addLike(this.$route.params.id)
        console.log(res)
        this.article.attitude = 1
      }
      this.$toast({ type: 'success', message: '操作成功' })
    },

    // 不喜欢,取消不喜欢文章
    async onDislike () {
      if (this.article.attitude === 0) {
        // 不喜欢状态,请求取消不喜欢
        const res = await deleteDislike(this.$route.params.id)
        console.log(res)
        this.article.attitude = -1
      } else {
        // 无态度状态,请求不喜欢
        const res = await addDislike(this.$route.params.id)
        console.log(res)
        this.article.attitude = 0
      }
      this.$toast({ type: 'success', message: '操作成功' })
    },

    // 点赞,取消点赞评论
    async onCommentLike (comment) {
      // 点赞状态,请求取消点赞
      if (comment.is_liking) {
        const res = await addCommentDislike(comment.com_id.toString())
        console.log(res)
      } else {
        // 未点赞状态,请求点赞
        const res = await addCommentLike(comment.com_id.toString())
        console.log(res)
      }
      comment.is_liking = !comment.is_liking
      this.$toast({ type: 'success', message: '操作成功' })
    },

    // 点赞,取消点赞评论回复
    async onCommentReplyLike (comment) {
      // 点赞状态,请求取消点赞
      if (comment.is_liking) {
        const res = await addCommentDislike(comment.com_id.toString())
        console.log(res)
      } else {
        // 未点赞状态,请求点赞
        const res = await addCommentLike(comment.com_id.toString())
        console.log(res)
      }
      comment.is_liking = !comment.is_liking
      this.$toast({ type: 'success', message: '操作成功' })
    }
  },
  created () {
    this.loadArticlesDetail()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .van-nav-bar {
    width: 100%;
  }
  .article {
    padding: 10px;
    margin-bottom: 30px;
    margin-top: 46px;
    overflow: auto;
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
  /deep/ .van-popup {
    .van-popup__close-icon {
      color: #fff;
    }
  }
}
</style>
