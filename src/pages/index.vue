<template>
  <el-container>
    <el-header class="clearStyle">
      <ryu-header></ryu-header>
    </el-header>

    <el-main class="ryu_main">
      <div class="main_wrapper">
        <div class="BGV">
          <video src="@video/index.mp4" loop muted autoplay id="video"></video>
        </div>
        <div class="ryu_observation">
          <el-card
            :class="{ visible: _statusStore.isObservationPanel() }"
            class="animate__animated animate__fadeIn h-100% panel"
          >
            <template #header>
              <el-row>
                <el-col :span="8"></el-col>
                <el-col :span="8" class="panel_title">
                  <div class="title">
                    <div
                      class="i-ep:guide text-size-[1.88rem] mr-5px icon"
                    ></div>
                    <div class="text-xl name">观测站</div>
                  </div>
                </el-col>
                <el-col :span="8" class="tip">
                  <div class="i-ep-info-filled"></div>
                  <div>点击倒计时可查看详细信息</div>
                </el-col>
              </el-row>
            </template>
            <el-row>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="地球昼夜循环"
                    :value="earthCycle.isDay ? '白天' : '夜晚'"
                    :isEmpty="Object.keys(earthCycle).length === 0"
                    :expiry="converUTCToTimeStamp(earthCycle.expiry)"
                    :cycleId="earthCycle.id"
                    @finish="
                      handleFinish(
                        earthCycle.id,
                        earthCycle.isDay ? '地球已进入黑夜' : '地球已进入白天'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="地球平原&nbsp;-&nbsp;夜灵平野"
                    :value="cetusCycle.isDay ? '白天' : '夜晚'"
                    :isEmpty="Object.keys(cetusCycle).length === 0"
                    :expiry="
                      converUTCToTimeStamp(cetusCycle.expiry) + 1000 * 168
                    "
                    :cycleId="cetusCycle.id"
                    @finish="
                      handleFinish(
                        cetusCycle.id,
                        cetusCycle.isDay
                          ? '夜灵平野已进入黑夜'
                          : '夜灵平野已进入白天'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="金星平原&nbsp;-&nbsp;奥布山谷"
                    :value="vallisCycle.isWarm ? '温暖' : '寒冷'"
                    :isEmpty="Object.keys(vallisCycle).length === 0"
                    :expiry="
                      converUTCToTimeStamp(vallisCycle.expiry) + 1000 * 105
                    "
                    :cycleId="vallisCycle.id"
                    @finish="
                      handleFinish(
                        vallisCycle.id,
                        vallisCycle.isWarm
                          ? '奥布山谷已进入寒冷气候'
                          : '奥布山谷已进入温暖气候'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="火卫二平原&nbsp;-&nbsp;魔胎之境"
                    :value="cambionCycle.state"
                    :isEmpty="Object.keys(cambionCycle).length === 0"
                    :expiry="
                      converUTCToTimeStamp(cambionCycle.expiry) + 1000 * 165
                    "
                    :cycleId="cambionCycle.id"
                    @finish="
                      handleFinish(
                        cambionCycle.id,
                        cambionCycle.state == 'fass'
                          ? '魔胎之境已切换至Vome状态'
                          : '魔胎之境已切换至Fass状态'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="扎里曼号"
                    :value="
                      zarimanCycle.isCorpus ? 'Corpus占领中' : 'Grineer占领中'
                    "
                    :isEmpty="Object.keys(zarimanCycle).length === 0"
                    :expiry="converUTCToTimeStamp(zarimanCycle.expiry)"
                    :cycleId="zarimanCycle.id"
                    @finish="
                      handleFinish(
                        zarimanCycle.id,
                        '扎里曼号现在已被' +
                          (zarimanCycle.isCorpus ? 'Grineer' : 'Corpus') +
                          '占领'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    @click="
                      checkInfo(
                        1,
                        6,
                        'voidTrader',
                        '虚空商人',
                        vaultTraderCycle.id
                      )
                    "
                    :title="'虚空商人'"
                    :value="
                      voidTraderCycle.active
                        ? '离开' + voidTraderCycle.location
                        : '到达' + voidTraderCycle.location
                    "
                    :isEmpty="Object.keys(voidTraderCycle).length === 0"
                    :expiry="
                      voidTraderCycle.active
                        ? converUTCToTimeStamp(voidTraderCycle.expiry)
                        : converUTCToTimeStamp(voidTraderCycle.activation)
                    "
                    :cycleId="voidTraderCycle.id"
                    @finish="
                      handleFinish(
                        voidTraderCycle.id,
                        voidTraderCycle.active
                          ? '虚空商人已离开' + voidTraderCycle.location
                          : '虚空商人已到达' + voidTraderCycle.location
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    @click="
                      checkInfo(
                        1,
                        6,
                        'vaultTrader',
                        '阿耶檀识商人',
                        vaultTraderCycle.id
                      )
                    "
                    :title="'阿耶檀识商人'"
                    :value="'距离商品更新'"
                    :isEmpty="Object.keys(vaultTraderCycle).length === 0"
                    :expiry="converUTCToTimeStamp(vaultTraderCycle.expiry)"
                    :cycleId="vaultTraderCycle.id"
                    @finish="
                      handleFinish(
                        vaultTraderCycle.id,
                        'Vault Trader更新了他的商品信息'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6" v-for="event in _statusStore.getEvents()">
                <div class="w-100% center">
                  <ryuStatistic
                    :title="event.description"
                    :value="event.node"
                    :isEmpty="Object.keys(event).length === 0"
                    :expiry="converUTCToTimeStamp(event.expiry)"
                    :cycleId="event.id"
                    @finish="handleFinish(event.id, event.title + '已结束')"
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="w-100% center">
                  <ryuStatistic
                    title="午夜电波"
                    value="距离结束还有"
                    :isEmpty="
                      Object.keys(_statusStore.getNightWave()).length === 0
                    "
                    :expiry="
                      converUTCToTimeStamp(_statusStore.getNightWave().expiry)
                    "
                    :cycleId="_statusStore.getNightWave().id"
                    @finish="
                      handleFinish(
                        _statusStore.getNightWave().id,
                        '本轮午夜电波已结束'
                      )
                    "
                  ></ryuStatistic>
                </div>
              </el-col>
              <el-col :span="initWorldStateFailed ? 24 : 6" @click="toB">
                <div class="w-100% center">
                  <ryuStatistic
                    :title="'彦祖！彦祖！彦祖！'"
                    :value="'B站@粉丝拌饭'"
                    :expiry="getMyBirthDayTimestamp()"
                    @finish="handleFinish('0', '你知道吗，今天是我的生日！')"
                  ></ryuStatistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-card
            :class="{ visible: _statusStore.isDetailPanel() }"
            class="animate__animated animate__fadeIn h-100% panel"
          >
            <template #header>
              <el-row>
                <el-col :span="8"></el-col>
                <el-col :span="8" class="panel_title">
                  <div class="title" @click="checkInfo(0)">
                    <div
                      class="i-ep:guide text-size-[1.88rem] mr-5px icon"
                    ></div>
                    <div class="text-xl name">
                      {{ _statusStore.getPanelDisplayName() }}
                    </div>
                  </div>
                </el-col>
                <el-col :span="8"> </el-col>
              </el-row>
            </template>
            <component :is="activeComponent"></component>
          </el-card>
        </div>
      </div>

      <div class="content_wrapper">
        <div class="content">
          <el-menu
            :router="true"
            :default-active="activeIndex"
            mode="horizontal"
            class="ryu_menu"
            :ellipsis="false"
          >
            <el-row class="w-100%">
              <el-col :span="22" class="flex items-center">
                <div v-for="(menu, index) in _menuStore.getMenu()">
                  <el-sub-menu v-if="menu.submenu" :index="menu.path">
                    <template #title>
                      <ryu-icon :icon="menu.icon" :size="20"></ryu-icon>
                      <span>{{ menu.name }}</span>
                    </template>
                    <el-menu-item
                      v-for="submenu in menu.children"
                      :index="submenu.path"
                    >
                      <ryu-icon :icon="submenu.icon" :size="20"></ryu-icon>
                      <span> {{ submenu.name }}</span>
                    </el-menu-item>
                  </el-sub-menu>
                  <el-menu-item v-else :index="menu.path">
                    <ryu-icon :icon="menu.icon" :size="20"></ryu-icon>
                    <span> {{ menu.name }}</span>
                  </el-menu-item>
                </div>
              </el-col>
              <el-col :span="2" class="flex items-center justify-between">
                <div class="menu_actions">
                  <el-tooltip content="按常用分类展示菜单">
                    <ryu-icon
                      icon="ant-design:appstore-outlined"
                      class="action"
                      :class="{ active: isUsual }"
                      :size="30"
                      @click="switchMenuList(false)"
                    ></ryu-icon>
                  </el-tooltip>
                  <el-tooltip content="按行星展示菜单">
                    <ryu-icon
                      icon="ion:planet-outline"
                      class="action"
                      :class="{ active: isPlanet }"
                      :size="30"
                      @click="switchMenuList(true)"
                    ></ryu-icon>
                  </el-tooltip>
                  <el-tooltip content="开发者">
                    <ryu-icon
                      class="action"
                      :class="{ active: isDevelop }"
                      :size="30"
                      icon="fluent:developer-board-lightning-20-regular"
                      @click="goDevelop()"
                    ></ryu-icon>
                  </el-tooltip>
                  <el-tooltip content="主页">
                    <ryu-icon
                      class="action"
                      :class="{ active: isHomePage }"
                      :size="30"
                      icon="ant-design:home-outlined"
                      @click="goHome()"
                    ></ryu-icon>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </el-menu>
          <div class="min-h-100vh">
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </el-main>

    <el-footer class="clearStyle">
      <ryu-footer></ryu-footer>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, h, toRaw } from 'vue'
import { getPcWorldState } from '@api/warframe'
import {
  menuStore,
  fissureStore,
  authStore,
  statusStore,
  componentStore
} from '@store'

import { validateUserAccess } from '@api/account'
import ryuFooter from '@components/ryu-footer.vue'
import ryuStatistic from '@components/ryu-statistic.vue'
import { useRouter } from 'vue-router'
import { getMyBirthDayTimestamp, converUTCToTimeStamp } from '@utils/DateUtil'
import { ElNotification } from 'element-plus'
import refreshData from '@components/refreshData.vue'
import type { notifyModel } from '@models'
import VoidTrader from './info/voidTrader.vue'
import NightWave from './info/nightWave.vue'
import VaultTrader from './info/vaultTrader.vue'
import ryuHeader from '@components/ryu-header.vue'
import ryuIcon from '@components/ryu-icon.vue'
import router from '@routes'

const _useRouter = useRouter()
const _menuStore = menuStore()

const matchedRoute = computed(() => {
  return _useRouter.currentRoute.value.matched[1].path
})

const currentRoute = computed(() => {
  return _useRouter.currentRoute.value.path
})

const isPlanet = computed(() => {
  return matchedRoute.value.includes('/introduction/planet')
})

const isUsual = computed(() => {
  return matchedRoute.value.includes('/introduction/usual')
})

const isHomePage = computed(() => {
  return currentRoute.value.includes('/introduction')
})

const isDevelop = computed(() => {
  return matchedRoute.value.includes('/developer')
})

const switchMenuList = async (state: boolean) => {
  router.push({
    path: state ? '/introduction/planet' : '/introduction/usual'
  })
}

const goHome = () => {
  router.push({
    path: matchedRoute.value
  })
}

const goDevelop = () => {
  router.push({
    path: '/introduction/developer'
  })
}

const earthCycle = computed(() => {
  return _statusStore.getEarthCycle()
})

const cetusCycle = computed(() => {
  return _statusStore.getCetusCycle()
})

const vallisCycle = computed(() => {
  return _statusStore.getVallisCycle()
})

const cambionCycle = computed(() => {
  return _statusStore.getCambionCycle()
})

const zarimanCycle = computed(() => {
  return _statusStore.getZarimanCycle()
})

const voidTraderCycle = computed(() => {
  return _statusStore.getVoidTraderCycle()
})

const vaultTraderCycle = computed(() => {
  return _statusStore.getVaultTraderCycle()
})

const _fissureStore = fissureStore()

const initWorldStateFailed = ref(false)

const checkInfo = (
  index: number,
  cardIndex?: number,
  param?: string,
  displayName?: string,
  cycleId?: string
) => {
  if (typeof cycleId == 'string' && _statusStore.findCycleStatus(cycleId)) {
    return false
  }
  _statusStore.toggleDetailPanel(index, cardIndex, param, displayName)
}

const initWorldState = async (callback?: any) => {
  const fb = await getPcWorldState()
  if (Object.keys(fb).length > 0) {
    _statusStore.clearCycleIds()
    if (_statusStore.getPanelParam() == 'voidTrader') {
      voidTraderOnly(fb.voidTrader)
      return
    }
    if (_statusStore.getPanelParam() == 'vaultTrader') {
      vaultTraderOnly(fb.vaultTrader)
      return
    }
    _statusStore.setNightWave(fb.nightwave)
    _statusStore.setEvents(fb.events)
    _statusStore.setVoidTraderInventory(fb.voidTrader.inventory)
    _statusStore.setVaultTraderInventory(fb.vaultTrader.inventory)
    _statusStore.setEarthCycle(fb.earthCycle)
    _statusStore.setCetusCycle(fb.cetusCycle)
    _statusStore.setVallisCycle(fb.vallisCycle)
    _statusStore.setCambionCycle(fb.cambionCycle)
    _statusStore.setZarimanCycle(fb.zarimanCycle)
    _statusStore.setVoidTraderCycle(fb.voidTrader)
    _statusStore.setVaultTraderCycle(fb.vaultTrader)
    _fissureStore.setFissureList(fb.fissures)
    callback && callback(true)
  } else {
    initWorldStateFailed.value = true
    callback && callback(false)
  }
}

const voidTraderOnly = (voidTrader: any) => {
  if (_statusStore.getPanelParam() == 'voidTrader') {
    _statusStore.isDetailPanelLoading(true)
    _statusStore.setVoidTraderInventory(voidTrader.inventory)
    setTimeout(() => {
      _statusStore.isDetailPanelLoading(false)
    }, 2000)
  }
  return
}

const vaultTraderOnly = (vaultTrader: any) => {
  _statusStore.isDetailPanelLoading(true)
  _statusStore.setVaultTraderInventory(vaultTrader.inventory)
  setTimeout(() => {
    _statusStore.isDetailPanelLoading(false)
  }, 2000)
}

const _componentStore = componentStore()
const initComponentStore = () => {
  _componentStore.addComponent(NightWave)
  _componentStore.addComponent(VoidTrader)
  _componentStore.addComponent(VaultTrader)
}

const activeComponent = computed(() => {
  return toRaw(_componentStore.getComponentByName(_statusStore.getPanelParam()))
})

const dataInterval = ref<any>({})
const interval = () => {
  dataInterval.value = setInterval(() => {
    console.log('定时更新数据')
    initWorldState(function reset(res: boolean) {
      if (res) {
        console.log('数据更新成功')
      } else {
        console.log('数据更新失败，正在重试')
        reloadData()
      }
    })
  }, 1000 * 60 * 5)
}

const retryInterval = ref<any>({})
const reloadData = () => {
  let retry = 3
  retryInterval.value = setInterval(() => {
    if (retry > 0) {
      initWorldState(function reset(res: boolean) {
        if (res) {
          console.log('已重新加载')
          clearInterval(retryInterval.value)
        } else {
          retry--
          console.log('第' + (3 - retry) + '次重载数据失败')
        }
      })
    } else {
      clearInterval(retryInterval.value)
      console.log('超过最大尝试次数，加载失败')
      ElNotification({
        title: '数据加载失败',
        message: 'DE API 似乎出了点问题，请刷新页面',
        duration: 0,
        type: 'error',
        position: 'top-left',
        offset: 70
      })
    }
  }, 1000 * 5)
}

const closeNotify = (notify?: notifyModel, timeout?: number) => {
  if (notify == null) {
    return
  }
  _statusStore.setTaskStatus(notify.timestamp, true)
  setTimeout(
    () => {
      _statusStore.closeCompletedNotify(notify.timestamp)
    },
    timeout ? timeout : 2000
  )
}

const _statusStore = statusStore()
const handleFinish = (cycleId: string, msg: string) => {
  if (_statusStore.getNotifies().length > 0) {
    return false
  }
  let notify = <notifyModel>{
    timestamp: 0,
    notifier: null,
    taskCompleted: false
  }
  notify.timestamp = new Date().getTime()
  notify.notifier = ElNotification({
    dangerouslyUseHTMLString: true,
    message: h('div', null, [
      h('div', null, [
        h(refreshData, {
          onRefreshData: () => s(notify, cycleId),
          message: msg,
          notifier: notify
        })
      ])
    ]),
    position: 'top-left',
    offset: 70,
    duration: 0
  })
}

interface cycleIntervalModel {
  cycleId: string
  id: number
}

const s = (notify: notifyModel, cycleId: string) => {
  _statusStore.addNotify(notify)
  _statusStore.updateCycleStatus(cycleId, true)
  initWorldState(function reset(res: boolean) {
    if (res) {
      if (cycleId == null) {
        closeNotify(notify)
        return true
      } else {
        let updateInterval: cycleIntervalModel = {
          cycleId: cycleId,
          id: -1
        }
        updateInterval.id = window.setInterval(() => {
          if (_statusStore.isCycleIdExist(cycleId)) {
            initWorldState()
            console.log('DE的数据还是旧的，正在重新加载')
            return false
          } else {
            _statusStore.removeIntervalByCycleId(cycleId)
            _statusStore.updateCycleStatus(cycleId, false)
            console.log('新数据到啦！')
            closeNotify(notify)
            return true
          }
        }, 1000 * 5)
        _statusStore.addInterval(updateInterval)
      }
    } else {
      _statusStore.removeIntervalByCycleId(cycleId)
      closeNotify(notify)
      ElNotification({
        title: '数据加载失败',
        message: 'DE API 似乎出了点问题，请刷新页面',
        duration: 0,
        type: 'error',
        position: 'top-left',
        offset: 70
      })
      reloadData()
      return false
    }
  })
}

const activeIndex = computed(() => {
  return _menuStore.getDefaultPath()
    ? _menuStore.getDefaultPath()
    : '/introduction/usual'
})

const _authStore = authStore()
const validateAccess = async () => {
  const fb = await validateUserAccess()
  _authStore.setStatus(fb.res.isTokenValid, fb.res.user)
}

onMounted(() => {
  validateAccess()
  initComponentStore()
  initWorldState(function reset(res: boolean) {
    if (res) {
      console.log('数据加载成功')
    } else {
      reloadData()
    }
  })
  interval()
})

const toB = () => {
  window.location.href = 'https://space.bilibili.com/471857522'
}
onUnmounted(() => {
  clearInterval(dataInterval.value)
  clearInterval(retryInterval.value)
  _statusStore.closeNotify()
  _statusStore.clearIntervals()
})
</script>

<style lang="scss" scoped>
.ryu_main {
  width: 100%;

  .main_wrapper {
    position: relative;

    .BGV {
      width: 100%;
      height: 70vh;

      #video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .ryu_observation {
      width: 100%;
      height: 60vh;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 98;

      .panel {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60vw;
        display: none;
      }

      .visible {
        display: block;
      }
    }
  }

  .content_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 87%;

      .ryu_menu {
        box-shadow: var(--el-box-shadow-light);
      }

      .menu_actions {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .action {
          transition: all 0.22s ease-in-out;

          &:hover {
            transform: scale(1.05);
            cursor: pointer;
            color: var(--el-color-primary);
          }

          &.active {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}

.panel_title {
  font-size: 20px;
  height: 45px;
  line-height: 45px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.22s ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
}

:deep(.el-main) {
  padding: 0;
}

:deep(.el-card__header) {
  padding: 5px;
}
</style>
