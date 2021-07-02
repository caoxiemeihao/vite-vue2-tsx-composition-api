import path from 'path'
import fs from 'fs'
import { defineConfig, Plugin } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import _ from 'lodash'
import pkg from './package.json'

export default defineConfig((env) => ({
  plugins: [
    createVuePlugin({
      jsx: true,
    }),
    transformIndexHtml({
      template: path.join(__dirname, 'public/index.html'),
      templateData: {
        BASE_URL: '/',
        htmlWebpackPlugin: {
          options: {
            title: pkg.name,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // 会导致 GET http://localhost:3000/@vite/client net::ERR_ABORTED 404 (Not Found)
    // extensions: ['.ts',， '.tsx'],
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
}))

function transformIndexHtml(opts: {
  template: string
  templateData?: Record<string, unknown>
}): Plugin {
  const rootIndexHtml = path.join(__dirname, 'index.html')

  if (!fs.existsSync(rootIndexHtml)) {
    // Ensure the index.html exists in root directory.
    fs.symlinkSync(opts.template, rootIndexHtml)
  }

  return {
    name: 'cxmh:transformIndexHtml',
    transformIndexHtml() {
      let indexHtml: string

      try {
        indexHtml = fs.readFileSync(opts.template, 'utf8')
        const compiled = _.template(indexHtml, { interpolate: /<%=([\s\S]+?)%>/g })

        indexHtml = compiled(opts.templateData)

        indexHtml = indexHtml.split('\n')
          .map(line => line.includes('</body>')
            ? `    <script type="module" src="/src/main.js"></script>
${line}`
            : line
          )
          .join('\n')

      } catch (error) {
        indexHtml = `<h2>${error}</h2>`
      }

      return indexHtml
    },
  }
}
