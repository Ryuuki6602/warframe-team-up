<template>
  <SvgIcon
    :name="isDark ? props.focus + 'Light' : props.focus"
    :style="{ width: props.size + 'px', height: props.size + 'px' }"
    class="focusIcon"
  ></SvgIcon>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const props = defineProps({
  focus: {
    type: String,
    default: 'FocusLens'
  },
  size: {
    type: Number,
    default: 30
  }
})
</script>

<style lang="scss" scoped>
.focusIcon {
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
}
</style>
