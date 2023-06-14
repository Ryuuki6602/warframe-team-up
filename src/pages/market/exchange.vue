<template>
  <el-row class="wrapper" :gutter="50">
    <el-col :span="12" class="trade_post">
      <el-row>
        <el-col :span="8">
          <el-tooltip content="发布新需求">
            <div
              class="i-ep:plus icony scaleUp"
              @click="toggleSwapTransactionDialog"
            ></div>
          </el-tooltip>
          <el-tooltip content="刷新">
            <div class="i-ep:refresh icony rotate" @click="refreshMyPost"></div>
          </el-tooltip>
          <el-tooltip content="切换展示">
            <div class="i-ep-switch icony scaleUp" @click="switchPanel"></div>
          </el-tooltip>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8" class="text-end mt-5px">
          <span class="text">我想换</span>
        </el-col>
      </el-row>

      <ryu-skeleton
        :loading="state.isMyPostLoading"
        :hasResult="myPost.length > 0"
        :line="1"
      >
        <template #content>
          <el-card
            v-for="(postList, index) in myPost"
            class="cards animate__animated animate_fadeIn animate__fast"
            :class="{ animate__fadeOut: postList.isDeleted }"
          >
            <template #header>
              <div class="post_title">
                <div>
                  <span class="text">
                    {{ diffTimeFromNow(postList.transactionSwap.createTime) }}
                  </span>
                  <span class="text">
                    我{{ isOffersPanel ? '提供了' : '需要' }}
                  </span>
                  <span class="text">以下物品</span>
                </div>
                <div>
                  <el-tooltip content="删除">
                    <el-button
                      icon="i-ep-delete"
                      @click="
                        removeMyPost(postList.transactionSwap.swapUuid, index)
                      "
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="切换展示">
                    <el-button
                      icon="i-ep-switch"
                      @click="switchPanel"
                    ></el-button>
                  </el-tooltip>
                </div>
              </div>
            </template>
            <div class="grid grid-cols-5 gap-4">
              <div
                class="center"
                v-for="(item, index) in postList[state.currentPanelName]"
              >
                <el-image :src="item.icon" class="itemIcon"></el-image>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-4 mt-10px">
              <div
                class="text-center"
                v-for="(item, index) in postList[state.currentPanelName]"
              >
                <span class="itemName">{{ item.name }}</span>
              </div>
            </div>
          </el-card>
        </template>
      </ryu-skeleton>
    </el-col>
    <el-col :span="12" class="trade_post">
      <el-row>
        <el-col :span="8" class="text-start mt-5px">
          <span class="text">其他Tenno想换</span>
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8" class="flex justify-end items-center">
          <el-tooltip content="刷新">
            <div
              class="i-ep:refresh icony rotate"
              @click="refreshTennoPost"
            ></div>
          </el-tooltip>
          <el-tooltip content="切换展示">
            <div
              class="i-ep-switch icony scaleUp"
              @click="switchTennoPanel"
            ></div>
          </el-tooltip>
        </el-col>
      </el-row>
      <ryu-skeleton
        :loading="state.isMyPostLoading"
        :hasResult="TennoPost.length > 0"
        :line="1"
      >
        <template #content>
          <el-card
            v-for="(postList, index) in TennoPost"
            class="cards animate__animated animate__lightSpeedInRight animate__faster"
            :class="{ animate__fadeOut: postList.isDeleted }"
          >
            <template #header>
              <div class="post_title">
                <div class="timeBefore">
                  <span class="text">
                    {{ diffTimeFromNow(postList.transactionSwap.createTime) }}
                  </span>
                  <span class="text">
                    {{ isTennoRequestPanel ? '需要' : '提供了' }}</span
                  >
                  <span class="text">以下物品</span>
                </div>
                <div class="flex justify-between w-100% items-center">
                  <div class="flex flex-1">
                    <el-avatar
                      size="large"
                      :src="postList.creator.avatar"
                      class="min-w-55px"
                    ></el-avatar>
                    <div class="ml-10px">
                      <span class="font-bold text-size-[1.1rem]">
                        {{
                          postList.creator.uuid == _authStore.getUUID()
                            ? postList.creator.nickname + '(我)'
                            : postList.creator.nickname
                        }}
                      </span>
                      <div>
                        <el-tag
                          v-if="!postList.creator.state"
                          type="info"
                          size="small"
                        >
                          离线
                        </el-tag>
                        <el-tag
                          v-else-if="postList.creator.state == 1"
                          type="success"
                          size="small"
                        >
                          游戏中
                        </el-tag>
                        <el-tag v-else size="small"> 在线 </el-tag>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="copied ? '复制成功' : '复制'"
                      placement="bottom"
                    >
                      <el-button :icon="icon" @click="copyMessage(postList)">
                      </el-button>
                    </el-tooltip>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="切换展示"
                      placement="bottom"
                    >
                      <el-button
                        class="ml-10px"
                        icon="i-ep-switch"
                        @click="switchTennoPanel"
                      >
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </template>

            <div class="grid grid-cols-5 gap-4">
              <div
                class="center"
                v-for="(item, index) in postList[state.currentTennoPanelName]"
              >
                <el-image :src="item.icon" class="itemIcon"></el-image>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-4 mt-10px">
              <div
                class="text-center"
                v-for="(item, index) in postList[state.currentTennoPanelName]"
              >
                <span class="itemName">{{ item.name }}</span>
              </div>
            </div>
          </el-card>
        </template>
      </ryu-skeleton>
    </el-col>
  </el-row>

  <el-dialog
    width="80vw"
    v-model="state.swapDialogVisible"
    top="8vh"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="dialog_title inline-flex">发布交换物品的请求</div>
      <el-switch
        class="inline-flex ml-5px"
        v-model="isDark"
        active-color="#4c4c4c"
        :active-icon="Moonlight"
        :inactive-icon="Sunrise"
        inline-prompt
        @change="toggleDark"
      ></el-switch>
    </template>
    <el-row>
      <el-col :span="24" v-for="(arr, index) in Object.keys(map)">
        <div class="request_wrapper" v-if="index != 1">
          <span class="title" v-if="!index"> 我将提供 </span>
          <div class="icon i-ep-delete" @click="map[arr] = []"></div>
          <div class="item_list">
            <el-row class="justify-center">
              <el-col
                v-if="isPostNotEmpty(map[arr])"
                :span="4"
                v-for="(swapbleItem, index) in map[arr]"
                class="swapbleItemList center animate__animated animate__fadeIn animate__faster"
                @mouseenter="hoverItem(index, arr)"
                @mouseleave="leaveItem()"
              >
                <el-image
                  class="swapbleItem"
                  fit="contain"
                  :src="swapbleItem.icon"
                  :class="{
                    shifted: requiemMods.find((item:swapbleItemClass) => item.name == swapbleItem.name),
                    platiumLarge: currency.find((item:swapbleItemClass) => item.code == swapbleItem.code),
                  }"
                ></el-image>
                <div
                  class="actions_on_post"
                  @click="removeItem(swapbleItem, arr)"
                >
                  <div class="action">
                    {{
                      itemFlag == arr + index ? '点击删除' : swapbleItem.name
                    }}
                  </div>
                </div>
              </el-col>
              <ryu-empty
                v-else
                description="等待选择"
                class="ma-auto"
                :size="70"
              ></ryu-empty>
            </el-row>
          </div>
        </div>
        <div v-else class="center">
          <el-button
            v-for="item in map.button"
            @click="submitSwapItemPost"
            :loading="state.postLoding"
          >
            <span>{{ state.postLoding ? '发布中...' : item }}</span>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <div class="swapbleItemWrapper">
      <el-row>
        <el-col :span="8">
          <div class="tabs">
            <ryu-icon
              v-for="(item, index) in iconTab"
              :icon="item"
              class="icon"
              :class="{ active: index == state.currentIconTab }"
              :size="30"
              @click="switchTab(index)"
            ></ryu-icon>
          </div>
        </el-col>
        <el-col :span="8" class="title">
          <div class="i-ep:info-filled icon"></div>
          <span>目前支持交换的物品如下，请等待后续更新</span>
        </el-col>
        <el-col :span="8"> </el-col>
      </el-row>
      <div class="flex items-center">
        <div class="currency_wrapper">
          <div
            v-for="(currency, index) in currency"
            class="swapbleItemList scroll_item"
            @mouseenter="setActiveMod(currency)"
            @mouseleave="clearActiveMod"
          >
            <el-image
              class="swapbleItem shifted platiumLarge"
              :src="currency.icon"
              fit="contain"
            ></el-image>
            <div
              class="action_wrapper"
              :class="{ visible: selectedItem.code == currency.code }"
            >
              <div class="action" @click="offerPlatium(currency)">提供白金</div>
              <div class="action" @click="requestPlatium(currency)">
                我需要白金
              </div>
            </div>
          </div>
        </div>
        <el-scrollbar>
          <div class="scroll_wrapper">
            <div
              v-for="(swapbleItem, index) in swapbleItemList[
                state.currentIconTab
              ]"
              class="swapbleItemList scroll_item"
              @mouseenter="setActiveMod(swapbleItem)"
              @mouseleave="clearActiveMod"
            >
              <el-image
                class="swapbleItem"
                :src="swapbleItem.icon"
                fit="contain"
                :class="{
                shifted: requiemMods.some((item:swapbleItemClass) => item.name == swapbleItem.name),
                platiumLarge: currency.some((item:swapbleItemClass) => item.code == swapbleItem.code),
              }"
              ></el-image>
              <div
                class="action_wrapper"
                :class="{ visible: selectedItem.code == swapbleItem.code }"
              >
                <div class="action" @click="addOffer(swapbleItem)">
                  我提供它
                </div>
                <div class="action" @click="addRequest(swapbleItem)">
                  我需要它
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  nextTick,
  toRef
} from 'vue'
import {
  requiemMods,
  WarframeParts,
  PrimedGunParts,
  GenericWeaponParts,
  PrimedMeleeWeaponParts,
  currency
} from '@/common'
import { swapbleItemClass } from './Class/swapbleItem'
import { ElNotification } from 'element-plus'
import {
  exchangePost,
  getMySwap,
  removeMySwapPost,
  getTennoSwapPost
} from '@api/market'
import { diffTimeFromNow } from '@utils/DateUtil'
import { authStore } from '@store'
import { useDark, useToggle } from '@vueuse/core'
import Sunrise from '@components/mini/sunrise.vue'
import Moonlight from '@components/mini/moonlight.vue'
import MyWebsocket from '@/request/websocket'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const _authStore = authStore()

