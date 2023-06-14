import { defineStore } from 'pinia'
import type {
  notifyModel,
  relicLevelModel,
  menu,
  selectedRelicModel,
  animationStoreModel
} from '@models'

interface authModel extends userModel {
  isTokenValid: boolean
  tip: string
}

interface userModel {
  uuid: string
  nickname: string
  avatar: string
  description: string
  email: string
  state: number
}

interface Component {
  __name: string
}

interface compoModel {
  name: string
  component: Component
}

interface cycleUpdatingStatusModel {
  status: boolean
  cycleId: string
}

export const componentStore = defineStore({
  id: 'component',
  state: () => ({
    componentList: [] as Array<compoModel>
  }),
  actions: {
    setComponentList(componentList: Array<compoModel>) {
      this.componentList = componentList ? componentList : []
    },
    getComponentList(): Array<any> {
      return this.componentList
    },
    addComponent(component: Component) {
      let compo = {
        component: component,
        name: component.__name
      }
      this.componentList.push(compo)
    },
    removeComponent(component: any) {
      this.componentList = this.componentList.filter(
        (item: any) => item.id !== component.id
      )
    },
    getComponentByName(name: string): Component | boolean {
      let e = this.componentList.find((item: compoModel) => item.name === name)
      if (e !== undefined) {
        if (e.component !== undefined) {
          return e.component
        }
      }
      return false
    }
  }
})

export const authStore = defineStore({
  id: 'auth',
  state: (): authModel => ({
    isTokenValid: false,
    uuid: '',
    nickname: '',
    avatar: '',
    description: '',
    email: '',
    tip: '',
    state: -1
  }),

  persist: {
    key: 'neorae',
    paths: [
      'isTokenValid',
      'uuid',
      'nickname',
      'avatar',
      'description',
      'email',
      'tip',
      'state'
    ],
    storage: sessionStorage
  },

  actions: {
    setTip(tip: string): void {
      this.tip = tip
    },
    getTip(): string {
      return this.tip
    },
    removeTip(): void {
      this.tip = ''
    },
    setStatus(isTokenValid: boolean, user: userModel): void {
      this.isTokenValid = isTokenValid

      if (isTokenValid) {
        this.uuid = user.uuid
        this.nickname = user.nickname
        this.avatar = user.avatar
        this.description = user.description
        this.email = user.email
        this.state = user.state
      }
    },
    getStatus(): number {
      return this.state
    },
    getState(): number {
      return this.state
    },
    updateStatus(state: number): void {
      this.state = state
    },
    clearStatus(): void {
      this.isTokenValid = false
      this.uuid = ''
      this.nickname = ''
      this.avatar = ''
      this.description = ''
      this.email = ''
      this.state = -1
    },
    getNickname(): string {
      return this.nickname
    },
    getAvatar(): string {
      return this.avatar
    },
    getEmail(): string {
      return this.email
    },
    getUUID(): string {
      return this.uuid
    },
    getDescription(): string {
      return this.description
    },
    setNickname(nickname: string): void {
      this.nickname = nickname
    },
    checkToken(): boolean {
      return this.isTokenValid
    }
  }
})

export const menuStore = defineStore({
  id: 'menu',
  state: () => ({
    menu: [] as Array<menu>,
    defaultPath: ''
  }),
  actions: {
    setMenu(menu: Array<menu>) {
      this.menu = menu ? menu : []
    },
    getMenu(): Array<menu> {
      return this.menu
    },
    setDefaultPath(path: string) {
      this.defaultPath = path
    },
    getDefaultPath(): string {
      return this.defaultPath
    }
  },
  persist: {
    key: 'menu',
    storage: sessionStorage
  }
})

