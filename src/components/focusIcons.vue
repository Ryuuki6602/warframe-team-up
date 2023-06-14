<template>
  <div
    v-for="focus in focusList"
    class="focus_wrapper"
    :class="{ inactive: props.modelValue !== focus.code }"
    @click="$emit('update:modelValue', focus.code)"
  >
    <SvgIcon
      :name="isDark ? focus.name + 'Light' : focus.name"
      class="focus_icon"
    ></SvgIcon>
    <span class="focus_name">{{ focus.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { focus as focusList } from '../common'
import SvgIcon from './SvgIcon.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  width: {
    type: Number,
    default: 40
  }
})
</script>

<style lang="scss" scoped>
.focus_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    .focus_icon {
      transform: scale(1.1);
    }
    .focus_name {
      color: var(--el-color-primary);
    }
  }
  .focus_icon {
    width: 50px;
    height: 50px;
  }
  .focus_name {
    font-size: 12px;
    height: 10px;
    line-height: 10px;
    color: var(--ryu-text-color-primary);
  }
}
.inactive {
  .focus_icon {
    opacity: 0.2;
  }
  .focus_name {
    color: var(--ryu-text-color-thin);
  }
}
</style>
