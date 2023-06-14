export interface swapbleItemsModel {
  name: string
  code: number
  icon: string
  fileSuffix: string
}

export interface labelValue {
  label: string
  value: string
}

export interface registerFormModel {
  email: string
  password: string
  emailCode: string
  timestamp: number
}

export interface loginFormModel {
  email: string
  password: string
  timestamp: number
}

export interface retriveFormModel {
  email: string
  emailCode: string
  password: string
}

export interface build {
  warframe: string
  focus: focusModel
}

export interface createTeamsFormModel {
  fissureId: string
  tierNum: number
  tier: string
  missionType: string
  difficulty: number
  node: string
  code: string
  relicLevel: number
  title: string
  myBuild: build
  recruit: Array<build>
}

export interface nicknameFormModel {
  nickname: string
  email: string
}

export interface warframeModel {
  name: string
  skillSet: Array<string>
}

export interface focusModel {
  name: string
  code: number
}

export interface notifyModel {
  timestamp: number
  notifier: any
  taskCompleted: boolean
}

export interface cycleModel {
  cycleId: string
  isUpdating: boolean
}

export interface observationModel {
  isEarthCycleUpdating: boolean
  isCetusCycleUpdating: boolean
  isVallisCycleUpdating: boolean
  isCambionCycleUpdating: boolean
  isZarimanCycleUpdating: boolean
  isVoidTraderUpdating: boolean
  isVaultTraderUpdating: boolean
  isMyBirthDayUpdating: boolean
}

export interface stateModel {
  index: number
  text: string
  icon: string
}

export interface relicLevelModel {
  label: number
  value: string
}

export interface menu {
  id: number
  name: string
  icon: string
  path: string
  children: Array<menu>
}

export interface selectedRelicModel {
  relicFlag: string
  relics: relicLevelModel
}

export interface animationStoreModel {
  selectedRelic: selectedRelicModel
}

export interface relics {
  category: string
  description: string
  name: string
  tradable: boolean
  type: string
  uniqueName: string
  vaulted: boolean
}