const TennoPost = ref<Array<any>>([])
const initTennoSwapPost = async () => {
  const fb = await getTennoSwapPost()
  TennoPost.value = fb.res
}

const copied = ref(false)

const icon = computed(() => {
  return copied.value ? 'i-ep-check' : 'i-ep-document-copy'
})

const copyMessage = (post: any) => {
  if (post.creator.nickname == '') {
    return false
  } else {
    navigator.clipboard
      .writeText(
        '/w ' +
          post.creator.nickname +
          ' ' +
          compoundedSwapMessage(post.request)
      )
      .then((result: any) => {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 3000)
        return result
      })
      .catch((err: any) => {
        return err
      })
  }
}

const compoundedSwapMessage = (request: Array<any>) => {
  let reqNames: string = ''
  if (request.length === 0) {
    return '错误，请向管理员汇报此情况'
  }
  if (request.length === 1) {
    return (
      '你好！我愿意提供你所需的' +
      request[0].name +
      '进行交换. (Warframe Team Up)'
    )
  } else {
    for (let index = 0; index < request.length - 1; index++) {
      reqNames += request[index].name + '、'
    }
    return (
      '你好！我愿意提供你所需的' +
      reqNames +
      request[request.length - 1].name +
      '进行交换. (Warframe Team Up)'
    )
  }
}


