<template>
  <div class="form">
    <div class="title">
      {{
        _authStore.getTip().trim() != ''
          ? _authStore.getTip()
          : '登录到Warframe Team Up'
      }}
    </div>
    <el-form
      ref="LoginFormRef"
      :model="LoginForm"
      :rules="LoginFormRules"
      label-position="top"
    >
      <el-form-item label="电子邮件" prop="email">
        <el-input
          v-model="LoginForm.email"
          @input="resetValidateWhenInput(1)"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        @input="resetValidateWhenInput(2)"
      >
        <el-input v-model="LoginForm.password" show-password />
      </el-form-item>
      <el-form-item>
        <div class="flex justify-between w-100%">
          <div>
            <el-button type="primary" @click="login(LoginFormRef)"
              >登录</el-button
            >
            <el-button type="primary" text @click="GoRegister">
              新用户注册
            </el-button>
          </div>
          <el-button type="primary" text @click="GoRetrive">
            我忘记了我的密码
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '@routes'
import { userLogin } from '@api/account'
import { ElNotification } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { loginFormModel } from '@/models'
import { authStore } from '@store'
const _authStore = authStore()

const LoginForm = reactive<loginFormModel>({
  email: '',
  password: '',
  timestamp: new Date().getTime()
})

const LoginFormRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 2, max: 20, message: '密码长度在2到20个字符', trigger: 'blur' }
  ]
})

const GoRegister = () => {
  router.push({
    name: '注册'
  })
}

const GoRetrive = () => {
  router.push({
    name: '找回密码'
  })
}

const LoginFormRef = ref<FormInstance>()
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const fb = await userLogin(LoginForm)
      if (fb.status === '200') {
        router.push({
          name: '主页'
        })
      } else {
        ElNotification({
          title: '提示',
          message: fb.msg,
          type: 'info',
          offset: 70
        })
      }
      _authStore.removeTip()
    } else {
      ElNotification({
        title: '提示',
        message: '请检查信息是否填写正确',
        type: 'info',
        offset: 70
      })
      return false
    }
  })
}

const resetValidateWhenInput = (index: number) => {
  switch (index) {
    case 1:
      LoginFormRef.value?.clearValidate('email')
      break
    case 2:
      LoginFormRef.value?.clearValidate('password')
      break
  }
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
