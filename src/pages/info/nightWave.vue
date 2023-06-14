<template>
  <div>
    <div>{{ _statusStore.getPanelParam() }}</div>
    <div>asd</div>
  </div>
</template>

<script setup lang="ts">
import { statusStore } from '@store'
const _statusStore = statusStore()
</script>

<style lang="scss" scoped></style>
