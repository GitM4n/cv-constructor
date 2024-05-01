import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ]
  },
  build: {
    // Указываем путь к папке, в которой будут размещены собранные файлы
    outDir: 'dist',
    // Дополнительные настройки для сборки
    // Например, если ваши ресурсы находятся в папке assets
    // вы можете указать путь к ним внутри outDir
    assetsDir: 'assets',
    // Дополнительные настройки для обработки ресурсов
    // Например, чтобы указать правильные пути к изображениям
    // вы можете использовать плагин для обработки изображений
    // Подробнее о плагинах можно почитать в документации Vite
    // https://vitejs.dev/config/#plugins
    // plugins: [/* ваш плагин для обработки ресурсов */],
  },
})
