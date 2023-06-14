<template>
  <el-divider content-position="center">
    <span class="text-size-[1.2rem]">遗物</span>
  </el-divider>
  <div class="grid grid-rows-a grid-cols-2">
    <div class="wrapper">
      <div class="title">古纪遗物</div>
      <el-button :loading="state.gettingLithRelic" @click="getLithRelic(true)"
        >获取</el-button
      >
    </div>
    <div class="wrapper">
      <div class="title">前纪遗物</div>
      <el-button :loading="state.gettingMesoRelic" @click="getMesoRelic(true)"
        >获取</el-button
      >
    </div>
    <div class="wrapper">
      <div class="title">中纪遗物</div>
      <el-button :loading="state.gettingNeoRelic" @click="getNeoRelic(true)"
        >获取</el-button
      >
    </div>
    <div class="wrapper">
      <div class="title">后纪遗物</div>
      <el-button :loading="state.gettingAxiRelic" @click="getAxiRelic(true)"
        >获取</el-button
      >
    </div>
    <div class="wrapper">
      <div class="title">安魂遗物</div>
      <el-button
        :loading="state.gettingRequiemRelic"
        @click="getRequiemRelic(true)"
        >获取</el-button
      >
    </div>
    <div class="wrapper">
      <div class="title">全部遗物</div>
      <el-row>
        <el-col :span="12">
          <el-button
            :loading="state.gettingAllRelic"
            @click="getEveryTierRelic()"
          >
            获取
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button :loading="state.droppingAllRelic" @click="dropAllRelic()">
            清空
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-divider content-position="left">
    <span class="text-size-[1.2rem]">模组卡</span>
  </el-divider>
  <el-row>
    <el-col :span="24">
      <el-button>更新mod信息</el-button>
    </el-col>
  </el-row>
  <el-divider content-position="left">
    <span class="text-size-[1.2rem]">战甲</span>
  </el-divider>
  <el-row>
    <el-col :span="24">
      <el-button>更新普通战甲信息</el-button>
      <el-button>更新Primed 战甲信息</el-button>
    </el-col>
  </el-row>
  <el-divider content-position="left">
    <span class="text-size-[1.2rem]">武器</span>
  </el-divider>
  <el-row>
    <el-col :span="24">
      <el-button>更新普通武器信息</el-button>
      <el-button>更新Primed 武器信息</el-button>
    </el-col>
  </el-row>

  <el-dialog v-model="dialog.lith">
    <template #header> {{ LithRelics.length }}个古纪遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in LithRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div class="i-ep-close icon" @click="LithRelics.splice(index, 1)"></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.lith = false">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialog.meso">
    <template #header> {{ MesoRelics.length }}个前纪遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in MesoRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div class="i-ep-close icon" @click="MesoRelics.splice(index, 1)"></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.meso = false">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialog.neo">
    <template #header> {{ NeoRelics.length }}个中纪遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in NeoRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div class="i-ep-close icon" @click="NeoRelics.splice(index, 1)"></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.neo = false">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialog.axi">
    <template #header> {{ AxiRelics.length }}个后纪遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in AxiRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div class="i-ep-close icon" @click="AxiRelics.splice(index, 1)"></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.axi = false">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialog.requiem">
    <template #header> {{ RequiemRelics.length }}个安魂遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in RequiemRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div
          class="i-ep-close icon"
          @click="RequiemRelics.splice(index, 1)"
        ></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.requiem = false">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialog.all">
    <template #header> {{ AllRelics.length }}个遗物 </template>
    <el-scrollbar height="300px">
      <div
        v-for="(item, index) in AllRelics"
        :key="item.name"
        class="p-20px flex justify-between"
      >
        <span>{{ item.name }}</span>
        <div class="i-ep-close icon" @click="AllRelics.splice(index, 1)"></div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button @click="dialog.all = false">确认</el-button>
      <el-button
        @click="updateEveryTierRelic"
        :loading="state.uploadingAllRelic"
      >
        更新
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getLithRelics,
  getMesoRelics,
  getNeoRelics,
  getAxiRelics,
  getRequiemRelics,
  getRelics,
  dropAllRelics
} from '@api/warframe'
import { uploadAllRelics } from '@api/warframe'
import { ElNotification } from 'element-plus'
import { computed, reactive } from 'vue'
import type { relics } from '@models'

