<template>
  <span v-if="taskStatus == null">未知notify</span>
  <div v-else>
    <div class="title">{{ props.message }}</div>
    <div v-if="taskStatus" class="context">
      <span>数据已更新</span>
      <div class="i-ep-check icon"></div>
    </div>
    <div v-else class="context">
      <div>正在更新数据...</div>
      <div class="i-ep-refresh inline-flex icon rotate"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, onMounted, ref } from 'vue'
import { statusStore } from '@store'
import { notifyModel } from '@/models'
const _statusStore = statusStore()

const taskStatus = computed(() => {
  return _statusStore.isTaskCompleted(props.notifier.timestamp)
})

const props = defineProps({
  message: {
    type: String
  },
  notifier: <notifyModel>{
    type: Object
  }
})

const emits = defineEmits(['refreshData'])
onMounted(() => {
  emits('refreshData')
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.1rem;
  color: var(--el-text-color-primary);
  padding: 5px 0;
  font-weight: 600;
}

.context {
  display: flex;
  align-items: center;
}
.icon {
  font-size: 1.3rem;
  margin-left: 5px;
}
.rotate {
  animation: rotate 1.5s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
