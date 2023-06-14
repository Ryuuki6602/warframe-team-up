<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="copied ? '复制成功' : '复制'"
    placement="bottom"
  >
    <el-button :icon="icon" @click="copyMessage(undefined)"> </el-button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  }
})

const copied = ref(false)

const icon = computed(() => {
  return copied.value ? 'i-ep-check' : 'i-ep-document-copy'
})

const copyMessage = (callback?: Function) => {
  if (props.creator == '') {
    callback && callback(false, '缺少创建者信息')
  } else {
    navigator.clipboard
      .writeText('/w ' + props.creator + ' ' + props.message)
      .then((result: any) => {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 3000)
        callback && callback(true, '复制成功')
        return result
      })
      .catch((err: any) => {
        return err
      })
  }
}
</script>

<style lang="scss" scoped></style>
