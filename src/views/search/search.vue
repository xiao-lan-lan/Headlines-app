<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
    />

     <!-- 联想 -->
    <van-cell-group>
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
    </van-cell-group>

    <!-- 搜索历史 -->
    <van-cell-group>
       <van-cell title="历史记录">
         <van-icon slot="right-icon" name="delete" style="line-height: inherit;" color="red"/>
      </van-cell>
       <van-cell title="单元格">
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
      <van-cell title="单元格" >
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '' // 搜索关键词
    }
  },
  methods: {
    // 搜索
    onSearch () {},

    // 取消搜索
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
