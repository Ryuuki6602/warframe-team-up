<template>
  <div
    class="center flex-col"
    @mouseenter="FormatCopies"
    @click="$emit('toggleDrawer', state.message)"
  >
    <el-image
      class="warframeIcon"
      :src="src"
      :style="{ width: props.width + 'px' }"
    ></el-image>
    <span class="warframeName" v-if="props.nameVisible">{{
      props.warframeName
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps({
  warframeName: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 40
  },
  creator: {
    type: String,
    required: false,
    default: null
  },
  teamInfo: {
    required: false,
    default: null
  },
  focus: {
    type: String,
    required: false,
    default: null
  },
  nameVisible: {
    type: Boolean,
    default: false
  }
})

const src = computed(() => {
  if (props.warframeName === '任意') {
    return 'https://www.neorae.cn/data/image/warframe/any.webp'
  } else {
    return (
      'https://www.neorae.cn/data/image/warframe/' +
      props.warframeName +
      '.webp'
    )
  }
})

const state = reactive({
  message: ''
})
const FormatCopies = (): void => {
  if (props.teamInfo === null) {
    return
  }
  let focusName = ''
  if (props.focus === 'FocusLens') {
    focusName = '任意'
  } else {
    focusName = props.focus + '专精'
  }
  state.message =
    '在下' +
    focusName +
    props.warframeName +
    '战甲' +
    '. 申请加入' +
    ' ' +
    props.teamInfo.relicLevelName +
    props.teamInfo.relicTier +
    props.teamInfo.relicCode +
    '遗物' +
    ' 队伍. (Warframe Team Up)'
}
</script>

<style lang="scss" scoped>
.warframeName {
  margin-top: 5px;
}

.warframeIcon {
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>
