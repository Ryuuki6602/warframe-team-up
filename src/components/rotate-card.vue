<template>
  <div class="wrapper" @mouseleave="reset" @mousemove="rotate($event)" :style="{ transform }">

    <div class="rotate" ref="target">
      <el-card class="w-100%">
        <slot></slot>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useElementTransform } from '@vueuse/motion'

const target = ref<HTMLElement>()
const { width, height } = useElementBounding(target)
const { transform, stop } = useElementTransform(target)


const rotate = (event: any) => {
  // let X = Math.round(event.offsetX / width.value)
  // let Y = Math.round(event.offsetY / height.value)
  let X = event.offsetX / width.value.toFixed(2)
  let Y = event.offsetY / height.value.toFixed(2)
  let rX = (X - 0.5) * 25;
  let rY = -(Y - 0.5) * 25;

  transform.rotateX = rY
  transform.rotateY = rX
}

const init = () => {
  transform.rotateX = 0
  transform.rotateY = 0
  transform.rotateZ = 0
}
init()


const reset = () => {
  transform.rotateX = 0
  transform.rotateY = 0
}
</script>

<style lang="scss" scoped>
.wrapper {
  transform-style: preserve-3d;
  perspective: 800px;
  user-select: none;

  .rotate {
    position: relative;
    height: 100%;
    width: 100%;
    transition: transform 0.5s ease-out;
  }
}

:deep(.el-card__body) {
  padding: 0px;
}
</style>
