<template>
  <div class="center flex-col">
    <el-image
      class="boostIcon"
      :src="props.src"
      :style="{ width: props.size + 'px' }"
    ></el-image>
    <span class="boostName" v-if="props.name !== ''">
      {{ props.name }}
    </span>
    <span class="boostName" v-if="props.duration !== null">
      {{ props.duration }}天
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  size: {
    type: Number,
    default: 50
  },
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: null
  }
})
</script>

<style lang="scss" scoped></style>