let SocketSession = new MyWebsocket('/market_exchange')
let connection = SocketSession.init()

connection.onmessage = function (e: any) {
  let obj: any = JSON.parse(e.data)
  nextTick(() => {
    if (obj.type == 0) {
      // 广播删除
      let d = TennoPost.value.find(
        (item: any) => item.transactionSwap.swapUuid == obj.data
      )
      if (d !== undefined) {
        d.isDeleted = true
        setTimeout(() => {
          TennoPost.value.splice(TennoPost.value.indexOf(d), 1)
        }, 200)
      }
    } else {
      TennoPost.value.unshift(obj)
    }
  })
}

connection.onopen = function (e: any) {
  console.log('已连接至物品交换中心')
}

connection.onclose = function (e: any) {
  console.log('已断开与物品交换中心的连接')
}

const state = reactive({
  isMyPostLoading: false,
  isMyPostRefreshing: false,
  isOtherPostLoading: false,
  swapDialogVisible: false,
  primeDialogVisible: false,
  postLoding: false,
  freshTimestamp: 0,
  currentPanelName: 'offers',
  currentTennoPanelName: 'offers',
  currentIconTab: 0
})

const iconTab = [
  'ep:grape',
  'ep:ice-tea',
  'ep:ice-cream',
  'ep:soccer',
  'ep:cherry'
]
const swapbleItemList = reactive([
  requiemMods,
  WarframeParts,
  PrimedGunParts,
  GenericWeaponParts,
  PrimedMeleeWeaponParts
])

