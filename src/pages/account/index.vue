<template>
  <div class="ryu_header">
    <el-row class="h-100% center">
      <el-col :span="8">
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
      <el-col :span="8"> </el-col>
      <el-col :span="8" class="center">
        <el-switch
          v-model="isDark"
          active-color="#000000"
          active-icon="i-ep:moon"
          inactive-icon="i-ep:sunrise"
          inline-prompt
          @change="toggleDark"
        ></el-switch
      ></el-col>
    </el-row>
  </div>
  <div class="wrapper">
    <video src="@video/login.mp4" loop autoplay muted id="video"></video>
    <RouterView />
    <div class="copyright">@Aniberzzzz&nbsp;版权所有</div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@routes'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const GoHomePage = () => {
  router.push({
    name: '主页'
  })
}
</script>

<style lang="scss" scoped>
.ryu_header {
  height: 67px;
  line-height: 67px;
  width: 100%;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
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
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100vh - 67px);
  overflow: hidden;
  position: relative;
  #video {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  .copyright {
    height: 30px;
    line-height: 30px;
    width: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: center;
  }
}
</style>
