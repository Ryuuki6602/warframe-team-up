<template>
  <el-empty
    :image="props.image"
    :description="props.description"
    :image-size="size"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: 'https://www.neorae.cn/data/image/empty.svg'
  },
  size: {
    type: Number,
    default: 200
  },
  description: {
    type: String,
    default: '空'
  }
})
</script>

<style lang="scss" scoped></style>
