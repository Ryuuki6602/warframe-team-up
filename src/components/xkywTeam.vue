<template>
  <el-card
    v-for="(team, index) in props.teams"
    shadow="hover"
    class="team_list animate__animated animate__fadeIn animate__fast cards"
    :class="{ animate__fadeOut: team.isDeleted }"
  >
    <template #header>
      <el-row>
        <el-col :span="3" class="center flex-col">
          <el-image :src="team.creator.avatar" class="w-50px"></el-image>
          <span class="mt-5px text-size-[0.88rem]">{{
            team.creator.nickname
          }}</span>
        </el-col>
        <el-col :span="18">
          <div class="team_title">
            <el-tag
              v-if="team.xkywTeam.missionDifficulty == -1"
              class="tag"
              size="small"
              effect="dark"
            >
              {{ team.xkywTeam.missionDifficultyName }}
            </el-tag>
            <el-tag
              v-else
              class="tag"
              size="small"
              effect="dark"
              :type="team.xkywTeam.missionDifficulty ? 'warning' : 'success'"
            >
              {{ team.xkywTeam.missionDifficultyName }}
            </el-tag>
            <span class="info">{{ team.xkywTeam.title }}</span>
          </div>
        </el-col>
        <el-col :span="3" class="center">
          <el-row>
            <el-button
              v-if="
                _authStore.checkToken() &&
                team.creator.uuid == _authStore.getUUID()
              "
              icon="i-ep-delete"
              :loading="loadingState.deleteMyTeamLoading"
              @click="removeTeam(team.xkywTeam, index), (team.isDeleted = true)"
            ></el-button>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <el-row>
      <el-col :span="4">
        <div class="center flex-col">
          <div>需要</div>
          <relic
            :tierNum="team.xkywTeam.relicTierNum"
            :level="team.xkywTeam.relicLevel"
            :levelName="team.xkywTeam.relicLevelName"
            :code="team.xkywTeam.relicCode"
            :tier="team.xkywTeam.relicTier"
            :size="100"
            @click="openRelicDialog"
          ></relic>
          <el-dialog v-model="relicDialog.visible" width="70vw">
            <template #header> 遗物详情 </template>
            <el-row>
              <el-col :span="8">
                <relic
                  :tierNum="team.xkywTeam.relicTierNum"
                  :level="team.xkywTeam.relicLevel"
                  :levelName="team.xkywTeam.relicLevelName"
                  :code="team.xkywTeam.relicCode"
                  :tier="team.xkywTeam.relicTier"
                  :size="400"
                ></relic>
              </el-col>
              <el-col :span="16" class="center">
                <ryu-empty description="暂未收录本遗物"></ryu-empty>
              </el-col>
            </el-row>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="5" class="center flex-col">
        <div>队长</div>
        <focusIcon :focus="team.leader.focus" :size="35"></focusIcon>
        <WarframeIcon
          :warframe-name="team.leader.warframe"
          :width="90"
          :nameVisible="true"
          @toggleDrawer="toggleDrawer($event, team.xkywTeam.uuid, false)"
        ></WarframeIcon>
      </el-col>
      <el-col
        :span="5"
        v-for="build in team.teamMember"
        class="center flex-col"
      >
        <div>正在招募</div>

        <focusIcon :focus="build.focus" :size="35"></focusIcon>
        <WarframeIcon
          :teamInfo="team.xkywTeam"
          :creator="team.creator.nickname"
          :warframe-name="build.warframe"
          :focus="build.focus"
          :width="90"
          :nameVisible="true"
          @toggleDrawer="toggleDrawer($event, team.xkywTeam.uuid, true)"
        ></WarframeIcon>
      </el-col>
    </el-row>
    <div
      :class="{
        visible: drawer.visible && team.xkywTeam.uuid == drawer.selectedTeam
      }"
      class="text_drawer"
    >
      <span>{{ drawer.message }}</span>
      <ryuCopy
        :class="{
          copyInvisible:
            drawer.visible && team.xkywTeam.uuid == drawer.selectedTeam
        }"
        :message="drawer.message"
        :creator="team.creator.nickname"
      ></ryuCopy>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElNotification } from 'element-plus'
import relic from '@components/relic-icon.vue'
import ryuCopy from '@components/ryuCopy.vue'
import { removeTeamByUuid } from '@api/team'

import { authStore } from '@store'
import WarframeIcon from '@components/warframeIcon.vue'

const _authStore = authStore()

const relicDialog = reactive({
  visible: false
})

const drawer = reactive({
  message: '',
  visible: false,
  selectedTeam: ''
})

const toggleDrawer = (message: string, teamId: string, state: boolean) => {
  drawer.message = message
  drawer.selectedTeam = teamId
  drawer.visible = state
  if (!state) {
    drawer.message = ''
    drawer.selectedTeam = ''
    return
  }
}
const openRelicDialog = () => {
  relicDialog.visible = true
}

const loadingState = reactive({
  deleteMyTeamLoading: false
})
const emits = defineEmits(['removeTeam'])
const removeTeam = async (team: any, index: number) => {
  loadingState.deleteMyTeamLoading = true
  const fb = await removeTeamByUuid(team.uuid)
  if (fb.status == '200') {
    ElNotification({
      type: 'success',
      message: '删除成功',
      offset: 70
    })
  } else {
    ElNotification({
      type: 'info',
      message: fb.msg,
      offset: 70
    })
  }
  loadingState.deleteMyTeamLoading = false
  emits('removeTeam', index)
}

const props = defineProps({
  teams: {
    type: Array<any>,
    default: []
  }
})
</script>

<style lang="scss" scoped>
.cards:nth-child(n-1) {
  margin-top: 20px;
}

.team_list {
  margin: 0 20px;

  .team_title {
    height: 78px;
    line-height: 78px;
    overflow: hidden;
    position: relative;

    .tag {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
    }

    .info {
      padding: 0 20px;
      font-size: 1.2rem;
    }
  }
}

.text_drawer {
  height: 0;
  opacity: 0;
  transition: all 0.22s linear;
}

.visible {
  border-top: 1px solid var(--el-text-color-secondary);
  padding-top: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
  height: 40px;
}

.copyInvisible {
  opacity: 0;
}
</style>
