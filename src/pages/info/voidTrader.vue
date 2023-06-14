<template>
  <ryu-skeleton
    :loading="_statusStore.isDetailPanelLoading()"
    :hasResult="_statusStore.getVoidTraderInventory().length > 0"
  >
    <template #content>
      <el-scrollbar height="500px">
        <el-row>
          <el-col
            :span="6"
            v-for="item in _statusStore.getVoidTraderInventory()"
            class="item_wrapper"
          >
            <div class="item_image">
              <previewItem :src="src(item.item)" :size="150"></previewItem>
            </div>
            <div class="item_name">
              {{ item.item }}
            </div>
            <div class="flex justify-between mt-8px">
              <span class="center mr-7px">
                <el-image
                  src="https://www.neorae.cn/data/image/OrokinDucats.webp"
                  class="w-30px"
                ></el-image>
                <span>{{ item.ducats }}</span>
              </span>
              <span class="center ml-7px">
                <el-image
                  src="https://www.neorae.cn/data/image/Credits.webp"
                  class="w-30px"
                ></el-image>
                <span>{{ item.credits }}</span>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </template>
  </ryu-skeleton>
</template>

<script setup lang="ts">
import { statusStore } from '@store'
const _statusStore = statusStore()

const src = (item: string) => {
  return (
    'https://www.neorae.cn/data/image/Kiteer/' + removeBlank(item) + '.webp'
  )
}

const removeBlank = (str: string) => {
  return str.split(' ').join('').split(`'`).join('').split('-').join('')
}
</script>

<style lang="scss" scoped>
.item_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
    .item_image {
      transform: scale(1.05);
    }
    .item_name {
      color: var(--el-color-primary);
    }
  }
  .item_image {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    max-height: 205px;
    transition: all 0.22s ease-in-out;
  }
}
.item_name {
  font-size: 1.1rem;
  margin-top: 10px;
  font-weight: 500;
  transition: all 0.22s ease-in-out;
  white-space: nowrap;
}
</style>
