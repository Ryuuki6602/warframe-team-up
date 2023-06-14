<template>
  <div v-if="visible">
    <div>欢迎来到Warframe Team Up</div>
    <div>这里是常用组队界面</div>
  </div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import router from '@routes'

const visible = computed(() => {
  return router.currentRoute.value.path === '/introduction/usual'
})
</script>

<style lang="scss" scoped></style>
