<template>
  <div>页面正在施工中，加入开发者交流Q群获取详细信息：376878510</div>
  <div>或点击<span @click="a" class="route">此处</span>查看开发日志</div>
</template>

<script setup lang="ts">
import router from '@routes'
const a = () => {
  router.push({
    name: '开发日志'
  })
}
</script>

<style lang="scss" scoped>
.route {
  font: 600;
  color: var(--el-text-color-primary);
  font-size: 1.2rem;
  &:hover {
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
</style>