export const fissureStore = defineStore({
  id: 'fissure',
  state: () => ({
    fissureList: [] as Array<any>,
    sortedFissureList: [] as Array<any>
  }),
  actions: {
    isNotNull(): boolean {
      return this.fissureList.length > 0
    },
    setFissureList(fissureList: Array<any>) {
      this.fissureList = fissureList ? fissureList : []
      this.sortedFissureList = []
      this.sortedFissureList.push(this.getSortedNormalFissure())
      this.sortedFissureList.push(this.getSortedHardFissure())
      this.sortedFissureList.push(this.getSortedStormFissure())
    },
    getSortedFissureList(): Array<any> {
      return this.sortedFissureList
    },
    getFissureList(): Array<any> {
      return this.fissureList
    },
    clearFissureList(): void {
      this.fissureList = []
    },
    addFissure(fissure: Object) {
      this.fissureList.push(fissure)
    },
    getNormalFissure(): Array<any> {
      return this.fissureList.filter(
        (item: any) =>
          item.isStorm === false &&
          item.expired === false &&
          item.active === true &&
          item.isHard === false
      )
    },
    getNormalFissureCount(): number {
      return this.getNormalFissure().length
    },
    getSortedNormalFissure(): Array<any> | boolean {
      return this.fissureList
        .filter(
          (item: any) =>
            item.isStorm === false &&
            item.expired === false &&
            item.active === true &&
            item.isHard === false
        )
        .sort(function (a: any, b: any) {
          return a.tierNum - b.tierNum
        })
    },
    getStormFissure(): Array<any> {
      return this.fissureList.filter(
        (item: any) =>
          item.isStorm === true &&
          item.expired === false &&
          item.active === true
      )
    },
    getStormFissureCount(): number {
      return this.getStormFissure().length
    },
    getSortedStormFissure(): Array<any> {
      return this.fissureList
        .filter(
          (item: any) =>
            item.isStorm === true &&
            item.expired === false &&
            item.active === true
        )
        .sort(function (a: any, b: any) {
          return a.tierNum - b.tierNum
        })
    },
    getHardFissure(): Array<any> {
      return this.fissureList.filter(
        (item: any) =>
          item.expired === false && item.active === true && item.isHard === true
      )
    },
    getHardFissureCount(): number {
      return this.getHardFissure().length
    },
    getSortedHardFissure(): Array<any> {
      return this.fissureList
        .filter(
          (item: any) =>
            item.expired === false &&
            item.active === true &&
            item.isHard === true
        )
        .sort(function (a: any, b: any) {
          return a.tierNum - b.tierNum
        })
    },
    setMarkedFissure(fissureId: string) {
      this.getFissureList().forEach((element: any) => {
        element.id === fissureId
          ? (element.isMarked = true)
          : (element.isMarked = false)
      })
    }
  }
})

interface statusModel {
  Notifies: Array<any>
  Intervals: Array<any>
  cycleIds: Array<any>
  cycleUpdatingStatus: Array<any>
  earthCycle: Object
  cetusCycle: Object
  vallisCycle: Object
  cambionCycle: Object
  zarimanCycle: Object
  voidTraderCycle: Object
  voidTraderInventory: Array<any>
  vaultTraderCycle: Object
  vaultTraderInventory: Array<any>
  birthDayCycle: Object
  nightWave: Object
  events: Array<any>
  activePanel: {
    index: number
    cardIndex: number
    queryParam: string
    displayName: string
    loading: boolean
  }
  updatingQueue: Array<string>
}

