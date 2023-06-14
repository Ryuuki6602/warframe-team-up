<template>
  <div class="relic">
    <el-image :style="{
      height: props.size ? props.size + 'px' : 'auto',
      width: props.size ? props.size + 'px' : 'auto'
    }" :src="`https://www.neorae.cn/data/image/relics/${props.tierNum}-${props.level}.webp`" />
    <div class="center flex-col" v-if="props.enableName">
      <span class="prefix"> {{ props.levelName }}&nbsp; </span>
      <span class="name">{{ props.tier }}&nbsp;{{ props.code }}&nbsp;遗物</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tierNum: {
    type: Number,
    required: false
  },
  level: {
    type: Number,
    required: false
  },
  levelName: {
    type: String,
    required: false
  },
  code: {
    type: String,
    required: false,
    default: null
  },
  tier: {
    type: String,
    required: false,
    default: null
  },
  size: {
    type: Number,
    default: 120
  },
  enableName: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.prefix {
  font-size: 0.86rem;
  color: var(--el-text-color-secondary);
}

.name {
  margin-top: 5px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.el-image {
  transition: all 0.16s ease-in-out;

  &:hover {
    cursor: pointer;
  }
}

.relic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-image {
    width: 100%;
    border-radius: 5px;
  }
}
</style>
