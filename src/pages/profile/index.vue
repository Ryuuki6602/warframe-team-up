<template>
  <el-container>
    <el-header class="clearStyle">
      <ryu-header></ryu-header>
    </el-header>

    <el-main class="ryu_main">
      <div class="wrapper">
        <img src="@image/ivara_banner.jpg" class="banner" />
        <div class="cover"></div>
      </div>
      <div class="profile">
        <div class="content">
          <el-row class="profile_header">
            <el-col :span="4">
              <el-avatar
                :src="_authStore.getAvatar()"
                class="avatar"
                @click="reviseAvatar"
                fit="cover"
              ></el-avatar>
            </el-col>
            <el-col :span="20" class="flex items-center">
              <el-row class="w-100%">
                <el-col :span="24">
                  <div class="flex items-center">
                    <el-form
                      v-if="nicknameEditState"
                      ref="nicknameFormRef"
                      :rules="nicknameFormRules"
                      :model="nicknameForm"
                      @keyup.esc="toggleNicknameEdit(false)"
                      @submit.prevent="submitNicknameForm(nicknameFormRef)"
                    >
                      <el-form-item
                        prop="nickname"
                        style="margin-top: 17px; width: 267px"
                      >
                        <el-input
                          v-model="nicknameForm.nickname"
                          placeholder="新用户名"
                          ref="nicknameInputRef"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="nickname" v-else>
                      {{ _authStore.getNickname() }}
                    </div>
                    <div
                      v-if="nicknameEditState"
                      class="i-ep:check text-size-[2rem] ml-15px mt-2px hover-color-blue cursor-pointer"
                      @click="submitNicknameForm(nicknameFormRef)"
                    ></div>
                    <div
                      v-else
                      class="i-ep-edit text-size-[2rem] ml-15px mt-2px hover-color-blue cursor-pointer"
                      @click="toggleNicknameEdit(true)"
                    ></div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="description">
                    {{
                      _authStore.getDescription() == ''
                        ? '这个人很懒，什么都没写'
                        : _authStore.getDescription()
                    }}
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="profile_body">
            <el-col :span="24">
              <RouterView></RouterView>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>

    <el-footer class="clearStyle">
      <ryu-footer></ryu-footer>
    </el-footer>
  </el-container>
  <el-dialog v-model="reviseAvatarDialog">
    <template #header> 修改头像 </template>
    <div class="seasor">
      <el-avatar
        :src="_authStore.getAvatar()"
        class="avatar"
        shape="square"
        @click="reviseAvatar"
      ></el-avatar>
      <div class="mask"></div>
      <canvas id="draw"></canvas>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import ryuFooter from '@components/ryu-footer.vue'
import ryuHeader from '@components/ryu-header.vue'
import router from '@routes'
import { updateNickname } from '@api/user'
import { validateUserAccess } from '@api/account'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules, InputInstance } from 'element-plus'
import { reactive, ref, onMounted, nextTick, computed } from 'vue'
import { nicknameFormModel } from '@/models'
import { authStore } from '@store'

const _authStore = authStore()

const nicknameFormRef = ref<FormInstance>()
const nicknameInputRef = ref<InputInstance>()
const nicknameFormRules = reactive<FormRules>({
  nickname: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change']
    },
    {
      min: 1,
      max: 20,
      message: '长度在 1 到 20 个字符',
      trigger: ['blur', 'change']
    }
  ]
})

const nicknameForm = reactive<nicknameFormModel>({
  nickname: '',
  email: ''
})

const nicknameEditState = ref<boolean>(false)
const toggleNicknameEdit = (state: boolean) => {
  nicknameEditState.value = state
  nicknameForm.email = _authStore.getEmail()
  nextTick(() => {
    nicknameForm.nickname = _authStore.getNickname()
    nicknameInputRef.value!.focus()
  })
}

const submitNicknameForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const fb = await updateNickname(nicknameForm)
      if (fb.status === '200') {
        nicknameEditState.value = false
        _authStore.setNickname(nicknameForm.nickname)
        nicknameFormRef.value!.resetFields()
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

const validateUser = async () => {
  const fb = await validateUserAccess()
  if (fb.status === '200') {
    _authStore.setStatus(fb.res.isTokenValid, fb.res.user)
  } else {
    router.push({
      name: '登录'
    })
  }
}

const reviseAvatarDialog = ref<boolean>(false)
const reviseAvatar = () => {
  reviseAvatarDialog.value = true
}

onMounted(() => {
  validateUser()
})
</script>

<style lang="scss" scoped>
.ryu_main {
  width: 100%;

  .wrapper {
    height: 467px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .banner {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cover {
      position: absolute;
      bottom: 0px;
      left: 0px;
      background-color: var(--el-bg-color-page);
      height: 47px;
      width: 100%;
      opacity: 0.67;
    }
  }

  .profile {
    width: 100%;
    height: 100%;
    min-height: 367px;
    display: flex;
    justify-content: center;

    .nickname {
      font-size: 2.1rem;
      font-weight: 600;
      padding: 10px 0;
      color: var(--el-text-color-primary);

      &:hover {
        cursor: pointer;
        color: var(--ryu-text-color-primary);
      }
    }

    .description {
      font-size: 1.1rem;
      font-weight: 400;
      padding: 10px 0;
      color: var(--el-text-color-secondary);
    }

    .content {
      width: 67%;
      height: 100%;
      transform: translateY(-100px);

      .profile_header {
        width: 100%;
        display: flex;
      }

      .profile_body {
        padding: 0 20px;
        margin: 20px 0;
      }
    }
  }
}
.seasor {
  position: relative;
  width: 200px;
  height: 200px;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000053;
  }
}
.avatar {
  width: 200px;
  height: 200px;
  &:hover {
    cursor: pointer;
  }
}
:deep(.el-main) {
  padding: 0;
}
</style>
