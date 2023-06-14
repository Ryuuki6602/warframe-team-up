<template>
  <el-row :gutter="20" class="options">
    <el-col
      :span="isIndex ? 6 : sban(route)"
      v-for="(route, andex) in childRoute"
      style="transition: all 0.32s ease-out"
    >
      <el-card
        class="relic_card"
        :shadow="currentRoutePath == route.path ? 'always' : 'never'"
      >
        {{ route.name }}
      </el-card>
    </el-col>
  </el-row>
  <div v-if="isIndex">Hi,这是水经验组队的主页</div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const _useRouter = useRouter()

const sban = (route: any) => {
  if (currentRoutePath.value == route.path) {
    return 8
  } else {
    return 4
  }
}
const isIndex = computed(() => {
  return currentRoutePath.value == '/exp'
})

const matchedRoute = computed(() => {
  return _useRouter.currentRoute.value.matched[2]
})

const currentRoutePath = computed(() => {
  return _useRouter.currentRoute.value.path
})

const childRoute = computed(() => {
  return matchedRoute.value.children
})
const teamList = reactive([])
</script>

<style lang="scss" scoped>
.options {
  padding: 1rem 0;
}
</style>
