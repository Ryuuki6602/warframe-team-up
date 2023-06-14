<template>
  <div
    v-if="currentRoutePath == '/introduction/developer'"
    class="flex justify-around h-700px items-center"
  >
    <div
      class="w-400px flex-col h-500px center text-size-[1.5rem] wrapper"
      @click="goLog"
    >
      <el-image
        class="h-100% icon"
        fit="cover"
        src="https://www.neorae.cn/data/image/me/me.jpg"
      ></el-image>
      <span class="mt-20px text-size-[1.3rem] text">开发日志</span>
    </div>
    <div
      class="w-400px flex-col h-500px center text-size-[1.5rem] wrapper"
      @click="goIssue"
    >
      <el-image
        class="h-100% icon"
        src="https://www.neorae.cn/data/image/me/sphenoid.png"
      ></el-image>
      <span class="mt-20px text-size-[1.3rem] text">建议&反馈</span>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import router from '@routes'
const _useRouter = useRouter()

const currentRoutePath = computed(() => {
  return _useRouter.currentRoute.value.path
})

const goLog = () => {
  router.push({
    path: '/log'
  })
}

const goIssue = () => {
  router.push({
    path: '/issue'
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  .icon {
    opacity: 0.7;
    transition: all 0.22s ease-in-out;
  }
  .text {
    transition: all 0.22s ease-in-out;
  }
  &:hover {
    .icon {
      opacity: 1;
      transform: scale(1.05);
    }
    .text {
      color: var(--el-color-primary);
    }
  }
}
</style>
