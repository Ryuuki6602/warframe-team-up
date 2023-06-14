import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {
  AntDesignVueResolver,
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Unocss from 'unocss/vite'
// unocss工具类、属性支持、图标支持
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// 生产环境资源压缩
import viteCompression from 'vite-plugin-compression'
import fs from 'fs'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      // 生产环境资源压缩, 可选 gzip, brotliCompress, deflate, deflateRaw
      viteCompression({
        // 可以用，只是不能通过ts的检查 ↓
        // @ts-ignore
        algorithm: 'gzip'
      }),

      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue']
      }),

      Components({
        resolvers: [
          AntDesignVueResolver(),
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'icon'
          })
        ]
      }),

      Icons({
        compiler: 'vue3',
        autoInstall: true
        // defaultStyle: 'width: 0.75rem; height:0.75rem; transform: scale(1.5)'
      }),

      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: 'svg_icons_dom'
      }),

      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
        rules: [
          [
            'center',
            {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center'
            }
          ]
        ],

        // 以下配置是为了可以在组件中更方便地使用图标<el-button icon="i-ep-lock"/>
        variants: [
          {
            match: (s) => {
              if (s.startsWith('i-')) {
                return {
                  matcher: s,
                  selector: (s) => {
                    return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                  }
                }
              }
            }
          }
        ]
      })
    ],

    define: {
      'process.env': loadEnv(mode, process.cwd())
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style.scss";'
        }
      }
    },

    server: {
      port: 67,
      https: {
        key: fs.readFileSync('src/assets/ssl/dev.key'),
        cert: fs.readFileSync('src/assets/ssl/dev.pem')
      }
    },

    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve('./src')
        },
        {
          find: '@image',
          replacement: path.resolve('./src/assets/image')
        },
        {
          find: '@video',
          replacement: path.resolve('./src/assets/video')
        },
        {
          find: '@api',
          replacement: path.resolve('./src/request/api')
        },
        {
          find: '@components',
          replacement: path.resolve('./src/components')
        },
        {
          find: '@utils',
          replacement: path.resolve('./src/utils')
        },
        {
          find: '@pages',
          replacement: path.resolve('./src/pages')
        },
        {
          find: '@routes',
          replacement: path.resolve('./src/routes')
        },
        {
          find: '@store',
          replacement: path.resolve('./src/store')
        },
        {
          find: '@common',
          replacement: path.resolve('./src/common')
        },
        {
          find: '@models',
          replacement: path.resolve('./src/models')
        }
      ]
    }
  })
