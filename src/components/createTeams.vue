<template>
  <div class="createTeams" :class="{ shifted: isScrolled }">
    <div class="center">
      <el-button
        type="primary"
        icon="i-ep:plus"
        circle
        size="large"
      ></el-button>
    </div>
    <span class="text-center mt-5px">创建队伍</span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isScrolled = ref<boolean>(false)

window.addEventListener('scroll', () => {
  if (window.scrollY > 67) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
})
</script>

<style lang="scss" scoped>
.createTeams {
  position: fixed;
  bottom: -10px;
  right: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.22s ease-in-out;

  &:hover {
    cursor: pointer;

    span {
      color: var(--el-color-primary);
    }
  }
}

.shifted {
  bottom: 67px;
}
</style>
