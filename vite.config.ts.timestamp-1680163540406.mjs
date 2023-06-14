// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/projects/warframe/vue/node_modules/.pnpm/vite@4.1.4_bbhgkqmop4v24vevyan3j2nitq/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/projects/warframe/vue/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import {
  AntDesignVueResolver,
  ElementPlusResolver
} from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unplugin-auto-import@0.15.1_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import Icons from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/resolver.mjs";
import { createSvgIconsPlugin } from "file:///D:/projects/warframe/vue/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import Unocss from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unocss@0.50.6_vite@4.1.4/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///D:/projects/warframe/vue/node_modules/.pnpm/unocss@0.50.6_vite@4.1.4/node_modules/unocss/dist/index.mjs";
import viteCompression from "file:///D:/projects/warframe/vue/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.1.4/node_modules/vite-plugin-compression/dist/index.mjs";
import fs from "fs";
var vite_config_default = ({ mode }) => defineConfig({
  plugins: [
    vue(),
    // 生产环境资源压缩, 可选 gzip, brotliCompress, deflate, deflateRaw
    viteCompression({
      // 可以用，只是不能通过ts的检查 ↓
      // @ts-ignore
      algorithm: "gzip"
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue"]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
        IconsResolver({
          prefix: "icon"
        })
      ]
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true
      // defaultStyle: 'width: 0.75rem; height:0.75rem; transform: scale(1.5)'
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "svg_icons_dom"
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        [
          "center",
          {
            display: "flex",
            "justify-content": "center",
            "align-items": "center"
          }
        ]
      ],
      // 以下配置是为了可以在组件中更方便地使用图标<el-button icon="i-ep-lock"/>
      variants: [
        {
          match: (s) => {
            if (s.startsWith("i-")) {
              return {
                matcher: s,
                selector: (s2) => {
                  return s2.startsWith(".") ? `${s2.slice(1)},${s2}` : s2;
                }
              };
            }
          }
        }
      ]
    })
  ],
  define: {
    "process.env": loadEnv(mode, process.cwd())
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
      key: fs.readFileSync("src/assets/ssl/dev.key"),
      cert: fs.readFileSync("src/assets/ssl/dev.pem")
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve("./src")
      },
      {
        find: "@image",
        replacement: path.resolve("./src/assets/image")
      },
      {
        find: "@video",
        replacement: path.resolve("./src/assets/video")
      },
      {
        find: "@api",
        replacement: path.resolve("./src/request/api")
      },
      {
        find: "@components",
        replacement: path.resolve("./src/components")
      },
      {
        find: "@utils",
        replacement: path.resolve("./src/utils")
      },
      {
        find: "@pages",
        replacement: path.resolve("./src/pages")
      },
      {
        find: "@routes",
        replacement: path.resolve("./src/routes")
      },
      {
        find: "@store",
        replacement: path.resolve("./src/store")
      },
      {
        find: "@common",
        replacement: path.resolve("./src/common")
      },
      {
        find: "@models",
        replacement: path.resolve("./src/models")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFx3YXJmcmFtZVxcXFx2dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RzXFxcXHdhcmZyYW1lXFxcXHZ1ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdHMvd2FyZnJhbWUvdnVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7XG4gIEFudERlc2lnblZ1ZVJlc29sdmVyLFxuICBFbGVtZW50UGx1c1Jlc29sdmVyXG59IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbi8vIHVub2Nzc1x1NURFNVx1NTE3N1x1N0M3Qlx1MzAwMVx1NUM1RVx1NjAyN1x1NjUyRlx1NjMwMVx1MzAwMVx1NTZGRVx1NjgwN1x1NjUyRlx1NjMwMVxuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXG5cbi8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEQ0NFx1NkU5MFx1NTM4Qlx1N0YyOVxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT5cbiAgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEQ0NFx1NkU5MFx1NTM4Qlx1N0YyOSwgXHU1M0VGXHU5MDA5IGd6aXAsIGJyb3RsaUNvbXByZXNzLCBkZWZsYXRlLCBkZWZsYXRlUmF3XG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICAvLyBcdTUzRUZcdTRFRTVcdTc1MjhcdUZGMENcdTUzRUFcdTY2MkZcdTRFMERcdTgwRkRcdTkwMUFcdThGQzd0c1x1NzY4NFx1NjhDMFx1NjdFNSBcdTIxOTNcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhbGdvcml0aG06ICdnemlwJ1xuICAgICAgfSksXG5cbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZSddXG4gICAgICB9KSxcblxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKCksXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgcHJlZml4OiAnaWNvbidcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9KSxcblxuICAgICAgSWNvbnMoe1xuICAgICAgICBjb21waWxlcjogJ3Z1ZTMnLFxuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZVxuICAgICAgICAvLyBkZWZhdWx0U3R5bGU6ICd3aWR0aDogMC43NXJlbTsgaGVpZ2h0OjAuNzVyZW07IHRyYW5zZm9ybTogc2NhbGUoMS41KSdcbiAgICAgIH0pLFxuXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXG4gICAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgICAvKipcbiAgICAgICAgICogY3VzdG9tIGRvbSBpZFxuICAgICAgICAgKiBAZGVmYXVsdDogX19zdmdfX2ljb25zX19kb21fX1xuICAgICAgICAgKi9cbiAgICAgICAgY3VzdG9tRG9tSWQ6ICdzdmdfaWNvbnNfZG9tJ1xuICAgICAgfSksXG5cbiAgICAgIFVub2Nzcyh7XG4gICAgICAgIHByZXNldHM6IFtwcmVzZXRVbm8oKSwgcHJlc2V0QXR0cmlidXRpZnkoKSwgcHJlc2V0SWNvbnMoKV0sXG4gICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgXSxcblxuICAgICAgICAvLyBcdTRFRTVcdTRFMEJcdTkxNERcdTdGNkVcdTY2MkZcdTRFM0FcdTRFODZcdTUzRUZcdTRFRTVcdTU3MjhcdTdFQzRcdTRFRjZcdTRFMkRcdTY2RjRcdTY1QjlcdTRGQkZcdTU3MzBcdTRGN0ZcdTc1MjhcdTU2RkVcdTY4MDc8ZWwtYnV0dG9uIGljb249XCJpLWVwLWxvY2tcIi8+XG4gICAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWF0Y2g6IChzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzLnN0YXJ0c1dpdGgoJ2ktJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgbWF0Y2hlcjogcyxcbiAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy5zdGFydHNXaXRoKCcuJykgPyBgJHtzLnNsaWNlKDEpfSwke3N9YCA6IHNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgXSxcblxuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52JzogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICAgIH0sXG5cbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvc3R5bGUuc2Nzc1wiOydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDY3LFxuICAgICAgaHR0cHM6IHtcbiAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoJ3NyYy9hc3NldHMvc3NsL2Rldi5rZXknKSxcbiAgICAgICAgY2VydDogZnMucmVhZEZpbGVTeW5jKCdzcmMvYXNzZXRzL3NzbC9kZXYucGVtJylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQGltYWdlJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9hc3NldHMvaW1hZ2UnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0B2aWRlbycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvYXNzZXRzL3ZpZGVvJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAYXBpJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9yZXF1ZXN0L2FwaScpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQGNvbXBvbmVudHMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoJy4vc3JjL2NvbXBvbmVudHMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0B1dGlscycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvdXRpbHMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0BwYWdlcycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvcGFnZXMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0Byb3V0ZXMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoJy4vc3JjL3JvdXRlcycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQHN0b3JlJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9zdG9yZScpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQGNvbW1vbicsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvY29tbW9uJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAbW9kZWxzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9tb2RlbHMnKVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUSxTQUFTLGNBQWMsZUFBZTtBQUN4UyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sWUFBWTtBQUVuQixTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjtBQUcxRCxPQUFPLHFCQUFxQjtBQUM1QixPQUFPLFFBQVE7QUFHZixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQ3JCLGFBQWE7QUFBQSxFQUNYLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBRUosZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2QsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLElBRUQsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FB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
