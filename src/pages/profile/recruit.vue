<template>
  <ryuSkeleton :loading="loadingStart" :hasResult="teamList.length > 0">
    <template #content>
      <xkywTeam :teams="teamList"></xkywTeam>
    </template>
  </ryuSkeleton>
</template>

<script setup lang="ts">
import { getMyTeams } from '@api/team'
import xkywTeam from '@components/xkywTeam.vue'

const teamList = ref([])

const loadingStart = ref(true)
const initTeamList = async () => {
  const fb = await getMyTeams()
  teamList.value = fb.res
  loadingStart.value = false
}

onMounted(() => {
  initTeamList()
})
</script>

<style lang="scss" scoped></style>
