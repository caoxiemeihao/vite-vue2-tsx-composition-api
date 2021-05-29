import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import _ from 'lodash'
import pkg from './package.json'

export default defineConfig((env) => ({
  plugins: [
    vue(),
    vueJsx(),
    {
      name: '草鞋没号:transform-index.html',
      transformIndexHtml(_html, _ctx) {
        const html = fs.readFileSync(path.join(__dirname, 'public/index.html'))
        const compiled = _.template(html, { interpolate: /<%=([\s\S]+?)%>/g })
        const tpl = compiled({
          BASE_URL: '/',
          htmlWebpackPlugin: {
            options: {
              title: pkg.name,
            },
          }
        })
        return tpl.replace('</body>', `<script type="module" src="/src/main.js"></script>
</body>`)
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx'],
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
}))
