<template>
  <el-row :gutter="20" class="options">
    <el-col
      :span="isIndex ? 4 : sban(route)"
      v-for="(route, andex) in childRoute"
      style="transition: all 0.32s ease-out"
    >
      <el-card
        class="relic_card"
        @click="setActiveCard(route, andex)"
        :shadow="currentRoutePath == route.path ? 'always' : 'never'"
      >
        <template #header> {{ route.name }}遗物 </template>
        <el-row>
          <el-col
            :span="6"
            v-for="(relic, bndex) in RelicLevelFour"
            class="relic_wrapper"
          >
            <relic-icon
              class="relic"
              :class="{ active: currentRoutePath == route.path }"
              :size="90"
              :level="relic.label"
              :tierNum="andex + 1"
              :enableName="false"
            >
            </relic-icon>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <section v-if="isIndex" class="article">
    <el-carousel :interval="6000" class="w-50vw h-50vh">
      <el-carousel-item v-for="item in relics" :key="item">
        <div class="center flex-col h-100%">
          <el-image :src="item.icon" style="opacity: 0.8"> </el-image>
          <span class="text-center">{{ item.name }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <article class="text">
      <div class="title">遗物是什么？</div>
      <div class="paragraph">俗称：核桃</div>
      <div class="paragraph">种类：虚空遗物 -> 古纪，前纪、中纪、后纪</div>
      <div class="paragraph">种类：安魂遗物 -> 安魂遗物</div>
      <div class="paragraph">等级：完整，优良、无暇、光辉</div>
      <div class="paragraph">
        入手方法：虚空遗物一般作为任务奖励出现，如挖掘、生存、防御、中断、叛逃和拦截。你也可以使用集团声望兑换遗物组合包来获取
        <p class="paragraph" />
        注意：安魂遗物只能通过完成赤毒虹吸器任务或击杀赤毒奴仆、猎犬获得
      </div>
      <div class="paragraph">
        注意：虚空遗物有轮换机制，入库后，该遗物在一段时间内无法获取，玩家仓库中的对应遗物不会被系统回收
      </div>
      <div class="paragraph">
        如何使用：你可以在加入虚空裂缝的队伍时选择自己的遗物的种类与等级，并在途中收集10个虚空反应物来破开遗物，如此，在结算时即可选择奖励
      </div>
    </article>
  </section>
  <RouterView></RouterView>
  <!-- <el-row :gutter="20">
    <el-col :span="fissureListSpan[0]">
      <div class="title">
        <span class="name">虚空裂缝</span>
        <div
          class="icon i-ep:refresh"
          :class="{
            icon_rotating:
              loadingState.normalFissureLoading ||
              _fissureStore.getNormalFissureCount() == 0
          }"
          @click="initNormalFissure"
        ></div>
      </div>
    </el-col>
    <el-col :span="fissureListSpan[1]">
      <div class="title">
        <span class="name">虚空裂缝&nbsp;-&nbsp;钢铁之路</span>
        <div
          class="i-ep:refresh icon"
          :class="{
            icon_rotating:
              loadingState.hardFissureLoading ||
              _fissureStore.getStormFissureCount() == 0
          }"
          @click="initHardFissure"
        ></div>
      </div>
    </el-col>
    <el-col :span="fissureListSpan[2]">
      <div class="title">
        <span class="name">虚空裂缝&nbsp;-&nbsp;九重天</span>
        <div
          class="i-ep:refresh icon"
          :class="{
            icon_rotating:
              loadingState.stormFissureLoading ||
              _fissureStore.getStormFissureCount() == 0
          }"
          @click="initStormFissure"
        ></div>
      </div>
    </el-col>
    <el-col :span="fissureListSpan[3]" class="text-center">
      <div class="title" v-if="selectedFissure.fissureId">
        <div class="name">
          <span class="pl-5px pr-5px">{{ selectedFissure.tier }}</span>
          <span class="pl-5px pr-5px">{{ selectedFissure.missionType }}</span>
          <span class="pl-5px pr-5px">{{ selectedFissure.node }}的队伍</span>
        </div>
        <div
          class="i-ep:refresh icon"
          :class="{ icon_rotating: loadingState.getTeamsLoading }"
          @click="reloadTeamList"
        ></div>
      </div>
      <div class="title" v-else><span>选择一个裂缝来查看队伍</span></div>
    </el-col>
  </el-row> -->
  <!-- <ryuSkeleton
    :loading="initFissureListLoading"
    :hasResult="_fissureStore.isNotNull()"
  >
    <template #content>
      <el-row :gutter="20">
        <el-col
          v-for="(fissureList, index) in _fissureStore.getSortedFissureList()"
          :span="fissureListSpan[index]"
          class="animate__animated animate__fadeIn animate__fast"
        >
          <el-row>
            <el-col
              v-for="fissure in fissureList"
              :span="fissureFlag == fissure.id ? 24 : fissureSpan"
              style="transition: all 0.13s ease-in-out"
            >
              <el-card
                :shadow="
                  selectedFissure.fissureId == fissure.id ? 'always' : 'hover'
                "
                class="cards cursor-pointer"
                @mouseenter="onMouseEnterFissureCard(fissure.id)"
                @mouseleave="onMouseLeaveFissureCard(fissure.id)"
                @click="
                  showTeams(
                    fissure.id,
                    fissure.tier,
                    fissure.missionType,
                    fissure.node
                  )
                "
              >
                <el-row>
                  <el-col :span="20">
                    <div class="flex items-center">
                      <div class="i-ep-clock"></div>
                      <el-countdown
                        class="pb-4px"
                        :format="
                          isSameHour(fissure.expiry)
                            ? 'mm分ss秒'
                            : 'H小时mm分ss秒'
                        "
                        :value="
                          converUTCToTimeStamp(fissure.expiry) + 1000 * 30
                        "
                      ></el-countdown>
                    </div>
                    <div v-if="fissureFlag == fissure.id" class="flex flex-col">
                      <div class="flex items-center mt-5px">
                        <div class="i-ep:pear mr-5px"></div>
                        <div>{{ fissure.tier }}&nbsp;&nbsp;</div>
                        <div>{{ fissure.missionType }}</div>
                      </div>
                      <div class="flex mt-5px">
                        <div
                          class="i-ep:wind-power mr-5px mt-5px text-size-[1.1rem]"
                        ></div>
                        <div>{{ fissure.node }}</div>
                      </div>
                    </div>
                    <div v-else class="flex items-center">
                      <div class="i-ep:wind-power mr-5px"></div>
                      <div>{{ fissure.tier }}&nbsp;&nbsp;</div>
                      <div>{{ fissure.missionType }}</div>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-if="fissureFlag === fissure.id"
                      text
                      @click.stop="
                        OpenCreateTeamsDialog(
                          fissure.id,
                          fissure.tier,
                          fissure.tierNum,
                          fissure.missionType,
                          fissure.node,
                          fissure.isHard
                        )
                      "
                    >
                      <div class="i-ep-plus text-size-[1.4rem]"></div>
                    </el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="fissureListSpan[3]">
          <ryuSkeleton
            :loading="loadingState.getTeamsLoading"
            :hasResult="teamList.length > 0"
            :description="selectedFissure.fissureId ? '暂无队伍' : '尚未选择'"
            :image="
              selectedFissure.fissureId
                ? 'https://www.neorae.cn/data/image/empty.svg'
                : 'https://www.neorae.cn/data/image/compass.svg'
            "
          >
            <template #content>
              <XkywTeam :teams="teamList" @removeTeam="removeTeam"></XkywTeam>
            </template>
          </ryuSkeleton>
        </el-col>
      </el-row>
    </template>
  </ryuSkeleton> -->
  <el-dialog
    v-model="createTeamsDialog"
    @close="destroyDialog"
    @closed="resetContent"
    @open="resetContent"
    width="70vw"
  >
    <template #header>
      <span class="mission_discription">
        {{ createTeamsForm.difficultyName }}&nbsp;-&nbsp;
      </span>
      <span class="mission_discription"
        >{{ createTeamsForm.tier }}&nbsp;-&nbsp;</span
      >
      <span class="mission_discription"
        >{{ createTeamsForm.missionType }}&nbsp;-&nbsp;</span
      >
      <span class="mission_discription">{{ createTeamsForm.node }}</span>
    </template>
    <div class="dialog_wrapper">
      <div class="mission_image">
        <relic-icon
          :tierNum="createTeamsForm.tierNum"
          :level="createTeamsForm.relicLevel"
          :code="createTeamsForm.code"
          :tier="createTeamsForm.tier"
          :size="400"
        ></relic-icon>
      </div>
      <el-carousel
        trigger="click"
        class="mission_form"
        :loop="false"
        :autoplay="false"
        direction="vertical"
        ref="carousel"
        @change="saveIndex"
      >
        <el-form
          :model="createTeamsForm"
          :rules="createTeamsFormRule"
          ref="createTeamsFormRef"
          label-position="top"
        >
          <el-carousel-item key="1" class="center">
            <el-form-item label="所需虚空遗物" prop="code">
              <div class="flex w-100%">
                <div class="w-57px">{{ createTeamsForm.tier }}&nbsp;-</div>
                <el-input
                  v-model="createTeamsForm.code"
                  placeholder="请填写遗物代码，如N10，S12，默认为任意"
                  style="width: 84%"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="遗物等级" prop="relicLevel">
              <el-radio-group v-model="createTeamsForm.relicLevel">
                <el-radio
                  v-for="option in RelicLevel"
                  :label="option.label"
                  border
                >
                  {{ option.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务描述" prop="title">
              <el-input
                v-model="createTeamsForm.title"
                placeholder="比如开多少个、是否为垃圾车"
                style="width: 94%"
              ></el-input>
            </el-form-item>
          </el-carousel-item>
          <el-carousel-item key="2">
            <el-form-item>
              <div class="w-100%">
                <el-row>
                  <el-col :span="createTeamSpanList[0]" class="text-center"
                    >我的</el-col
                  >
                  <el-col :span="createTeamSpanList[1]">战甲</el-col>
                  <el-col :span="createTeamSpanList[2]">专精</el-col>
                  <el-col :span="createTeamSpanList[0]">
                    <div
                      class="i-ep-user text-size-[2.0rem] ma-auto"
                      v-if="createTeamsForm.myBuild.warframe == '任意'"
                    ></div>
                    <WarframeIcon
                      v-else
                      :warframe-name="createTeamsForm.myBuild.warframe"
                      :width="55"
                      :nameVisible="false"
                    ></WarframeIcon>
                  </el-col>
                  <el-col
                    :span="createTeamSpanList[1]"
                    class="h-50px flex items-center"
                  >
                    <el-select-v2
                      v-model="createTeamsForm.myBuild.warframe"
                      @visible-change="disableWindowScroll"
                      filterable
                      remote
                      :remote-method="searchWarframes"
                      clearable
                      :options="options"
                      :loading="loadingState.searchWarframeLoading"
                      placeholder="检索.."
                      style="width: 190px"
                    />
                  </el-col>
                  <el-col
                    :span="createTeamSpanList[2]"
                    class="h-50px flex items-center justify-between"
                  >
                    <FocusIcons
                      v-model="createTeamsForm.myBuild.focus"
                    ></FocusIcons>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <el-row>
                  <el-col :span="createTeamSpanList[0]" class="text-center"
                    >招募</el-col
                  >
                  <el-col :span="createTeamSpanList[1]">战甲</el-col>
                  <el-col :span="createTeamSpanList[2]">专精</el-col>
                  <div
                    v-for="(item, index) in createTeamsForm.recruit"
                    class="wsxWrapper"
                    :class="{ margin10: index == 1 }"
                  >
                    <el-col :span="createTeamSpanList[0]">
                      <div
                        class="i-ep-user text-size-[2.0rem] ma-auto"
                        v-if="createTeamsForm.recruit[index].warframe == '任意'"
                      ></div>
                      <WarframeIcon
                        v-else
                        :warframe-name="createTeamsForm.recruit[index].warframe"
                        :width="55"
                        :nameVisible="false"
                      ></WarframeIcon>
                    </el-col>
                    <el-col :span="createTeamSpanList[1]">
                      <el-select-v2
                        v-model="createTeamsForm.recruit[index].warframe"
                        @visible-change="disableWindowScroll"
                        style="width: 190px"
                        filterable
                        remote
                        :remote-method="searchWarframes"
                        clearable
                        :options="options"
                        :loading="loadingState.searchWarframeLoading"
                        placeholder="检索.."
                      />
                    </el-col>
                    <el-col
                      :span="createTeamSpanList[2]"
                      class="flex items-center justify-between"
                    >
                      <FocusIcons
                        v-model="createTeamsForm.recruit[index].focus"
                      ></FocusIcons>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="ml-20px"
                type="primary"
                @click="createTeams(createTeamsFormRef)"
                :loading="loadingState.createTeamsLoading"
              >
                {{ loadingState.createTeamsLoading ? '创建中...' : '创建' }}
              </el-button>
            </el-form-item>
          </el-carousel-item>
        </el-form>
      </el-carousel>
      <div class="position-absolute w-75% h-30px text-center right-0 bottom-0">
        第{{ currentCarouselIndex + 1 }}步&nbsp;/&nbsp;共2步
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { warframes, RelicLevel, RelicLevelFour, relics } from '@common'
import { CardInstance, ElNotification } from 'element-plus'
import { isSameHour, converUTCToTimeStamp } from '@utils/DateUtil'
import ryuSkeleton from '@components/ryuSkeleton.vue'
import { createTeamsFormModel, labelValue, selectedRelicModel } from '@models'
import type { FormInstance, CarouselInstance, FormRules } from 'element-plus'
import { createTeam, getTeams } from '@api/team'
import router from '@routes'
import { fissureStore, authStore } from '@store'
import WarframeIcon from '@components/warframeIcon.vue'
import FocusIcons from '@components/FocusIcons.vue'
import { getFocusName } from '@utils/CommonUtil'
import { reloadFissureList } from '@api/warframe'
import XkywTeam from '@components/xkywTeam.vue'
import { useRouter } from 'vue-router'
import { useElementStyle, useElementTransform } from '@vueuse/motion'
import { menuStore } from '@store'
import { getItemData } from '@api/warframe'
const sban = (route: any) => {
  if (currentRoutePath.value == route.path) {
    return 8
  } else {
    return 4
  }
}
const setActiveCard = (route: any, index: number) => {
  router.push({
    path: route.path
  })
}

const _useRouter = useRouter()

const isIndex = computed(() => {
  return currentRoutePath.value == '/relics'
})

const matchedRoute = computed(() => {
  return _useRouter.currentRoute.value.matched[2]
})

const currentRoutePath = computed(() => {
  return _useRouter.currentRoute.value.path
})

const childRoute = computed(() => {
  return matchedRoute.value.children
})
const _fissureStore = fissureStore()
const _authStore = authStore()

const createTeamSpanList = ref<number[]>([2, 8, 14])
const fissureListSpan = ref<number[]>([4, 4, 4, 12])

const fissureSpan = ref<number>(18)
const options = ref<labelValue[]>([])

const loadingState = reactive({
  createTeamsLoading: false,
  getTeamsLoading: false,
  deleteMyTeamLoading: false,
  normalFissureLoading: false,
  hardFissureLoading: false,
  stormFissureLoading: false,
  searchWarframeLoading: false,
  loadingCompletedFissure: 0
})

const initFissureListLoading = computed(() => {
  return (
    loadingState.loadingCompletedFissure ===
    _fissureStore.getSortedFissureList().length
  )
})

const initNormalFissure = async () => {
  loadingState.normalFissureLoading = true
  const fb = await reloadFissureList()
  _fissureStore.setFissureList(fb)
  if (_fissureStore.getNormalFissureCount() > 0) {
    loadingState.loadingCompletedFissure++
    loadingState.normalFissureLoading = false
  }
}

const initHardFissure = async () => {
  loadingState.hardFissureLoading = true
  const fb = await reloadFissureList()
  _fissureStore.setFissureList(fb)
  if (_fissureStore.getHardFissureCount() > 0) {
    loadingState.loadingCompletedFissure++
    loadingState.hardFissureLoading = false
  }
}

const initStormFissure = async () => {
  loadingState.stormFissureLoading = true
  const fb = await reloadFissureList()
  _fissureStore.setFissureList(fb)
  if (_fissureStore.getStormFissureCount() > 0) {
    loadingState.loadingCompletedFissure++
    loadingState.stormFissureLoading = false
  }
}

const warframeList = warframes.map((item): labelValue => {
  return { value: `${item.name}`, label: `${item.name}` }
})

const searchWarframes = (query: string) => {
  if (query !== '') {
    loadingState.searchWarframeLoading = true
    setTimeout(() => {
      loadingState.searchWarframeLoading = false
      options.value = warframeList.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const fissureFlag = ref<string>('')
const onMouseEnterFissureCard = (fissureId: string) => {
  fissureFlag.value = fissureId
}

const onMouseLeaveFissureCard = (fissureId: string) => {
  if (selectedFissure.fissureId == fissureId) {
    return false
  } else {
    fissureFlag.value = selectedFissure.fissureId
  }
}

const selectedFissure = reactive<any>({
  fissureId: null,
  node: '',
  missionType: '',
  tier: ''
})
const teamList = ref<any[]>([])
const showTeams = async (
  fissureId: string,
  tier: string,
  missionType: string,
  node: string
) => {
  loadingState.getTeamsLoading = true
  selectedFissure.fissureId = fissureId
  selectedFissure.tier = tier
  selectedFissure.missionType = missionType
  selectedFissure.node = node
  _fissureStore.setMarkedFissure(fissureId)
  window.scrollTo(0, 770)
  initTeamList()
  loadingState.getTeamsLoading = false
}

const initTeamList = async () => {
  const fb = await getTeams(selectedFissure.fissureId)
  teamList.value = fb.res
}

const removeTeam = (index: number) => {
  setTimeout(() => {
    teamList.value.splice(index, 1)
  }, 100)
}

const reloadTeamList = () => {
  loadingState.getTeamsLoading = true
  initTeamList()
  loadingState.getTeamsLoading = false
}

const createTeamsDialog = ref<boolean>(false)

let createTeamsForm = reactive<createTeamsFormModel>({
  fissureId: '',
  tierNum: 0,
  tier: '',
  missionType: '',
  difficulty: 0,
  difficultyName: '',
  node: '',
  code: '任意',
  relicLevel: 0,
  title: '',
  myBuild: {
    warframe: '任意',
    focus: 0,
    focusName: ''
  },
  recruit: [
    {
      warframe: '任意',
      focus: 0,
      focusName: ''
    },
    {
      warframe: '任意',
      focus: 0,
      focusName: ''
    },
    {
      warframe: '任意',
      focus: 0,
      focusName: ''
    }
  ]
})

const carousel = ref<CarouselInstance>()
const titleValidator = (rule: any, value: string, callback: any) => {
  if (value.trim() === '') {
    carousel.value?.setActiveItem('0')
    callback(new Error('请输入标题'))
  } else {
    callback()
  }
}

const levelValidator = (rule: any, value: number, callback: any) => {
  if (value === null && carousel.value) {
    carousel.value?.setActiveItem('0')
    callback(new Error('请选择遗物等级'))
  } else {
    callback()
  }
}

const createTeamsFormRule = reactive<FormRules>({
  title: [
    {
      min: 1,
      max: 20,
      message: '标题长度在 1 到 20 个字符',
      trigger: ['blur', 'change']
    },
    { required: true, validator: titleValidator }
  ],
  relicLevel: [
    { required: true, message: '请选择遗物等级', validator: levelValidator }
  ]
})

const timer = ref<number>(-1)
const handleScroll = (e: any) => {
  if (carousel.value) {
    let currentTimestamp = new Date().getTime()
    if (currentTimestamp - timer.value > 200) {
      timer.value = currentTimestamp
      if (e.wheelDelta > 0) {
        carousel.value.prev()
      } else {
        carousel.value.next()
      }
    } else {
      return false
    }
  }
}

const currentCarouselIndex = ref<number>(0)
const saveIndex = (pre: number, curret: number) => {
  currentCarouselIndex.value = pre
}

const OpenCreateTeamsDialog = (
  fissureId: string,
  tier: string,
  tierNum: number,
  missionType: string,
  node: string,
  isHard: boolean
) => {
  if (_authStore.checkToken()) {
    createTeamsDialog.value = true
    createTeamsForm.tier = tier
    createTeamsForm.tierNum = tierNum
    createTeamsForm.missionType = missionType
    createTeamsForm.node = node
    createTeamsForm.fissureId = fissureId
    if (typeof isHard === 'boolean') {
      if (isHard) {
        createTeamsForm.difficultyName = '钢铁之路'
        createTeamsForm.difficulty = 1
      } else {
        createTeamsForm.difficultyName = '普通难度'
        createTeamsForm.difficulty = 0
      }
    } else {
      createTeamsForm.difficultyName = '九重天'
      createTeamsForm.difficulty = -1
    }
    selectedFissure.fissureId = fissureId
    selectedFissure.tier = tier
    selectedFissure.missionType = missionType
    selectedFissure.node = node
  } else {
    router.push({
      name: '登录'
    })
  }

  window.addEventListener('mousewheel', handleScroll)
}

const createTeamsFormRef = ref<FormInstance>()
const createTeams = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      loadingState.createTeamsLoading = true
      createTeamsForm.title = createTeamsForm.title.trim()
      createTeamsForm.myBuild.focusName = getFocusName(
        createTeamsForm.myBuild.focus
      )
      createTeamsForm.recruit.forEach((item: any) => {
        item.focusName = getFocusName(item.focus)
      })
      const fb = await createTeam(createTeamsForm)
      if (fb.status === '200') {
        createTeamsDialog.value = false
        resetContent()
        const fb1 = await getTeams(createTeamsForm.fissureId)
        teamList.value = fb1.res
        ElNotification({
          title: '创建成功',
          type: 'success',
          offset: 70
        })
      } else if (fb.status === '401') {
        ElNotification({
          title: '正在跳转至登录页',
          message: fb.msg,
          type: 'warning',
          offset: 70,
          duration: 2500
        })
        setTimeout(() => {
          router.push({
            name: '登录'
          })
        }, 1000)
      } else {
        ElNotification({
          title: '创建失败',
          message: fb.msg,
          type: 'error',
          offset: 70,
          duration: 2500
        })
      }
      loadingState.createTeamsLoading = false
    } else {
      loadingState.createTeamsLoading = false
      return false
    }
  })
}

const destroyDialog = () => {
  window.removeEventListener('mousewheel', handleScroll)
}

const disableWindowScroll = (state: boolean) => {
  if (state) {
    window.removeEventListener('mousewheel', handleScroll)
  } else {
    options.value = []
    window.addEventListener('mousewheel', handleScroll)
  }
}

const resetContent = () => {
  currentCarouselIndex.value = 0
  carousel.value?.setActiveItem('0')
  createTeamsFormRef.value?.clearValidate()
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10rem;

  .title {
    font-size: 2rem;
    text-align: center;
    color: var(--el-text-color-secondary);
  }

  .text {
    color: var(--el-text-color-secondary);

    .paragraph {
      font-size: 1.2rem;
      margin: 1rem 0;
    }
  }
}

.options {
  padding: 1rem 0;
}

.relic_card {
  user-select: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);

    .relic {
      filter: blur(0px);
      opacity: 0.87;
    }
  }

  .relic {
    transition: filter 0.33s ease-in-out;
    filter: blur(1px);
    opacity: 0.47;
  }

  .active {
    opacity: 0.77;
    filter: blur(0px);
  }
}

.cards:nth-child(n-1) {
  margin-top: 20px;
}

.dialog_wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 50vh;
  width: 100%;

  .mission_image {
    width: 35%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .mission_form {
    position: absolute;
    top: 0;
    right: 0;
    width: 65%;
    height: 100%;
    padding-right: 12px;

    .wsxWrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .margin10 {
      margin: 10px 0;
      padding: 10px 0;
    }
  }
}

.mission_discription {
  font-size: 1.2rem;
  font-weight: 600;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(-360deg);
  }
}

:deep(.el-card__body) {
  padding: 0px;
}
:deep(.el-carousel__container) {
  height: 440px;
}
</style>
