<template>
  <el-image
    v-if="srcAvailable"
    :src="props.src"
    :style="{ width: props.size + 'px' }"
  ></el-image>
  <ryu-empty v-else description="未找到图像" :size="150"></ryu-empty>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  src: {
    type: String,
    default: null
  },
  size: {
    type: Number,
    default: 100
  }
})
const srcAvailable = computed(() => {
  return props.src !== null && props.src !== ''
})
</script>

<style lang="scss" scoped></style>