const switchTab = (index: number) => {
  state.currentIconTab = index
}

const switchPanel = () => {
  if (state.currentPanelName == 'offers') {
    state.currentPanelName = 'request'
  } else {
    state.currentPanelName = 'offers'
  }
}

const switchTennoPanel = () => {
  if (state.currentTennoPanelName == 'offers') {
    state.currentTennoPanelName = 'request'
  } else {
    state.currentTennoPanelName = 'offers'
  }
}

const isOffersPanel = computed(() => {
  return state.currentPanelName == 'offers'
})

const isTennoRequestPanel = computed(() => {
  return state.currentTennoPanelName == 'request'
})

const isPostNotEmpty = (arr: Array<swapbleItemClass>) => {
  return arr.length != 0
}
const offerExceed = computed(() => offers.value.length >= 5)
const requestExceed = computed(() => request.value.length >= 5)
const isNullOffer = computed(() => offers.value.length == 0)
const isNullRequest = computed(() => request.value.length == 0)

interface mapModel {
  offers: Array<swapbleItemClass>
  button: Array<string>
  request: Array<swapbleItemClass>
}

interface map {
  offers: swapbleItemClass[]
  button: string
  request: swapbleItemClass[]
}

const map = reactive<mapModel>({
  offers: [],
  button: ['用于交换'],
  request: []
})
const offers = toRef(map, 'offers')
const request = toRef(map, 'request')

const submitSwapItemPost = async () => {
  if (isNullOffer.value || isNullRequest.value) {
    ElNotification({
      title: '提示',
      message: '请至少各选择一个物品',
      type: 'error'
    })
    return false
  }
  state.postLoding = true
  map.offers = offers.value
  map.request = request.value
  const fb = await exchangePost(map)
  console.log(map)

  if (fb.res) {
    ElNotification({
      title: '提示',
      message: '发布成功',
      type: 'success',
      duration: 800,
      offset: 70
    })
    myPost.value.unshift(fb.res)
    toggleSwapTransactionDialog()
    state.postLoding = false
  } else {
    ElNotification({
      title: '提示',
      message: fb.msg,
      type: 'error'
    })
    state.postLoding = false
  }
}

const setActiveMod = (swapbleItem: swapbleItemClass) => {
  selectedItem.code = swapbleItem.code
  selectedItem.name = swapbleItem.name
  selectedItem.icon = swapbleItem.icon
}

const clearActiveMod = () => {
  selectedItem.code = null
  selectedItem.name = ''
  selectedItem.icon = ''
}

