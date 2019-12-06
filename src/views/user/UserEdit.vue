<template>
  <div class="user">
    <!-- 顶部导航标题 -->
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()" @click-right="onEditUser"/>

    <!-- 编辑项 -->
    <van-cell-group>
      <van-cell title="头像" is-link value="内容">
        <van-image slot="default" width="40" height="40" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link value="内容" @click="isNameShow=true">
        <span slot="default">{{user.name}}</span>
      </van-cell>
      <van-cell title="性别" is-link value="内容" @click="isGenderShow=true">
        <span slot="default">{{user.gender?'女':'男'}}</span>
      </van-cell>
      <van-cell title="生日" is-link value="内容" @click="isBirthdayShow=true">
        <span slot="default">{{user.birthday}}</span>
      </van-cell>
    </van-cell-group>

    <!-- 昵称弹出 -->
    <van-dialog
      v-model="isNameShow"
      title="用户昵称"
      show-cancel-button
      @cancel="isNameShow=false"
      @confirm="isNameShow=false"
    >
      <van-field v-model="user.name" />
    </van-dialog>

    <!-- 性别弹出 -->
    <van-action-sheet
      v-model="isGenderShow"
      :actions="genderActions"
      @select="onSelect"
      :close-on-click-action="true"
    />

    <!-- 生日弹出 -->
    <van-popup v-model="isBirthdayShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="selectDate"
        type="date"
        @cancel="isBirthdayShow=false"
        @confirm="onBirthdatSelect"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserSelf, editUser } from '@/api/user'
import moment from 'moment'
export default {
  name: 'UserEditPage',
  data () {
    return {
      user: {
        name: '',
        photo: '',
        gender: 0,
        birthday: ''
      },
      isNameShow: false, // 昵称弹出
      editName: '', // 修改昵称
      isGenderShow: false, // 性别弹出
      isBirthdayShow: false, // 生日弹出
      selectDate: '', // 选择日期
      genderActions: [{ name: '男' }, { name: '女' }, { name: '取消' }]
    }
  },
  methods: {
    // 获取用户个人信息
    async loadUser () {
      const res = await getUserSelf()
      console.log(res.data)
      this.user = res.data.data
    },

    // 性别选择
    onSelect (item) {
      if (item.name === '女') {
        this.user.gender = 1
      } else if (item.name === '男') {
        this.user.gender = 0
      }
    },

    // 生日选择
    onBirthdatSelect (value) {
      this.isBirthdayShow = false
      console.log(value)
      this.user.birthday = moment(value).format('YYYY-MM-DD')
    },

    // 修改用户资料
    async onEditUser () {
      const res = await editUser(this.user)
      console.log(res.data)
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style>
</style>
