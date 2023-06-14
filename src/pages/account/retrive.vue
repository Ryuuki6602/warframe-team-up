<template>
  <div class="form">
    <div class="title">重置密码</div>
    <el-steps
      :active="active"
      finish-status="success"
      class="w-400px"
      align-center
    >
      <el-step title="填写邮箱" />
      <el-step title="填写验证码" />
      <el-step title="填写新密码" />
    </el-steps>
    <el-form
      :model="retriveForm"
      :rules="retriveFormRules"
      ref="retriveFormRef"
      label-position="top"
      class="mt-40px"
    >
      <el-form-item prop="email" v-if="active == 0">
        <el-input v-model="retriveForm.email" placeholder="填写邮箱" />
      </el-form-item>
      <el-form-item prop="emailCode" v-if="active == 1">
        <el-input v-model="retriveForm.emailCode" placeholder="填写验证码" />
      </el-form-item>
      <el-form-item prop="newPassword" v-if="active == 2">
        <el-input
          v-model="retriveForm.newPassword"
          show-password
          placeholder="填写新密码"
        />
      </el-form-item>
      <el-form-item>
        <div class="flex justify-between w-100%">
          <el-button type="primary" @click="checkInput" :loading="loading"
            >下一步</el-button
          >
          <el-button type="primary" text @click="GoLogin"> 返回登录 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { validateEmails, validateEmailCode, revisePassword } from '@api/account'
import { ref, reactive } from 'vue'
import router from '@routes'
import { ElNotification } from 'element-plus'

const active = ref<number>(0)

interface retriveFormModel {
  email: string
  emailCode: string
  newPassword: string
}
const retriveForm = reactive<retriveFormModel>({
  email: '',
  emailCode: '',
  newPassword: ''
})
const retriveFormRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],
  emailCode: [
    { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: ['blur', 'change'] }
  ]
})

const loading = ref<boolean>(false)
const checkInput = async () => {
  loading.value = true
  if (active.value == 0) {
    const fb = await validateEmails(retriveForm.email)
    if (fb.status == '200') {
      active.value = 1
      ElNotification({
        title: '成功',
        message: '验证码已发送至邮箱',
        type: 'success',
        offset: 70
      })
    } else {
      ElNotification({
        title: '失败',
        message: '验证码发送失败',
        type: 'error',
        offset: 70
      })
    }
    loading.value = false
  } else if (active.value == 1) {
    const fb = await validateEmailCode(retriveForm)
    if (fb.res) {
      active.value = 2
    }
    loading.value = false
  } else if (active.value == 2) {
    const fb = await revisePassword(retriveForm)
    if (fb.res) {
      active.value = 3
      ElNotification({
        title: '成功',
        message: '修改完成',
        type: 'success',
        offset: 70
      })
      router.push({
        name: '主页'
      })
    } else {
      ElNotification({
        title: '失败',
        message: fb.msg,
        type: 'error',
        offset: 70
      })
    }
    loading.value = false
  }
}

const GoLogin = () => {
  router.push({
    name: '登录'
  })
}
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    height: 117px;
    font-weight: bold;
    font-size: 24px;
  }
  .el-form {
    width: 57%;
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
