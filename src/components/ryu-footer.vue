<template>
  <div class="ryu_footer">
    <div>
      <div class="text">作者：Aniberzzzz</div>
      <a class="text" href="https://github.com/Ryuuki6602">Github: @Neorae</a>
    </div>
    <div>
      <div class="text">
        <a href="https://beian.miit.gov.cn/#/Integrated/index">
          闽ICP备2022001180号-3
        </a>
      </div>
      <div class="text">
        字体作者：
        <a class="text" href="https://space.bilibili.com/38053181"
          >B站@oooooohmygosh</a
        >
        -
        <a class="text" href="https://github.com/atelier-anchor/smiley-sans"
          >得意黑</a
        >
      </div>
    </div>

    <div>
      <div class="text" @click="QRCodeDialog = true">
        提出问题或建议: 企鹅群376878510&nbsp;&nbsp;或
        <div @click="goIssue" class="hover-color-blue">🎉发布issue</div>
      </div>
      <div class="text">赞助、商业相关：liuqi6602@163.com</div>
    </div>
  </div>
  <el-dialog v-model="QRCodeDialog" style="width: 300px">
    <template #header>
      <span>扫码加入企鹅群</span>
    </template>
    <div class="center w-100%">
      <el-image src="https://www.neorae.cn/data/image/QRCode.png"></el-image>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@routes'
const QRCodeDialog = ref<boolean>(false)
const goIssue = () => {
  router.push({
    path: '/issue'
  })
}
</script>

<style lang="scss" scoped>
.ryu_footer {
  height: 127px;
  width: 100%;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .text {
    color: var(--el-text-color);
    height: 60px;
    line-height: 67px;

    &:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
}
a {
  color: var(--el-text-color);
}
</style>