const LithRelics = reactive<Array<relics>>([])
const MesoRelics = reactive<Array<relics>>([])
const NeoRelics = reactive<Array<relics>>([])
const AxiRelics = reactive<Array<relics>>([])
const RequiemRelics = reactive<Array<relics>>([])
const AllRelics = reactive<Array<relics>>([])

const dialog = reactive({
  lith: false,
  meso: false,
  neo: false,
  axi: false,
  requiem: false,
  all: false
})

const state = reactive({
  gettingLithRelic: false,
  gettingMesoRelic: false,
  gettingNeoRelic: false,
  gettingAxiRelic: false,
  gettingRequiemRelic: false,
  gettingAllRelic: false,
  droppingAllRelic: false,
  uploadingAllRelic: false
})

const dropAllRelic = async () => {
  state.droppingAllRelic = true
  const fb = await dropAllRelics()
  state.droppingAllRelic = false
}

const getEveryTierRelic = async () => {
  state.gettingAllRelic = true
  const fb = await getRelics()
  fb.forEach((element: any) => {
    AllRelics.find((e) => e.name === element.name)
      ? ''
      : AllRelics.push(element)
  })
  console.log(AllRelics)
  dialog.all = true
  state.gettingAllRelic = false
}

const updateEveryTierRelic = async () => {
  state.uploadingAllRelic = true
  await uploadAllRelics(AllRelics)
  state.uploadingAllRelic = false
  dialog.all = false
  ElNotification.success('成功更新所有遗物列表')
}

const getLithRelic = async (openDialog: boolean) => {
  state.gettingLithRelic = true
  const fb = await getLithRelics()
  fb.forEach((element: any) => {
    LithRelics.find((e) => e.name === element.name)
      ? ''
      : LithRelics.push(element)
  })
  if (openDialog) {
    dialog.lith = true
  } else {
    dialog.lith = false
  }
  state.gettingLithRelic = false
  ElNotification.success('成功获取古纪遗物列表')
}

const getMesoRelic = async (openDialog: boolean) => {
  state.gettingMesoRelic = true
  const fb = await getMesoRelics()
  fb.forEach((element: any) => {
    MesoRelics.find((e) => e.name === element.name)
      ? ''
      : MesoRelics.push(element)
  })
  if (openDialog) {
    dialog.meso = true
  } else {
    dialog.meso = false
  }
  state.gettingMesoRelic = false
  ElNotification.success('成功获取前纪遗物列表')
}

const getNeoRelic = async (openDialog: boolean) => {
  state.gettingNeoRelic = true
  const fb = await getNeoRelics()
  fb.forEach((element: any) => {
    NeoRelics.find((e) => e.name === element.name)
      ? ''
      : NeoRelics.push(element)
  })
  if (openDialog) {
    dialog.neo = true
  } else {
    dialog.neo = false
  }
  state.gettingNeoRelic = false
  ElNotification.success('成功获取中纪遗物列表')
}

const getAxiRelic = async (openDialog: boolean) => {
  state.gettingAxiRelic = true
  const fb = await getAxiRelics()
  fb.forEach((element: any) => {
    AxiRelics.find((e) => e.name === element.name)
      ? ''
      : AxiRelics.push(element)
  })
  if (openDialog) {
    dialog.axi = true
  } else {
    dialog.axi = false
  }
  state.gettingAxiRelic = false
  ElNotification.success('成功获取后纪遗物列表')
}

const getRequiemRelic = async (openDialog: boolean) => {
  state.gettingRequiemRelic = true
  const fb = await getRequiemRelics()
  fb.forEach((element: any) => {
    RequiemRelics.find((e) => e.name === element.name)
      ? ''
      : RequiemRelics.push(element)
  })
  RequiemRelics.pop()
  if (openDialog) {
    dialog.requiem = true
  } else {
    dialog.requiem = false
  }

  state.gettingRequiemRelic = false
  ElNotification.success('成功获取安魂遗物列表')
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;

  .title {
    padding: 10px 0;
  }
}

:deep(.el-button + .el-button) {
  margin-left: 0px;
}

:deep(.el-button) {
  margin-right: 12px;
}
.icon {
  font-size: 20px;
  transition: all 0.22s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: var(--el-color-primary);
  }
}
</style>
