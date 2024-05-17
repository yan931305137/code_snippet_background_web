import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                // 自动导入element-plus组件
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
        }),
        Components({
            resolvers: [
                // 自动导入element-plus组件
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                })
            ],
        }),
        // 自动导入图标组件
        Icons({
            autoInstall: true,
        })
    ]
})
