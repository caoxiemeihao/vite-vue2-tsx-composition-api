  ![App.tsx](https://raw.githubusercontent.com/caoxiemeihao/vue2-tsx-composition-api/master/screenshots/app-tsx.png)

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
> 略 ~

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
  * 修改根目录 `babel.config.js`
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

  * 根目录新建 `vue.config.js`
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

  * 根目录新建 `tsconfig.json`
    ```diff
    + {
    +   "compilerOptions": {
    +     "target": "ES2017",
    +     "module": "UMD",
    +     "allowJs": true,
    +     "jsx": "preserve",
    +     "moduleResolution": "Node",
    +     "allowSyntheticDefaultImports": true,
    +     "importHelpers": true,
    +     "baseUrl": "./",
    +     "paths": {
    +       "@/*": ["src/*"]
    +     }
    +   }
    + }
    ```

## 修改 App.vue -> App.tsx
- `.vue` 文件和 `.tsx` 可以看成是等价的，直接使用即可；注意 `jsx` 中组件标签首字母一定要大写！
- `.png` 静态资源用法就是直接引入，底层通过 `url-loader` 处理；@vue/cli 集成了静态资源配置

  ```tsx
  import { defineComponent, onMounted } from '@vue/composition-api'
  import HelloWorld from './components/HelloWorld.vue'
  import logo from '@/assets/logo.png'

  export default defineComponent({
    setup() {
      onMounted(() => {})
    },
    render() {
      return (
        <div class="app">
          <img alt="Vue logo" src={logo} />
          <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
      )
    },
  })

  ```
- **注意！**`setup` 中不支持 (setup 中没有 this) `tsx`, 必须写在 `render` 中
- 启动下项目看看效果吧~ 😄
  ```bash
  yarn serve
  ```

---

> Notes

- Demo 使用 `https://api.github.com/users`
- User 定义如下
  ```typescript
  export interface User {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
  }
  ```

## 写一个 Component
```tsx
import { Row, Col, Image } from 'vant'

export default defineComponent({
  props: {
    users: {
      type: Array as { (): User[] }, // 提供调用处的类型推到
      default: [],
    },
  },
  render() {
    return (
      <Row class="img-box">
        {this.users.map((user, idx) => (
          <Col
            class="img-item"
            key={idx}
            span={8}
            // onclick 大写小写都可以的
            // 这里直接用 Vue2 内置的 $emit 要比 React ”稍微“ 方便点
            onclick={() => this.$emit('click', user)}
          >
            <Image src={user.avatar_url} />
            <div>{user.login}</div>
          </Col>
        ))}
      </Row>
    )
  },
})

```

## 写一个 Hooks
- 如果你写过 React Hooks 那么你已经大概知道怎么写的了
- 它看起来像个普通的 `函数式` 组件，一般意义的函数式组件返回 `VNode`，Hooks 返回 `状态`

  ```tsx
  // React Hooks
  import { useState, useEffect } from 'react'

  export function useRequestWithReact() {
    const [users, setUsers] = useState([])
    useEffect(() => {
      fetch('https://api.github.com/users')
        .then(_ => _.json())
        .then(data => {
          setUsers(users)
        })
    }, [])

    return { users }
  }

  // usage
  export default () => {
    const { users } = useRequestWithReact()
    
    return users.map(user =>
      <div key={user.id}>{user.login}</div>
    )
  }
  ```

  ```tsx
  // Vue2 Composition API
  import { ref } from '@vue/composition-api'

  export function useRequestWithVue2() {
    const users = ref([])
    fetch('https://api.github.com/users')
      .then(_ => _.json())
      .then(data => {
        users.value = data
      })

    return { users }
  }

  // usage
  export default () => {
    const { users } = useRequestWithVue2()
    
    return users.map(user =>
      <div key={user.id}>{user.login}</div>
    )
  }
  ```

- 这俩个框架的 Hooks/Composition API 设计真的很相似，就像现在的 `Android` 和 `iOS` 系统 😂

  [与 React Hooks 的对比](https://zhuanlan.zhihu.com/p/68477600)

  ```
  整体上更符合 JavaScript 的直觉；
  不受调用顺序的限制，可以有条件地被调用；
  不会在后续更新时不断产生大量的内联函数而影响引擎优化或是导致 GC 压力；
  不需要总是使用 useCallback 来缓存传给子组件的回调以防止过度更新；
  不需要担心传了错误的依赖数组给 useEffect/useMemo/useCallback 从而导致回调中使用了过期的值 —— Vue 的依赖追踪是全自动的。
  ```

## 写一个 Hooks with Component

#### How and why?

- 试想一下我们写一个 Component
  * 收益: 能复用 UI 展示，内部能够有自己的逻辑、状态
  * 弊端: 内部逻辑、状态对外通讯 **需要有一定的手段** 处理，Vue、React 均是如此
- 试想一下我们写一个 Hooks
  * 收益: 提供逻辑复用、调用处状态自动更新

- 能不能把 Hooks、Component 的收益放到一起呢？(成年人的世界选择全要😏)
  Function Component、Hooks 只是返回值看起来不一样而已；要是我们 “两者都返回” 怎么样？
  * 收益: 能复用 UI 展示，内部能够有自己的逻辑、状态
    借助响应式设计会 **自动吐出来** 内部状态
    而不再是使用组件的种种通讯方式去 **手动捞出来** 内部状态

- 基于 vant 设计一个 `useCalendar`
  ```tsx
  // src/hooks/useCalendar.tsx
  import { ref } from '@vue/composition-api'
  import { Calendar } from 'vant'

  export default function () {
    const visble = ref(false)
    const date = ref()

    const onConfirm = (val) => {
      visble.value = false
      date.value = val
    }

    // 这里必须要用函数包裹
    // 因为 setup 中无法使用 h 函数
    // component 需要传递到 dome.tsx 的 render 中调用，render 中可以使用 h 函数，及正确的 this 指向
    // 不使用箭头函数的目的也是为了 this 的正确指向
    // ！！！
    // 这种写法在 Vue3.x、React 要更简单、容易理解一些
    // 毕竟这是 vue2 的插件，还是有些写法限制的
    // ！！！
    const component = function () {
      return <Calendar
        vModel={visble.value}
        onConfirm={onConfirm}
      />
    }

    return {
      visble,
      date,
      component,
    }
  }

  // src/views/dome.tsx
  import { defineComponent, watch, computed } from '@vue/composition-api'
  import { Button } from 'vant'

  export default defineComponent({
    setup() {
      const { date, visble, component } = useCalendar()

      watch(date, => {
        // 永远在选择日期后自动执行 wath 的 callback
        // 而不是通过通讯的手段去手动捞出
        console.log('你选择的日期是:', date)
      })

      // 或者 computed(() => date -> do something...)

      return {
        visble,
        component,
      }
    },
    render() {
      return (
        <div>
          <Button onclick={() => this.visble = true}>点击唤起日期</Button>
          <hr/>
          {this.component()}
        </div>
      )
    },
  })
  ```

![Hooks with Component](https://raw.githubusercontent.com/caoxiemeihao/vue2-tsx-composition-api/master/screenshots/HC-page.png)

- 至此，我们可以在回答 Hooks 的面试题时候来一句：“Hooks 除了逻辑复用，还能实现 UI 复用”
  相信你对工作中一些场景是该封装 `Component` 还是 `Hooks` 会有了一个新的参考 🖖

#### 个人关于 Vue 的 Composition API 看法
  * 设计更贴近 `响应式编程` 就像没有 `operator` 的 `rxjs`；有那味儿 ~
  * `ref、reactive` 数据源为 **可观察对象**；`模板`、`component`、`watch` 这些可以视为订阅者
  * `watch、watchEffect` 设计又和 `mobx` 中的 `reaction、autorun` 行为基本一致

#### 个人关于 React 的 Hooks 看法
  * React 的 Hooks 在 setState 后重复调用当前组件(函数)，通过执行当前组件内的 useEffect、useMemo 并对比 deps 决定是否 “响应”； 模拟了 响应式 设计
  * 引用官网的一句话 ~ (可能你木有注意到哦)
  ![React Hooks](https://raw.githubusercontent.com/caoxiemeihao/vue2-tsx-composition-api/master/screenshots/react-hooks.png)


## VSCode 配置
- `emmet` 生成 `class` 而不是 `className`
  ```json
  {
    "emmet.includeLanguages": {
      "javascriptreact": "html",
      "typescriptreact": "html"
    }
  }
  ```

## 参考文章
- [用于提供 组合式 API 的 Vue 2 插件](https://github.com/vuejs/composition-api/blob/HEAD/README.zh-CN.md)
- [Configurable preset for Vue JSX plugins](https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx)
- [在Vue中使用JSX的正确姿势](https://zhuanlan.zhihu.com/p/37920151)

