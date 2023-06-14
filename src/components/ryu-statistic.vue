<template>
  <div class="ryu_statistic">
    <div class="ryu_statistic_title">{{ props.title }}</div>
    <div class="ryu_statistic_body">
      <span v-if="props.isEmpty" class="ryu_statistic_loading">
        <div class="i-ep-loading text-size-[1.7rem] mr-5px rotate"></div>
        <span class="loading_text">加载中</span>
      </span>
      <div v-else class="ryu_statistic_wrapper">
        <div v-if="_statusStore.findCycleStatus(props.cycleId)" class="ryu_statistic_loading">
          <div class="i-ep-loading text-size-[1.7rem] mr-5px rotate"></div>
          <span class="loading_text">正在更新信息</span>
        </div>
        <div v-else>
          <div class="ryu_statistic_content">{{ props.value }}</div>

          <el-countdown class="countdown" @finish="() => $emit('finish')" :format="
            isSameDay(props.expiry) ? ' H小时m分钟s秒' : 'D[天] H小时m分s秒'
          " :value="props.expiry" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isSameDay } from '@utils/DateUtil'
import { statusStore } from '@store'
import { watch } from 'vue'
const _statusStore = statusStore()
const props = defineProps({
  cycleId: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  expiry: {
    type: Number,
    default: null
  }
})

defineEmits(['finish'])
</script>

<style lang="scss" scoped>
.ryu_statistic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 100%;
  margin: 20px 0;

  &:hover {
    cursor: pointer;
  }

  .ryu_statistic_title {
    width: 100%;
    font-size: 0.88rem;
    color: var(--el-text-color-secondary);
    text-align: center;
  }

  .ryu_statistic_body {
    width: 100%;
    height: 100%;
    text-align: center;

    &:hover {
      .ryu_statistic_content {
        color: var(--el-text-color-primary);
      }
    }

    .ryu_statistic_loading {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ryu_statistic_content {
      font-size: 1.3rem;
      color: var(--el-text-color-secondary);
      font-weight: 600;
      margin: 10px 0;
    }

    .countdown {
      color: var(--el-text-color-primary);
    }
  }
}

.loading_text {
  color: var(--el-text-color-secondary);
}

.rotate {
  animation: rotate 3.3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
