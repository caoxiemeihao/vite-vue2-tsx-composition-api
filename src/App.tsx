import { defineComponent, onMounted } from '@vue/composition-api'
import HelloWorld from './components/HelloWorld.vue'
import logo from '@/assets/logo.png'
import style from './App.module.less'

export default defineComponent({
  setup() {
    onMounted(() => {})
  },
  render() {
    return (
      <div class={style.app}>
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </div>
    )
  },
})
