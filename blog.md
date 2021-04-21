- [图]()


## 前言
1. 我猜你可能是一个更偏向于个 `React` 开发者
2. 我猜你可能深深的感受到了 `Hooks` 带来的 `逻辑复用、响应式编程` 的种种便利
3. 我猜你可能深度依赖 `Typescript`，又很喜欢 `JSX` 的强大表现力
4. 我估计你公司用的 `Vue2`，虽然出了 `Vue3` 可以用上面种种好处；可是你还得维护 `Vue2` 老项目
5. 我估计你心里很不爽，又想学习 `Vue3` 带来新特性，又想重构已有 `Vue2` 项目但是成本太大
6. 我估计你再这么下去，可能是想跑路了都~ 👻
7. ...

- **目的** 本文是从 `React` 使用者视角带你解锁 `Vue2` 中开启 `Composition API` 🖖 并使用 `TSX` 🚀 地开发模式 🎉
- **希望** 本文能助你一臂之力 💪 不要慌，你还可以继续治疗 💊

## 目标
- 使用 `Vue2` 工程模板加入 `Composition API` 插件
- 开启 `.ts`、`.tsx` 支持

### 初始化项目
> 略~

### 加入 Composition API plugin
- 添加依赖
```bash
yarn add @vue/composition-api
```

### 开启 ts、tsx 支持
> 本项目使用的 Babel@7.x

- 添加依赖
  ```bash
  yarn add -D @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props @babel/plugin-transform-typescript
  ```

- 修改配置文件
  * `babel.config.js`
    ```diff
    module.exports = {
      presets: [
        '@vue/cli-plugin-babel/preset',
    +   ['@vue/babel-preset-jsx', { compositionAPI: true }], // 开启 jsx
      ],
    + plugins: [
    +   ['@babel/plugin-transform-typescript', { isTSX: true }], // 开启 typescript
    + ],
    }
    ```

  * `vue.config.js`
  ```diff
  + const path = require('path')

  + module.exports = {
  +   configureWebpack: {
  +     resolve: {
  +       alias: {
  +         '@': path.resolve(__dirname, './src'),
  +       },
  +       extensions: ['.ts', '.tsx'],
  +     },
  +     module: {
  +       rules: [
  +         {
  +           test: /\.(jsx|tsx|ts)$/,
  +           loader: 'babel-loader',
  +         },
  +       ],
  +     },
  +   },
  + }
  ```


## 注意！
- `setup` 中不支持(setup 中没有 this) `tsx`, 必须写在 `render` 中

## 参考文章
- [用于提供 组合式 API 的 Vue 2 插件](https://github.com/vuejs/composition-api/blob/HEAD/README.zh-CN.md)
- [Configurable preset for Vue JSX plugins](https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx)
- [在Vue中使用JSX的正确姿势](https://zhuanlan.zhihu.com/p/37920151)