const selectedItem = reactive<swapbleItemClass>({
  code: null,
  name: '',
  icon: ''
})

const addOffer = (swapbleItem: swapbleItemClass) => {
  if (offerExceed.value) {
    ElNotification({
      title: '提示',
      message: '最多只能提供5个物品',
      type: 'warning'
    })
    return false
  }
  var isCurrency = currency.some(
    (item: swapbleItemClass) => item.code == swapbleItem.code
  )
  offers.value.push(swapbleItem)
}

const addRequest = (swapbleItem: swapbleItemClass) => {
  if (requestExceed.value) {
    ElNotification({
      title: '提示',
      message: '最多只能交换5个物品',
      type: 'warning'
    })
    return false
  }
  request.value.push(swapbleItem)
}

const offerPlatium = (currency: swapbleItemClass) => {
  if (offerExceed.value) {
    ElNotification({
      title: '提示',
      message: '最多只能提供5个物品',
      type: 'warning'
    })
    return false
  }
  togglePlatiumInput(1, currency)
}

const requestPlatium = (currency: swapbleItemClass) => {
  if (requestExceed.value) {
    ElNotification({
      title: '提示',
      message: '最多只能交换5个物品',
      type: 'warning'
    })
    return false
  }
  togglePlatiumInput(0, currency)
}

const togglePlatiumInput = (type: number, currency: swapbleItemClass) => {
  ElMessageBox.prompt('输入数量', '提供白金', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^[0-9]*$/,
    inputErrorMessage: '请输入数字'
  })
    .then(({ value }) => {
      if (type) {
        var indexa = offers.value.indexOf(currency)
        var indexb = request.value.indexOf(currency)
        if (indexa == -1) {
          if (indexb != -1) {
            request.value.splice(indexb, 1)
          }
          currency.name = value
          offers.value.push(currency)
        } else {
          offers.value[indexa].name = value
        }
      } else {
        var indexa = offers.value.indexOf(currency)
        var indexb = request.value.indexOf(currency)
        if (indexb == -1) {
          if (indexa != -1) {
            offers.value.splice(indexa, 1)
          }
          currency.name = value
          request.value.push(currency)
        } else {
          request.value[indexb].name = value
        }
      }
      return true
    })
    .catch(() => {
      return false
    })
}

const itemFlag = ref('')
const removeItem = (swapbleItem: swapbleItemClass, arrName: string) => {
  map[arrName].splice(map[arrName].indexOf(swapbleItem), 1)
}
const hoverItem = (index: number, name: string) => {
  itemFlag.value = name + index
}

const leaveItem = () => {
  itemFlag.value = ''
}

const myPost = ref([] as Array<any>)
const getMySwapPost = async () => {
  state.isMyPostLoading = true
  const fb = await getMySwap()
  myPost.value = fb.res
  state.isMyPostLoading = false
}

const refreshMyPost = async () => {
  if (state.freshTimestamp + 1000 > Date.now()) {
    return false
  } else {
    state.isMyPostRefreshing = true
    state.freshTimestamp = Date.now()
    const fb = await getMySwap()
    myPost.value = fb.res
    state.isMyPostRefreshing = false
  }
}

const refreshTennoPost = async () => {
  if (state.freshTimestamp + 1000 > Date.now()) {
    return false
  } else {
    state.isMyPostRefreshing = true
    state.freshTimestamp = Date.now()
    const fb = await getMySwap()
    myPost.value = fb.res
    state.isMyPostRefreshing = false
  }
}

const removeMyPost = async (swapUuid: string, index: number) => {
  const fb = await removeMySwapPost(swapUuid)
  if (fb.res) {
    ElNotification({
      title: '提示',
      message: '删除成功',
      type: 'success',
      duration: 800,
      offset: 70
    })
    myPost.value[index].isDeleted = true
    let e = {
      type: 0,
      description: '更新SwapPost',
      data: swapUuid
    }
    SocketSession.delete(e)
    setTimeout(() => {
      myPost.value.splice(index, 1)
    }, 200)
  } else {
    ElNotification({
      title: '提示',
      message: fb.msg,
      type: 'error'
    })
  }
}

