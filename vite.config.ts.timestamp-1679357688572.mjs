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
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFx3YXJmcmFtZVxcXFx2dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RzXFxcXHdhcmZyYW1lXFxcXHZ1ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdHMvd2FyZnJhbWUvdnVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7XG4gIEFudERlc2lnblZ1ZVJlc29sdmVyLFxuICBFbGVtZW50UGx1c1Jlc29sdmVyXG59IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcblxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbi8vIHVub2Nzc1x1NURFNVx1NTE3N1x1N0M3Qlx1MzAwMVx1NUM1RVx1NjAyN1x1NjUyRlx1NjMwMVx1MzAwMVx1NTZGRVx1NjgwN1x1NjUyRlx1NjMwMVxuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXG5cbi8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEQ0NFx1NkU5MFx1NTM4Qlx1N0YyOVxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT5cbiAgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEQ0NFx1NkU5MFx1NTM4Qlx1N0YyOSwgXHU1M0VGXHU5MDA5IGd6aXAsIGJyb3RsaUNvbXByZXNzLCBkZWZsYXRlLCBkZWZsYXRlUmF3XG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICAvLyBcdTUzRUZcdTRFRTVcdTc1MjhcdUZGMENcdTUzRUFcdTY2MkZcdTRFMERcdTgwRkRcdTkwMUFcdThGQzd0c1x1NzY4NFx1NjhDMFx1NjdFNSBcdTIxOTNcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhbGdvcml0aG06ICdnemlwJ1xuICAgICAgfSksXG5cbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZSddXG4gICAgICB9KSxcblxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKCksXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgcHJlZml4OiAnaWNvbidcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9KSxcblxuICAgICAgSWNvbnMoe1xuICAgICAgICBjb21waWxlcjogJ3Z1ZTMnLFxuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZVxuICAgICAgICAvLyBkZWZhdWx0U3R5bGU6ICd3aWR0aDogMC43NXJlbTsgaGVpZ2h0OjAuNzVyZW07IHRyYW5zZm9ybTogc2NhbGUoMS41KSdcbiAgICAgIH0pLFxuXG4gICAgICBVbm9jc3Moe1xuICAgICAgICBwcmVzZXRzOiBbcHJlc2V0VW5vKCksIHByZXNldEF0dHJpYnV0aWZ5KCksIHByZXNldEljb25zKCldLFxuICAgICAgICBydWxlczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gXHU0RUU1XHU0RTBCXHU5MTREXHU3RjZFXHU2NjJGXHU0RTNBXHU0RTg2XHU1M0VGXHU0RUU1XHU1NzI4XHU3RUM0XHU0RUY2XHU0RTJEXHU2NkY0XHU2NUI5XHU0RkJGXHU1NzMwXHU0RjdGXHU3NTI4XHU1NkZFXHU2ODA3PGVsLWJ1dHRvbiBpY29uPVwiaS1lcC1sb2NrXCIvPlxuICAgICAgICB2YXJpYW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1hdGNoOiAocykgPT4ge1xuICAgICAgICAgICAgICBpZiAocy5zdGFydHNXaXRoKCdpLScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIG1hdGNoZXI6IHMsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RvcjogKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMuc3RhcnRzV2l0aCgnLicpID8gYCR7cy5zbGljZSgxKX0sJHtzfWAgOiBzXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIF0sXG5cbiAgICBkZWZpbmU6IHtcbiAgICAgICdwcm9jZXNzLmVudic6IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgICB9LFxuXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlLnNjc3NcIjsnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA2NyxcbiAgICAgIGh0dHBzOiB7XG4gICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKCdzcmMvYXNzZXRzL3NzbC9kZXYua2V5JyksXG4gICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYygnc3JjL2Fzc2V0cy9zc2wvZGV2LnBlbScpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0BpbWFnZScsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvYXNzZXRzL2ltYWdlJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAdmlkZW8nLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoJy4vc3JjL2Fzc2V0cy92aWRlbycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQGFwaScsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZSgnLi9zcmMvcmVxdWVzdC9hcGknKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0Bjb21wb25lbnRzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9jb21wb25lbnRzJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAdXRpbHMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoJy4vc3JjL3V0aWxzJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAcGFnZXMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoJy4vc3JjL3BhZ2VzJylcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAcm91dGVzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKCcuL3NyYy9yb3V0ZXMnKVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUSxTQUFTLGNBQWMsZUFBZTtBQUN4UyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBRTFCLE9BQU8sWUFBWTtBQUVuQixTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjtBQUcxRCxPQUFPLHFCQUFxQjtBQUM1QixPQUFPLFFBQVE7QUFHZixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQ3JCLGFBQWE7QUFBQSxFQUNYLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBRUosZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1B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
