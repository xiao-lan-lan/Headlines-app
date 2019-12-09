<template>
  <div class="user">
    <!-- 顶部导航标题 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.push('/user')"
      @click-right="onEditUser"
    />

    <!-- 编辑项 -->
    <van-cell-group>
      <van-cell title="头像" is-link value="内容">
        <van-image
          slot="default"
          width="40"
          height="40"
          :src="user.photo"
          @click="$refs.file.click()"
        />
        <input type="file" hidden ref="file" @change="onImgPreview" />
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
    <van-dialog v-model="isNameShow" title="用户昵称" show-cancel-button @confirm="user.name=editName">
      <van-field :value="user.name" @input="onNameIuput" />
    </van-dialog>

    <!-- 性别弹出 -->
    <van-action-sheet
      v-model="isGenderShow"
      :actions="genderActions"
      @select="onSelect"
      :close-on-click-action="true"
      cancel-text="取消"
      @cancel="isGenderShow=false"
    />

    <!-- 生日弹出 -->
    <van-popup v-model="isBirthdayShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currenttDate"
        type="date"
        @cancel="isBirthdayShow=false"
        @confirm="onBirthdatSelect"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserSelf, editUser, editUserImg } from '@/api/user'
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
      currenttDate: new Date(), // 初始日期
      genderActions: [{ name: '男', value: 0 }, { name: '女', value: 1 }]
    }
  },
  methods: {
    // 获取用户个人信息
    async loadUser () {
      const res = await getUserSelf()
      console.log(res.data)
      this.user = res.data.data
    },

    // 昵称
    onNameIuput (value) {
      console.log(value)
      this.editName = value
    },

    // 性别选择
    onSelect (item) {
      this.user.gender = item.value
    },

    // 生日选择
    onBirthdatSelect (value) {
      this.isBirthdayShow = false
      console.log(value)
      this.user.birthday = moment(value).format('YYYY-MM-DD')
    },

    // 头像预览
    onImgPreview () {
      this.user.photo = URL.createObjectURL(this.$refs.file.files[0])
    },

    // 修改用户资料
    async onEditUser () {
      // 其他信息
      const { name, gender, birthday } = this.user
      const res = await editUser({
        name,
        gender,
        birthday
      })
      console.log(res.data)

      // 头像
      if (this.$refs.file.files) {
        let fd = new FormData()
        fd.append('photo', this.$refs.file.files[0])
        const res = await editUserImg(fd)
        console.log(res)
      }

      this.$toast({ type: 'success', message: '修改成功' })
    }
  },
  created () {
    this.loadUser()
  }
}

</script>

<style>
</style>