const toggleSwapTransactionDialog = () => {
  state.swapDialogVisible = !state.swapDialogVisible
}

onMounted(() => {
  getMySwapPost()
  initTennoSwapPost()
})
onUnmounted(() => {
  SocketSession.close()
})
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding: 20px;
  .trade_post {
    position: relative;
    padding: 0 10px;
    &:hover {
      .text {
        color: var(--el-text-color-primary);
      }
    }
    .icony {
      display: inline-block;
      font-size: 2rem;
      margin-right: 10px;
      color: var(--el-text-color-secondary);
      &:hover {
        cursor: pointer;
        color: var(--el-text-color-primary);
      }
    }
    .text {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 10px 0;
      color: var(--el-text-color-secondary);
    }
  }
  .itemIcon {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .itemName {
    font-size: 1.05rem;
    font-weight: 600;
    text-align: center;
    color: var(--el-text-color-secondary);
  }
}
.scroll_item {
  flex-shrink: 0;
  text-align: center;
  border-radius: 4px;
}
.swapbleItemWrapper {
  position: relative;
  width: 100%;
  .tabs {
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 0 20px;
    z-index: 10;
    .icon {
      transition: all 0.22s ease-in-out;
      font-size: 2rem;
      &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
        transform: scale(1.07);
        border-bottom: 1px solid #fafafa;
      }
      &.active {
        color: var(--el-color-primary);
      }
    }
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-text-color-secondary);
    font-size: 0.88rem;

    .icon {
      transform: translateY(2px);
      margin-right: 5px;
    }
  }
}
.currency_wrapper {
  display: flex;
  height: 115px;
  width: 200px;
  align-items: center;
  z-index: 2;
  background-color: inherit;
}
.scroll_wrapper {
  display: flex;
  height: 150px;
  align-items: center;
  position: relative;
  margin-bottom: 5px;
}
.swapbleItemList {
  margin: 0 10px;
  height: 115px;
  width: 200px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.22s ease-in-out;
  position: relative;

  .action_wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    display: flex;
    justify-content: space-around;
    &:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.527);
    }
    &.visible {
      background-color: rgba(0, 0, 0, 0.538);
      opacity: 1;
    }
    .action {
      width: 100%;
      height: 100%;
      opacity: 1;
      height: 33px;
      line-height: 33px;
      user-select: none;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      z-index: 3;
      color: var(--el-text-color-secondary);
      &:hover {
        color: #fff;
        cursor: pointer;
        border-bottom: 1px solid #fafafa92;
        opacity: 1;
      }
    }
  }
  .actions_on_post {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 1;
    display: flex;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.842);
    .action {
      width: 100%;
      height: 100%;
      opacity: 1;
      height: 33px;
      line-height: 33px;
      user-select: none;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      z-index: 3;
      color: var(--el-text-color-secondary);
      &:hover {
        color: #fff;
        cursor: pointer;
        border-bottom: 1px solid #fafafa92;
        opacity: 1;
      }
    }
  }

  .swapbleItem {
    &:hover {
      cursor: pointer;
    }
  }

  .shifted {
    transform: translateY(17%);
  }
  .platiumLarge {
    &:hover {
      transform: scale(0.6);
    }
    transition: all 0.22s ease-in-out;
    transform: scale(0.55);
  }
}
.request_wrapper {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .title {
    position: absolute;
    top: -30px;
  }
  .icon {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 2rem;
    color: var(--el-text-color-secondary);
    &:hover {
      cursor: pointer;
      color: var(--el-text-color-primary);
    }
  }
  .item_list {
    width: 86%;
  }
}

.post_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
  .timeBefore {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    .text {
      font-size: 0.88rem;
    }
  }
}
.state {
  font-size: 0.88rem;
  color: var(--el-text-color-secondary);
}
.cards {
  margin-top: 20px;
}

.rotate {
  &:hover {
    animation: rotate 1s ease-in-out infinite reverse;
  }
}

.scaleUp {
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
