import type {
  warframeModel,
  focusModel,
  swapbleItemsModel,
  relicLevelModel
} from '@models'
export const warframes: warframeModel[] = [
  {
    name: 'Atlas',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Ash',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Banshee',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Baruuk',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Baruuk',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Chroma',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Caliban',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Citrine',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Ember',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Equinox',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Excalibur',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'ExcaliburUmbra',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Frost',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Gara',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Garuda',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Gauss',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Grendel',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Gyre',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Harrow',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Hildryn',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Hydroid',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Inaros',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Ivara',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Khora',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Lavos',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Limbo',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Loki',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Mag',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Mesa',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Mirage',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Nekros',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Nezha',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Nidus',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Nova',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Nyx',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Oberon',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Octavia',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'protea',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Revenant',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Rhino',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Saryn',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Sevagoth',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Styanax',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Titania',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Trinity',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Valkyr',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Vauban',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'volt',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Voruna',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Wisp',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Wukong',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Xaku',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Yareli',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  },
  {
    name: 'Zephyr',
    skillSet: ['unknown', 'unknown', 'unknown', 'unknown']
  }
]
export const focus: focusModel[] = [
  {
    name: 'FocusLens',
    code: 0,
    icon: 'https://www.neorae.cn/data/image/focus/FocusLens.svg'
  },
  {
    name: 'Zenurik',
    code: 1,
    icon: 'https://www.neorae.cn/data/image/focus/Zenurik.svg'
  },
  {
    name: 'Naramon',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/focus/Naramon.svg'
  },
  {
    name: 'Madurai',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/focus/Madurai.svg'
  },
  {
    name: 'Vazarin',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/focus/Vazarin.svg'
  },
  {
    name: 'Unairu',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/focus/Unairu.svg'
  }
]
export const requiemMods: swapbleItemsModel[] = [
  {
    name: 'Fass',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/Requium/Fass.webp'
  },
  {
    name: 'Jahu',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/Requium/Jahu.webp'
  },
  {
    name: 'Khra',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/Requium/Khra.webp'
  },
  {
    name: 'Lohk',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/Requium/Lohk.webp'
  },
  {
    name: 'Netra',
    code: 6,
    icon: 'https://www.neorae.cn/data/image/Requium/Netra.webp'
  },
  {
    name: 'Oull',
    code: 7,
    icon: 'https://www.neorae.cn/data/image/Requium/Oull.webp'
  },
  {
    name: 'Ris',
    code: 8,
    icon: 'https://www.neorae.cn/data/image/Requium/Ris.webp'
  },
  {
    name: 'Vome',
    code: 9,
    icon: 'https://www.neorae.cn/data/image/Requium/Vome.webp'
  },
  {
    name: 'Xata',
    code: 10,
    icon: 'https://www.neorae.cn/data/image/Requium/Xata.webp'
  }
]
export const relics: Object[] = [
  {
    name: '古纪遗物',
    code: 1,
    icon: 'https://www.neorae.cn/data/image/relics/1-175.webp'
  },
  {
    name: '前纪遗物',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/relics/2-175.webp'
  },
  {
    name: '中纪遗物',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/relics/3-175.webp'
  },
  {
    name: '后纪遗物',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/relics/4-175.webp'
  },
  {
    name: '安魂遗物',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/relics/5-175.webp'
  }
]
export const WarframeParts: swapbleItemsModel[] = [
  {
    name: '头部神经光元',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/WarframeParts/PrimeHelmet.webp'
  },
  {
    name: '机体',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/WarframeParts/PrimeChassis.webp'
  },
  {
    name: '系统',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/WarframeParts/PrimeSystem.webp'
  },
  {
    name: '蓝图',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/WarframeParts/Blueprint.webp'
  }
]
export const PrimedGunParts: swapbleItemsModel[] = [
  {
    name: '枪管',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/PrimedGunParts/PrimeBarrel.webp'
  },
  {
    name: '枪机',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/PrimedGunParts/PrimeReceiver.webp'
  },
  {
    name: '枪托',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/PrimedGunParts/PrimeStock.webp'
  },
  {
    name: '蓝图',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/PrimedGunParts/Blueprint.webp'
  }
]
export const GenericWeaponParts: swapbleItemsModel[] = [
  {
    name: '枪管',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/GenericWeaponParts/GenericBarrel.webp'
  },
  {
    name: '枪机',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/GenericWeaponParts/GenericReceiver.webp'
  },
  {
    name: '枪托',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/GenericWeaponParts/GenericStock.webp'
  },
  {
    name: '蓝图',
    code: 5,
    icon: 'https://www.neorae.cn/data/image/GenericWeaponParts/Blueprint.webp'
  }
]
export const PrimedMeleeWeaponParts: swapbleItemsModel[] = [
  {
    name: '握柄',
    code: 2,
    icon: 'https://www.neorae.cn/data/image/PrimedMeleeParts/PrimeHandler.webp'
  },
  {
    name: '刀刃',
    code: 3,
    icon: 'https://www.neorae.cn/data/image/PrimedMeleeParts/PrimeBlade.webp'
  },
  {
    name: '蓝图',
    code: 4,
    icon: 'https://www.neorae.cn/data/image/PrimedMeleeParts/Blueprint.webp'
  }
]
export const currency: swapbleItemsModel[] = [
  {
    name: 0,
    code: 1,
    icon: 'https://www.neorae.cn/data/image/PlatinumLarge.webp'
  }
]
export const RelicGameMode: string[] = [
  '生存',
  '防御',
  '捕获',
  '中断',
  '入侵',
  '移动防御',
  '刺杀',
  '镜像防御',
  '联结生存',
  '清巢',
  '救援',
  '破坏'
]

export const RelicLevel: relicLevelModel[] = [
  {
    value: '完整',
    label: 0
  },
  {
    value: '优良',
    label: 25
  },
  {
    value: '无暇',
    label: 50
  },
  {
    value: '光辉',
    label: 100
  },
  {
    value: '任意',
    label: 175
  }
]

export const RelicLevelFour: relicLevelModel[] = [
  {
    value: '完整',
    label: 0
  },
  {
    value: '优良',
    label: 25
  },
  {
    value: '无暇',
    label: 50
  },
  {
    value: '光辉',
    label: 100
  }
]

interface stateModel {
  state: number
  text: string
  icon: string
  active: boolean
  className: string
}

export const states: stateModel[] = [
  {
    state: 0,
    text: '隐身',
    icon: 'ant-design:eye-invisible-outlined',
    active: true,
    className: 'invisibleState'
  },
  {
    state: 1,
    text: '游戏中',
    icon: 'wpf:online',
    active: true,
    className: 'onlineInGameState'
  },
  {
    state: 2,
    text: '在线',
    icon: 'material-symbols:circle-outline',
    active: true,
    className: 'onlineState'
  }
]

interface boostModel {
  name: string
  duration: number
  description: string
  level: string
  icon: string
}

export const boostInactivated: boostModel[] = [
  {
    name: '双倍经验加成',
    duration: 0,
    description: 'AffinityBooster',
    level: 'inactivated',
    icon: 'https://www.neorae.cn/data/image/booster/AffinityBoosterInactivated.png'
  },
  {
    name: '双倍资源数量加成',
    duration: 0,
    description: 'RescourseBooster',
    level: 'inactivated',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceBoosterInactivated.png'
  },
  {
    name: '双倍现金数量加成',
    duration: 0,
    description: 'CreditBooster',
    level: 'inactivated',
    icon: 'https://www.neorae.cn/data/image/booster/CreditBoosterInactivated.png'
  },
  {
    name: '资源掉落几率加成',
    duration: 0,
    description: 'ResourceDropChanceBooster',
    level: 'inactivated',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceDropChanceBoosterInactivated.png'
  },
  {
    name: 'MOD掉落几率加成',
    duration: 0,
    description: 'ModDropChanceBooster',
    level: 'inactivated',
    icon: 'https://www.neorae.cn/data/image/booster/ModDropChanceBoosterInactivated.png'
  }
]

export const boost: boostModel[] = [
  {
    name: '双倍经验加成',
    duration: 3,
    description: 'AffinityBooster',
    level: 'Bronze',
    icon: 'https://www.neorae.cn/data/image/booster/AffinityBoosterBronze.png'
  },
  {
    name: '双倍经验加成',
    duration: 7,
    description: 'AffinityBooster',
    level: 'Silver',
    icon: 'https://www.neorae.cn/data/image/booster/AffinityBoosterSilver.png'
  },
  {
    name: '双倍经验加成',
    duration: 30,
    description: 'AffinityBooster',
    level: 'Gold',
    icon: 'https://www.neorae.cn/data/image/booster/AffinityBoosterGold.png'
  },
  {
    name: '双倍资源数量加成',
    duration: 3,
    description: 'RescourseBooster',
    level: 'Bronze',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceBoosterBronze.png'
  },
  {
    name: '双倍资源数量加成',
    duration: 7,
    description: 'RescourseBooster',
    level: 'Silver',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceBoosterSilver.png'
  },
  {
    name: '双倍资源数量加成',
    duration: 30,
    description: 'RescourseBooster',
    level: 'Gold',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceBoosterGold.png'
  },
  {
    name: '双倍现金数量加成',
    duration: 3,
    description: 'CreditBooster',
    level: 'Bronze',
    icon: 'https://www.neorae.cn/data/image/booster/CreditBoosterBronze.png'
  },
  {
    name: '双倍现金数量加成',
    duration: 7,
    description: 'CreditBooster',
    level: 'Silver',
    icon: 'https://www.neorae.cn/data/image/booster/CreditBoosterSilver.png'
  },
  {
    name: '双倍现金数量加成',
    duration: 30,
    description: 'CreditBooster',
    level: 'Gold',
    icon: 'https://www.neorae.cn/data/image/booster/CreditBoosterGold.png'
  },
  {
    name: '资源掉落几率加成',
    duration: 3,
    description: 'ResourceDropChanceBooster',
    level: 'Bronze',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceDropChanceBoosterBronze.png'
  },
  {
    name: '资源掉落几率加成',
    duration: 7,
    description: 'ResourceDropChanceBooster',
    level: 'Silver',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceDropChanceBoosterSilver.png'
  },
  {
    name: '资源掉落几率加成',
    duration: 30,
    description: 'ResourceDropChanceBooster',
    level: 'Gold',
    icon: 'https://www.neorae.cn/data/image/booster/ResourceDropChanceBoosterGold.png'
  },
  {
    name: 'MOD掉落几率加成',
    duration: 3,
    description: 'ModDropChanceBooster',
    level: 'Bronze',
    icon: 'https://www.neorae.cn/data/image/booster/ModDropChanceBoosterBronze.png'
  },
  {
    name: 'MOD掉落几率加成',
    duration: 7,
    description: 'ModDropChanceBooster',
    level: 'Silver',
    icon: 'https://www.neorae.cn/data/image/booster/ModDropChanceBoosterSilver.png'
  },
  {
    name: 'MOD掉落几率加成',
    duration: 30,
    description: 'ModDropChanceBooster',
    level: 'Gold',
    icon: 'https://www.neorae.cn/data/image/booster/ModDropChanceBoosterGold.png'
  }
]
