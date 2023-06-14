<template>
  <Icon
    :icon="props.icon"
    :width="props.size"
    :height="props.size"
    class="mr-5px"
  ></Icon>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'material-symbols:circle-outline'
  },
  size: {
    type: Number,
    default: 20
  }
})
</script>

<style lang="scss" scoped></style>
