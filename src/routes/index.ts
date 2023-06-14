import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { authStore, menuStore } from '@store'
import { isAdmin } from '@api/account'
import { ElStep } from 'element-plus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: () => import('@pages/index.vue'),
    redirect: '/introduction/usual',
    children: [
      {
        path: '/introduction/usual',
        name: '游玩模式目录',
        component: () => import('@pages/introduction/usual.vue'),
        children: [
          {
            path: '/Tenno',
            name: 'Tenno社区',
            component: () => import('@pages/tenno/index.vue'),
            submenu: false,
            icon: 'ep:chat-dot-round',
            children: [
              {
                path: '/Tenno/art',
                name: 'Tenno艺术展览',
                component: () => import('@pages/tenno/art/index.vue')
              },
              {
                path: '/Tenno/community',
                name: 'Tenno交流中心',
                component: () => import('@pages/tenno/community/index.vue'),
                children: [
                  {
                    path: '/Tenno/community/chat',
                    name: 'Tenno交流中心-聊天',
                    component: () => import('@pages/tenno/community/chat.vue')
                  },
                  {
                    path: '/Tenno/community/share',
                    name: 'Tenno交流中心-分享',
                    component: () => import('@pages/tenno/community/share.vue')
                  },
                  {
                    path: '/Tenno/community/help',
                    name: 'Tenno交流中心-求助',
                    component: () => import('@pages/tenno/community/help.vue')
                  }
                ]
              }
            ]
          },
          {
            path: '/TennoMarket',
            name: 'Tenno市场',
            submenu: false,
            component: () => import('@pages/market/index.vue'),
            icon: 'ant-design:shopping-outlined',
            children: [
              {
                path: '/TennoMarket/exchange',
                name: '物品交换',
                component: () => import('@pages/market/exchange.vue')
              },
              {
                path: '/TennoMarket/trade',
                name: '物品买卖',
                component: () => import('@pages/market/trade.vue')
              }
            ]
          },
          {
            path: '/exp',
            name: '段位经验',
            submenu: false,
            component: () => import('@pages/exp/index.vue'),
            icon: 'ic:round-keyboard-double-arrow-up',
            children: [
              {
                path: '/exp/sanctuary',
                name: '圣殿突袭',
                component: () => import('@pages/exp/sanctuary.vue')
              },
              {
                path: '/exp/crew',
                name: '九重天船员',
                component: () => import('@pages/exp/crew.vue')
              },
              {
                path: '/exp/archwing',
                name: 'Archwing',
                component: () => import('@pages/exp/archwing.vue')
              },
              {
                path: '/exp/necro',
                name: '殁世机甲',
                component: () => import('@pages/exp/necro.vue')
              }
            ]
          },
          {
            path: '/relics',
            name: '虚空遗物',
            submenu: false,
            component: () => import('@pages/relics/index.vue'),
            children: [
              {
                path: '/relics/lith',
                name: '古纪',
                component: () => import('@pages/relics/lith.vue')
              },
              {
                path: '/relics/meso',
                name: '前纪',
                component: () => import('@pages/relics/meso.vue')
              },
              {
                path: '/relics/neo',
                name: '中纪',
                component: () => import('@pages/relics/neo.vue')
              },
              {
                path: '/relics/axi',
                name: '后纪',
                component: () => import('@pages/relics/axi.vue')
              },
              {
                path: '/relics/requiem',
                name: '安魂',
                component: () => import('@pages/relics/requiem.vue')
              }
            ]
          },
          {
            path: '/py',
            name: '平原&扎里曼',
            submenu: true,
            children: [
              {
                path: '/py/earth',
                name: '地球平原',
                component: () => import('@pages/py/earth/index.vue'),
                children: [
                  {
                    path: '/py/earth/steelpath',
                    name: '地球平原-钢铁之路',
                    component: () => import('@pages/py/earth/steelpath.vue')
                  },
                  {
                    path: '/py/earth/bounty',
                    name: '地球平原-赏金',
                    component: () => import('@pages/py/earth/bounty.vue')
                  },
                  {
                    path: '/py/earth/idolon',
                    name: '地球平原-夜灵',
                    component: () => import('@pages/py/earth/idolon.vue')
                  },
                  {
                    path: '/py/earth/explore',
                    name: '地球平原-自由探索',
                    component: () => import('@pages/py/earth/explore.vue')
                  }
                ]
              },
              {
                path: '/py/deimos',
                name: '火卫二平原',
                component: () => import('@pages/py/deimos/index.vue'),
                children: [
                  {
                    path: '/py/deimos/steelpath',
                    name: '火卫二平原-钢铁之路',
                    component: () => import('@pages/py/deimos/steelpath.vue')
                  },
                  {
                    path: '/py/deimos/bounty',
                    name: '火卫二平原-赏金',
                    component: () => import('@pages/py/deimos/bounty.vue')
                  },
                  {
                    path: '/py/deimos/explore',
                    name: '火卫二平原-自由探索',
                    component: () => import('@pages/py/deimos/explore.vue')
                  }
                ]
              },
              {
                path: '/py/venus',
                name: '金星平原',
                component: () => import('@pages/py/venus/index.vue'),
                children: [
                  {
                    path: '/py/venus/steelpath',
                    name: '金星平原-钢铁之路',
                    component: () => import('@pages/py/venus/steelpath.vue')
                  },
                  {
                    path: '/py/venus/bounty',
                    name: '金星平原-赏金',
                    component: () => import('@pages/py/venus/bounty.vue')
                  },
                  {
                    path: '/py/venus/spider',
                    name: '金星平原-利润收割者',
                    component: () => import('@pages/py/venus/spider.vue')
                  },
                  {
                    path: '/py/venus/explore',
                    name: '金星平原-自由探索',
                    component: () => import('@pages/py/venus/explore.vue')
                  }
                ]
              },
              {
                path: '/py/zariman',
                name: '扎里曼号',
                component: () => import('@pages/py/zariman/index.vue'),
                children: [
                  {
                    path: '/py/zariman/bounty',
                    name: '扎里曼号-赏金',
                    component: () => import('@pages/py/zariman/bounty.vue')
                  },
                  {
                    path: '/py/zariman/explore',
                    name: '扎里曼号-自由探索',
                    component: () => import('@pages/py/zariman/explore.vue')
                  }
                ]
              }
            ]
          },
          {
            path: '/empyrean',
            name: '九重天',
            submenu: false,
            component: () => import('@pages/empyrean/index.vue'),
            children: [
              {
                path: '/empyrean/crew',
                name: '船员',
                redirect: '/exp/crew'
              },
              {
                path: '/empyrean/relics',
                name: '遗物',
                redirect: '/relics/empyrean'
              },
              {
                path: '/empyrean/skirmish',
                name: '前哨战',
                component: () => import('@pages/empyrean/skirmish.vue')
              },
              {
                path: '/empyrean/okage',
                name: '奥影',
                component: () => import('@pages/empyrean/okage.vue')
              },
              {
                path: '/empyrean/kem',
                name: '克姆地带',
                component: () => import('@pages/empyrean/kem.vue')
              },
              {
                path: '/empyrean/explore',
                name: '其他&自由探索',
                component: () => import('@pages/empyrean/explore.vue')
              }
            ]
          },
          {
            path: '/resource',
            name: '资源获取',
            submenu: false,
            component: () => import('@pages/resource/index.vue'),
            icon: 'ant-design:gold-outlined',
            children: [
              {
                path: '/resource/endo',
                name: '内融核心',
                component: () => import('@pages/resource/endo.vue')
              },
              {
                path: '/resource/credit',
                name: '现金',
                component: () => import('@pages/resource/credit.vue')
              },
              {
                path: '/resource/kuva',
                name: '赤毒',
                component: () => import('@pages/resource/kuva.vue')
              },
              {
                path: '/resource/argon',
                name: '氩结晶',
                component: () => import('@pages/resource/argon.vue')
              },
              {
                path: '/resource/cell',
                name: '电池',
                component: () => import('@pages/resource/cell.vue')
              },
              {
                path: '/resource/nano',
                name: '纳米孢子',
                component: () => import('@pages/resource/nano.vue')
              },
              {
                path: '/resource/polymer',
                name: '聚合物束（杆子）',
                component: () => import('@pages/resource/polymer.vue')
              },
              {
                path: '/resource/plastids',
                name: '生物质',
                component: () => import('@pages/resource/plastids.vue')
              },
              {
                path: '/resource/alloy',
                name: '合金板',
                component: () => import('@pages/resource/alloy.vue')
              },
              {
                path: '/resource/steel',
                name: '钢铁精华',
                component: () => import('@pages/resource/steel.vue')
              },
              {
                path: '/resource/vitus',
                name: '生息精华',
                component: () => import('@pages/resource/vitus.vue')
              },
              {
                path: '/resource/aya',
                name: '阿耶檀识精华',
                component: () => import('@pages/resource/aya.vue')
              },
              {
                path: '/resource/luaThraxPlasm',
                name: '月球凶魂精华',
                component: () => import('@pages/resource/luaThraxPlasm.vue')
              },
              {
                path: '/resource/kavat',
                name: '猫猫基因',
                component: () => import('@pages/resource/kavat.vue')
              },
              {
                path: '/resource/gallium',
                name: '镓',
                component: () => import('@pages/resource/gallium.vue')
              },
              {
                path: '/resource/tellurium',
                name: '碲',
                component: () => import('@pages/resource/tellurium.vue')
              },
              {
                path: '/resource/others',
                name: '其他',
                component: () => import('@pages/resource/others.vue')
              }
            ]
          },
          {
            path: '/events',
            name: '活动&警报',
            submenu: false,
            component: () => import('@pages/events/index.vue'),
            icon: 'material-symbols:local-activity-outline-sharp'
          },
          {
            path: '/cycle',
            name: '循环任务',
            submenu: false,
            component: () => import('@pages/cycle/index.vue'),
            icon: 'akar-icons:arrow-cycle',
            children: [
              {
                path: '/cycle/raid',
                name: '突击',
                component: () => import('@pages/cycle/raid.vue')
              },
              {
                path: '/cycle/hunt',
                name: '执行官猎杀',
                component: () => import('@pages/cycle/hunt.vue')
              }
            ]
          },
          {
            path: '/warframes',
            name: '战甲获取',
            submenu: false,
            component: () => import('@pages/warframes/index.vue')
          }
        ]
      },
      {
        path: '/introduction/planet',
        name: '星球目录',
        component: () => import('@pages/introduction/planet.vue'),
        children: [
          {
            path: '/planet/Earth',
            name: '地球',
            component: () => import('@pages/planet/earth.vue'),
            icon: 'gis:earth-asia'
          },
          {
            path: '/planet/Moon',
            name: '月球',
            component: () => import('@pages/planet/moon.vue'),
            icon: 'vaadin:moon'
          },
          {
            path: '/planet/Ceres',
            name: '谷神星',
            component: () => import('@pages/planet/ceres.vue'),
            icon: 'ion:planet-outline'
          },
          {
            path: '/planet/Jupiter',
            name: '木星',
            component: () => import('@pages/planet/jupiter.vue'),
            icon: 'ion:planet-outline'
          },
          {
            path: '/planet/Void',
            name: '虚空',
            component: () => import('@pages/planet/void.vue'),
            icon: 'material-symbols:brightness-empty-outline-rounded'
          },
          {
            path: '/planet/Sedna',
            name: '赛德娜',
            component: () => import('@pages/planet/sedna.vue'),
            icon: 'ion:planet-outline'
          },
          {
            path: '/planet/Others',
            name: '其他星球',
            component: () => import('@pages/planet/others.vue'),
            icon: 'iconoir:planet'
          },
          {
            path: '/planet/explore',
            name: '探索星球',
            component: () => import('@pages/planet/explore/index.vue'),
            submenu: true,
            icon: 'ic:outline-travel-explore',
            children: [
              {
                path: '/explore/normal',
                name: '普通游玩',
                component: () => import('@pages/planet/explore/normal.vue'),
                icon: 'gg:icecream'
              },
              {
                path: '/explore/steelpath',
                name: '钢铁之路',
                component: () => import('@pages/planet/explore/steelpath.vue'),
                icon: 'material-symbols:local-fire-department-outline'
              }
            ]
          }
        ]
      },
      {
        path: '/introduction/developer',
        name: '开发者',
        component: () => import('@pages/developer/index.vue'),
        children: [
          {
            path: '/log',
            name: '开发日志',
            component: () => import('@pages/developer/log.vue'),
            icon: 'fluent:document-chevron-double-24-regular'
          },
          {
            path: '/issue',
            name: '问题反馈&功能建议',
            component: () => import('@pages/developer/issue.vue'),
            icon: 'ant-design:comment-outlined'
          }
        ]
      }
    ]
  },
  {
    path: '/account',
    name: '账户',
    redirect: '/account/login',
    component: () => import('@pages/account/index.vue'),
    children: [
      {
        path: '/account/login',
        name: '登录',
        component: () => import('@pages/account/login.vue')
      },
      {
        path: '/account/register',
        name: '注册',
        component: () => import('@pages/account/register.vue')
      },
      {
        path: '/account/retrive',
        name: '找回密码',
        component: () => import('@pages/account/retrive.vue')
      }
    ]
  },
  {
    path: '/profile',
    name: '账户信息',
    component: () => import('@pages/profile/index.vue'),
    redirect: '/account/profile/recruit',
    children: [
      {
        path: '/account/profile/recruit',
        name: '我的征召',
        component: () => import('@pages/profile/recruit.vue')
      },
      {
        path: '/account/profile/message',
        name: '我的消息',
        component: () => import('@pages/profile/message.vue')
      },
      {
        path: '/account/profile/transaction',
        name: '我的交易',
        component: () => import('@pages/profile/transaction.vue')
      },
      {
        path: '/account/profile/settings',
        name: '账户设置',
        component: () => import('@pages/profile/settings.vue')
      },
      {
        path: '/account/profile/sponser',
        name: '暖心助力',
        component: () => import('@pages/profile/sponser.vue')
      }
    ]
  },
  {
    path: '/private',
    component: () => import('@pages/private/index.vue'),
    children: [
      {
        path: '/private/regexp',
        name: '正则表达式',
        component: () => import('@pages/private/regexp.vue')
      },
      {
        path: '/private/data',
        name: 'data',
        component: () => import('@pages/private/data.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@pages/test.vue')
  }
]

// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes
})

const AuthRequiredRoutes = ['/account/profile', '/issue']
const AdminRequiredRoutes = ['/private', '/private/data']
router.beforeEach(async (to, from) => {
  if (AuthRequiredRoutes.includes(to.path)) {
    const _authStore = authStore()
    if (!_authStore.checkToken()) {
      _authStore.setTip('加入Warframe Team Up, 与其他玩家更方便地交流！')
      return '/account/login'
    }
  }
  if (AdminRequiredRoutes.includes(to.path)) {
    const rs = await isAdmin()
    if (rs.res) {
      return true
    } else {
      return '/introduction/usual'
    }
  }
  if (to.matched.find((route) => route.path.includes('/introduction'))) {
    const _menuStore = menuStore()
    _menuStore.setDefaultPath(to.path)
    _menuStore.setMenu(to.matched[1].children)
  }
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
