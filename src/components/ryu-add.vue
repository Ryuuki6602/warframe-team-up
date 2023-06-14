<template>
    <el-button icon="i-ep-plus" @click="$emit('event')"></el-button>
</template>
  
<script setup lang='ts'>
const emit = defineEmits(['event'])
</script>
  
<style lang='scss' scoped></style>