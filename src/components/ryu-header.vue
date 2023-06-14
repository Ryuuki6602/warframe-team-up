<template>
  <div class="ryu_header">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="logo" @click="GoHomePage">
          <el-image
            :src="
              isDark
                ? 'https://www.neorae.cn/data/image/warframeLight.svg'
                : 'https://www.neorae.cn/data/image/warframe.svg'
            "
            fit="contain"
            class="w-55px"
          ></el-image>
          <div class="ml-10px">
            <div class="text-xl select-none text">Warframe</div>
            <div class="text-xl select-none text">Team&nbsp;Up</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12"> </el-col>
      <el-col :span="6" class="user">
        <div class="status">
          <el-popover
            v-if="_authStore.checkToken()"
            :width="300"
            placement="bottom"
            trigger="hover"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <el-avatar
                shape="square"
                :src="_authStore.getAvatar()"
                fit="cover"
                size="large"
              />
            </template>
            <template #default>
              <el-row>
                <el-col :span="24" class="popout_header">
                  <el-avatar
                    shape="square"
                    :src="_authStore.getAvatar()"
                    object-fit="cover"
                    size="large"
                  />
                  <div class="flex-1">
                    <div class="nickname">{{ _authStore.getNickname() }}</div>
                    <div class="description">
                      {{ _authStore.getDescription() }}
                    </div>
                  </div>
                </el-col>
                <el-col :span="24" class="action_wrapper">
                  <el-row>
                    <el-col :span="12" class="center">
                      <div @click="GoProfile" class="options">
                        <div class="i-ant-design:profile-outlined icon"></div>
                        <span class="text">账户信息</span>
                      </div>
                    </el-col>
                    <el-col :span="12" class="center">
                      <div @click="quit" class="options">
                        <div class="i-ant-design:poweroff-outlined icon"></div>
                        <span class="text">退出登录</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24" class="action_wrapper">
                  <div class="grid grid-rows-1 grid-cols-5 center">
                    <boost-icon
                      v-for="(boost, index) in boostInactivated"
                      @mouseenter="setHoverBoost(boost)"
                      :src="boost.icon"
                      class="boostIcon"
                      :class="{
                        active: MyBoosts.find(
                          (item:any) => item.description == boost.description
                        )
                      }"
                      @click="
                        MyBoosts.find(
                          (item: any) => item.description == boost.description
                        )
                          ? deactivateBoosts(boost)
                          : activateBoosts(boost)
                      "
                    ></boost-icon>
                  </div>
                </el-col>
              </el-row>
            </template>
          </el-popover>

          <el-dropdown v-else>
            <div class="avatar">
              <el-avatar
                shape="square"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              />
              <div class="ml-10px">尚未登录</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="GoLogin">
                  <div class="i-ant-design:profile-outlined mr-5px"></div>
                  <span>登录</span>
                </el-dropdown-item>
                <el-dropdown-item @click="GoRegister">
                  <div class="i-ant-design:logout-outlined mr-5px"></div>
                  <span>注册</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-switch
            v-model="isDark"
            active-color="#4c4c4c"
            :active-icon="Moonlight"
            :inactive-icon="Sunrise"
            inline-prompt
            size="large"
            @change="toggleDark"
          ></el-switch>
          <ryu-state></ryu-state>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@routes'
import { Logout } from '@api/account'
import { authStore } from '@store'
import ryuState from './ryuState.vue'
import Sunrise from './mini/sunrise.vue'
import Moonlight from './mini/moonlight.vue'
import { boostInactivated } from '@common'
import { ref, reactive, onMounted } from 'vue'
import {
  activateBoost,
  deactivateBoost,
  getAccountBoostListByUUID
} from '@api/account'

const hoverBoost = reactive<any>({})
const setHoverBoost = (boost: any) => {
  hoverBoost.description = boost.description
  hoverBoost.duration = boost.duration
}

const MyBoosts = ref<any>([])
const getAccountBoosts = async () => {
  const fb = await getAccountBoostListByUUID()
  MyBoosts.value = fb.res
}

const activateBoosts = async (boost: any) => {
  boost.enabled = 1
  await activateBoost(boost)
  MyBoosts.value.push(boost)
}

const deactivateBoosts = async (boost: any) => {
  boost.enabled = 0
  await deactivateBoost(boost)
  MyBoosts.value.splice(
    MyBoosts.value.findIndex(
      (item: any) =>
        item.description == boost.description && item.duration == boost.duration
    ),
    1
  )
}

const _authStore = authStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const GoLogin = () => {
  router.push({
    name: '登录'
  })
}

const GoRegister = () => {
  router.push({
    name: '注册'
  })
}
const quit = async () => {
  _authStore.clearStatus()
  await Logout()
  router.push({
    name: '登录'
  })
}

const GoProfile = () => {
  router.push({
    name: '账户信息'
  })
}

const GoHomePage = () => {
  router.push({
    name: '主页'
  })
}

onMounted(() => {
  getAccountBoosts()
})
</script>

<style lang="scss" scoped>
.ryu_header {
  height: 67px;
  line-height: 67px;
  width: 100%;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
  position: fixed;
  top: 0;
  z-index: 99;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      color: var(--el-text-color-primary);
      font-weight: 600;
    }

    &:hover {
      cursor: pointer;

      .text {
        color: var(--ryu-text-color-primary);
      }
    }
  }
  .status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
    width: 50%;
    height: 100%;
  }
  .avatar {
    display: flex;
    align-items: center;
  }
}
.popout_header {
  display: flex;
  width: 100%;
  .nickname {
    flex: 1;
    padding: 0 13px;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--el-text-color-primary);
  }
  .description {
    flex: 1;
    padding: 0 13px;
    font-size: 0.88rem;
    color: var(--el-text-color-secondary);
  }
}
.action_wrapper {
  margin-top: 13px;
  padding-top: 13px;
  border-top: 1px solid rgba(116, 116, 116, 0.3);
  .options {
    &:hover {
      cursor: pointer;
      background-color: var(--el-bg-color-light);
      .text {
        color: var(--el-color-primary);
      }
      .icon {
        color: var(--el-color-primary);
      }
    }
    .text {
      color: var(--el-text-color-primary);
    }
    .icon {
      font-size: 1.5rem;
      margin: auto;

      color: var(--el-text-color-primary);
    }
  }
}
.boostIcon {
  opacity: 0.4;
  transition: all 0.22s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}
.active {
  opacity: 1;
}
</style>