export const statusStore = defineStore({
  id: 'status',
  state: (): statusModel => ({
    Notifies: [],
    Intervals: [],
    cycleIds: [],
    cycleUpdatingStatus: [],
    earthCycle: {},
    cetusCycle: {},
    vallisCycle: {},
    cambionCycle: {},
    zarimanCycle: {},
    voidTraderCycle: {},
    voidTraderInventory: [],
    vaultTraderCycle: {},
    vaultTraderInventory: [],
    birthDayCycle: {},
    nightWave: {},
    events: [],
    activePanel: {
      index: 0,
      cardIndex: 0,
      queryParam: '',
      displayName: '',
      loading: false
    },
    updatingQueue: []
  }),
  actions: {
    addUpdatingQueue(cycleId: string) {
      this.updatingQueue.push(cycleId)
    },
    setNightWave(nightWave: any) {
      this.nightWave = nightWave
      this.addCycleStatus(nightWave.id, false)
      this.addCycleId(nightWave.id)
    },
    getNightWave() {
      return this.nightWave
    },
    toggleDetailPanel(
      index: number,
      cardIndex: number,
      queryParam: string,
      displayName: string
    ) {
      this.activePanel.index = index
      this.activePanel.cardIndex = cardIndex
      this.activePanel.queryParam = queryParam
      this.activePanel.displayName = displayName
    },
    setDetailPanelLoading(loading: boolean) {
      this.activePanel.loading = loading
    },
    isDetailPanelLoading(): boolean {
      return this.activePanel.loading
    },
    isObservationPanel(): boolean {
      return this.activePanel.index === 0
    },
    isDetailPanel(): boolean {
      return this.activePanel.index === 1
    },
    getPanelParam(): string {
      return this.activePanel.queryParam
    },
    getPanelDisplayName(): string {
      return this.activePanel.displayName
    },
    setEvents(events: any) {
      this.events = events
      events.forEach((element: any) => {
        this.addCycleStatus(element.id, false)
        this.addCycleId(element.id)
      })
    },
    getEvents(): any {
      return this.events
    },
    getEvent(index: number): any {
      return this.events[index]
    },
    getActiveEvents(): any {
      return this.events.filter((event: any) => event.active === true)
    },
    getExpiredEvents(): any {
      return this.events.filter((event: any) => event.active === false)
    },
    setEarthCycle(cycle: any) {
      this.earthCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getEarthCycle(): any {
      return this.earthCycle
    },
    setCetusCycle(cycle: any) {
      this.cetusCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getCetusCycle(): any {
      return this.cetusCycle
    },
    setVallisCycle(cycle: any) {
      this.vallisCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getVallisCycle(): any {
      return this.vallisCycle
    },
    setCambionCycle(cycle: any) {
      this.cambionCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getCambionCycle(): any {
      return this.cambionCycle
    },
    setZarimanCycle(cycle: any) {
      this.zarimanCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getZarimanCycle(): any {
      return this.zarimanCycle
    },
    setVoidTraderCycle(cycle: any) {
      this.voidTraderCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getVoidTraderCycle(): any {
      return this.voidTraderCycle
    },
    getVoidTraderInventory() {
      return this.voidTraderInventory
    },
    setVoidTraderInventory(inventory: any) {
      this.voidTraderInventory = inventory
    },
    setVaultTraderCycle(cycle: any) {
      this.vaultTraderCycle = cycle
      this.addCycleStatus(cycle.id, false)
      this.addCycleId(cycle.id)
    },
    getVaultTraderCycle(): any {
      return this.vaultTraderCycle
    },
    setVaultTraderInventory(inventory: any) {
      this.vaultTraderInventory = inventory
    },
    getVaultTraderInventory() {
      return this.vaultTraderInventory
    },
    setBirthDayCycle(id: string, expiry: number) {
      this.birthDayCycle = {
        id: id,
        expiry: expiry
      }
      this.addCycleStatus(id, false)
      this.addCycleId(id)
    },
    getBirthDayCycle(): any {
      return this.birthDayCycle
    },
    addCycleStatus(cycleId: string, status: boolean) {
      this.cycleUpdatingStatus.push({ cycleId: cycleId, status: status })
    },
    findCycleStatus(cycleId: string): boolean | undefined {
      let temp = this.cycleUpdatingStatus.find(
        (item: any) => item.cycleId === cycleId
      )
      if (temp) {
        return temp.status
      } else {
        return undefined
      }
    },
    updateCycleStatus(cycleId: string, status: boolean): boolean | undefined {
      let res = this.cycleUpdatingStatus.find(
        (item: cycleUpdatingStatusModel) => item.cycleId === cycleId
      )
      if (res) {
        res.status = status
      } else {
        return undefined
      }
    },
    addCycleId(cycleId: string) {
      this.cycleIds.push(cycleId)
    },
    clearCycleIds() {
      this.cycleIds = []
    },
    isCycleIdExist(cycleId: string): boolean {
      return this.cycleIds.includes(cycleId)
    },
    getIntervals(): Array<any> {
      return this.Intervals
    },
    addInterval(interval: any) {
      this.Intervals.push(interval)
    },
    clearIntervals() {
      this.Intervals.forEach((element: any) => {
        clearInterval(element.id)
      })
    },
    findIntervalByCycleId(cycleId: string): number {
      return this.Intervals.find((item: any) => item.cycleId === cycleId)!.id
    },
    removeIntervalByCycleId(cycleId: string) {
      this.Intervals.forEach((element: any) => {
        if (element.cycleId == cycleId) {
          clearInterval(element.id)
          this.Intervals.splice(this.Intervals.indexOf(element), 1)
        }
      })
    },
    getNotifies(): Array<any> {
      return this.Notifies
    },
    setTaskStatus(timestamp: number, status: boolean) {
      this.getNotifyByTimestamp(timestamp).taskCompleted = status
    },
    getNotifyByTimestamp(timestamp: number): any {
      return this.Notifies.find((item: any) => item.timestamp === timestamp)
    },
    isTaskCompleted(timestamp: number): boolean | null {
      if (this.getNotifyByTimestamp(timestamp) == undefined) return null

      return this.getNotifyByTimestamp(timestamp)!.taskCompleted
    },
    addNotify(Notify: notifyModel) {
      this.Notifies.push(Notify)
    },
    closeCompletedNotify(timestamp: number) {
      this.Notifies.forEach((element: any) => {
        if (element.timestamp == timestamp) {
          element.notifier.close()
        }
      })
    },
    closeNotify() {
      this.Notifies.forEach((element: any) => {
        element.notifier.close()
      })
    }
  },
  persist: {
    key: 'status',
    paths: ['activePanel'],
    storage: sessionStorage
  }
})
