<template>
  <div class="form">
    <div class="title">注册到Warframe Team Up</div>
    <el-form
      v-if="registerStatus.registered"
      ref="nicknameFormRef"
      :model="nicknameForm"
      :rules="nicknameFormRule"
      label-position="top"
    >
      <el-form-item label="warframe用户名" prop="nickname">
        <el-input
          ref="emailInputRef"
          v-model="nicknameForm.nickname"
          placeholder="游戏内的名字，用于组队，请认真填写"
        />
        <div class="tip">
          <div class="i-ep-info-filled"></div>
          <div>可随时在个人中心修改</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm(nicknameFormRef)">
          完成
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="registerFormRule"
      label-position="top"
      v-else
    >
      <el-form-item label="电子邮件" prop="email">
        <el-input ref="emailInputRef" v-model="registerForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" show-password />
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="emailCode"
        v-if="registerStatus.emailRetrieved"
      >
        <el-input v-model="registerForm.emailCode" />
      </el-form-item>
      <el-form-item v-if="state">
        <el-button type="primary" @click="register(registerFormRef)">
          确认注册
        </el-button>
      </el-form-item>
      <el-form-item v-else>
        <div v-if="registerStatus.emailRetrieved">
          <el-button @click="GoEmail" icon="i-ant-design:mail-outlined">
            前往邮箱
          </el-button>
          <el-button
            v-if="registerStatus.cooldownCompleted"
            class="cooldown again"
            text
            @click="FetchEmailCode(registerFormRef)"
            :loading="registerStatus.sendingEmail"
          >
            {{ registerStatus.sendingEmail ? '发送中' : '重新获取' }}
          </el-button>
          <span class="cooldown" v-else>
            {{ registerStatus.cooldown }}秒后可重新获取
          </span>
        </div>

        <el-button
          v-else
          type="primary"
          @click="FetchEmailCode(registerFormRef)"
          :loading="registerStatus.sendingEmail"
        >
          {{ registerStatus.sendingEmail ? '发送中' : '发送验证码' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import {
  getEmailCode,
  userRegister,
  validateRegisterEmail,
  validateEmailCode
} from '@api/account'
import { updateNickname } from '@api/user'
import { registerFormModel } from '@/models'
import router from '@/routes'
import { getEmailSuffix } from '@utils/EmailUtil'

const registerStatus = reactive<any>({
  registered: false,
  sendingEmail: false,
  emailRetrieved: false,
  cooldown: 5,
  cooldownCompleted: false
})

const registerForm = reactive<registerFormModel>({
  email: '',
  password: '',
  emailCode: '',
  nickname: '',
  timestamp: new Date().getTime()
})

const registerFormRef = ref<FormInstance>()

const emailValidator = (rule: any, value: string, callback: any) => {
  validateRegisterEmail(registerForm.email)
    .then((result: any) => {
      console.log(result)

      if (result.res) {
        callback()
      } else {
        callback(new Error('邮箱已被注册'))
      }
    })
    .catch((err: any) => {})
}

const emailCodeValidator = (rule: any, value: string, callback: any) => {
  if (value !== '') {
    if (value.length > 6) {
      callback(new Error('验证码长度为6位'))
    } else if (value.length == 6) {
      validateEmailCode(registerForm)
        .then((result: any) => {
          if (!result.res) {
            callback(new Error('验证码错误'))
          } else {
            callback()
          }
        })
        .catch((err: any) => {})
    }
  } else {
    callback()
  }
}

const registerFormRule = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
    { required: true, validator: emailValidator, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    {
      min: 1,
      max: 20,
      message: '密码长度在1到20个字符',
      trigger: ['blur', 'change']
    }
  ],
  emailCode: [{ validator: emailCodeValidator }]
})

const state = computed(() => {
  return (
    registerForm.email !== '' &&
    registerForm.password !== '' &&
    registerForm.emailCode !== ''
  )
})

const emailInputRef = ref(null)
const autoFocus = () => {
  nextTick(() => {
    emailInputRef.value?.focus()
  })
}

const interval = ref<number>(-1)
const FetchEmailCode = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      registerStatus.cooldownCompleted = false
      registerStatus.sendingEmail = true
      const fb = await getEmailCode(registerForm.email)
      if (fb.status === '200') {
        interval.value = window.setInterval(() => {
          registerStatus.cooldown--
          if (registerStatus.cooldown === 0) {
            clearInterval(interval.value)
            registerStatus.cooldown = 30
            registerStatus.cooldownCompleted = true
          }
        }, 1000)
        ElNotification({
          title: '成功',
          message: '验证码已发送至邮箱',
          type: 'success',
          offset: 70
        })
        registerStatus.sendingEmail = false
        registerStatus.emailRetrieved = true
      } else {
        ElNotification({
          title: '提示',
          message: fb.msg,
          type: 'info',
          offset: 70
        })
        registerStatus.sendingEmail = false
      }
    }
  })
}

const register = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      const fb = await userRegister(registerForm)
      if (fb.status === '200') {
        nicknameForm.email = registerForm.email
        registerStatus.registered = true
      } else {
        ElNotification({
          title: '提示',
          message: fb.msg,
          type: 'info',
          offset: 70
        })
      }
    } else {
      return false
    }
  })
}

interface nicknameFormModel {
  email: string
  nickname: string
}

const nicknameForm = reactive<nicknameFormModel>({
  email: '',
  nickname: ''
})

const nicknameFormRule = reactive<FormRules>({
  nickname: [
    { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
    {
      min: 2,
      max: 20,
      message: '昵称长度在2到20个字符',
      trigger: ['blur', 'change']
    }
  ]
})

const nicknameFormRef = ref(null)

const confirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const fb = await updateNickname(nicknameForm)
      if (fb.status === '200') {
        nicknameForm.email = registerForm.email
        router.push({
          name: '主页'
        })
        ElNotification({
          title: '欢迎',
          message: '注册成功',
          type: 'success',
          offset: 70
        })
      } else {
        ElNotification({
          title: '提示',
          message: fb.msg,
          type: 'info',
          offset: 70
        })
      }
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

const GoEmail = () => {
  window.open('https://mail.' + getEmailSuffix(registerForm.email), '_blank')
}
onMounted(() => {
  autoFocus()
})
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

  .info {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    top: 30px;

    div {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  .el-form {
    width: 57%;

    .el-form-item {
      margin-bottom: 20px;
    }
  }
}

.cooldown {
  margin-left: 20px;
  color: var(--el-text-color-secondary);
}
.again {
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
