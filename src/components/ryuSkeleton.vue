<template>
  <el-skeleton :rows="5" animated :loading="props.loading">
    <template #template>
      <div style="padding: 14px">
        <el-skeleton-item
          v-for="item in props.line"
          variant="h3"
          class="skeleton"
        />
      </div>
    </template>
    <slot name="content" v-if="props.hasResult"></slot>
    <slot v-else>
      <ryu-empty
        :description="props.description"
        :image="props.image"
      ></ryu-empty>
    </slot>
  </el-skeleton>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: '空'
  },
  line: {
    type: Number,
    default: 3
  },
  image: {
    type: String,
    default: 'https://www.neorae.cn/data/image/empty.svg'
  },
  hasResult: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 167px;
}
.skeleton:nth-child(n + 2) {
  margin-top: 20px;
}
</style>
