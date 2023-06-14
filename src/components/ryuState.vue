<template>
  <div
    ref="stateRef"
    style="display: inline-flex"
    :class="`${currentState.className}`"
  >
    <el-dropdown :hide-on-click="false" :disabled="!disabled">
      <div class="state" :class="{ loadingText: status.switchStateLoading }">
        <div
          class="icon i-ep:loading none display_icon"
          :class="{
            rotate: status.switchStateLoading
          }"
        ></div>
        <ryu-icon
          :class="{ block: !status.switchStateLoading }"
          :icon="currentState.icon ? currentState.icon : 'ep:question'"
          class="icon none display_icon"
        ></ryu-icon>
        <div id="status_text">
          {{ status.switchStateLoading ? ' 切换中' : currentState.text }}
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in states"
            @click="switchState(index)"
            :disabled="item.state == currentState.state"
          >
            <div
              class="wrapper"
              :class="{ active: currentState.state == index }"
            >
              <div
                class="icon i-ep:loading none"
                :class="{
                  rotate:
                    status.switchStateLoading && currentState.state == index
                }"
              ></div>
              <ryu-icon
                class="icon"
                :class="{
                  block: currentState.state != index,
                  none: status.switchStateLoading
                }"
                :icon="currentState.state == index ? 'ep:check' : item.icon"
              ></ryu-icon>
              <span class="text">{{ item.text }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { authStore } from '@store'
import { computed, reactive, watchEffect, ref } from 'vue'
import { updateMyState } from '@api/user'
import { states } from '@common'

interface stateModel extends Object {
  state: number
  text: string
  icon: string
  active: boolean
  className: string
}

const disabled = computed(() => {
  return _authStore.getState() > 0 || _authStore.getState() == 0
})

const status = reactive({
  switchStateLoading: false
})

const _authStore = authStore()

const stateRef = ref<HTMLDivElement>()
const currentState = computed(() => {
  const state: stateModel = states.find(
    (item: stateModel) => item.state == _authStore.getState()
  )
  if (state?.constructor === Object) {
    return state
  } else {
    return '加载中...'
  }
})

const switchState = (index: number) => {
  status.switchStateLoading = true
  updateState(index, (result: any) => {
    if (result) {
      status.switchStateLoading = false
      return true
    } else {
      _authStore.updateStatus(currentState.state)
      status.switchStateLoading = false
    }
  })
}

const updateState = async (index: number, callback: Function) => {
  _authStore.updateStatus(index)
  const fb = await updateMyState(index)
  callback && callback(fb.res)
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    .text {
      color: var(--el-color-primary);
    }
    .icon {
      color: var(--el-color-primary);
    }
  }
  .icon {
    font-size: 1.1rem;
  }
}
.active {
  .icon {
    color: var(--el-color-primary);
    font-size: 1.1rem;
  }
  .text {
    color: var(--el-color-primary);
  }
}

.none {
  display: none;
}
.block {
  display: block;
}

.rotate {
  display: block;
  animation: rotate 0.4s ease-in-out infinite;
}
.loadingText {
  opacity: 0.88;
  color: var(--el-text-color-secondary);
}
.state {
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  min-width: 60px;
  min-height: 50px;
  .icon {
    font-size: 1.25rem;
  }
}

.invisibleState {
  #status_text {
    color: var(--el-text-color-secondary);
  }
  .display_icon {
    color: var(--el-text-color-secondary);
  }
}
.onlineState {
  #status_text {
    color: var(--el-color-primary);
  }
  .display_icon {
    color: var(--el-color-primary);
  }
}

.onlineInGameState {
  #status_text {
    color: var(--el-color-success);
  }
  .display_icon {
    color: var(--el-color-success);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(250deg);
  }
}
</style>
