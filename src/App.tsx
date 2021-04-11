import { defineComponent, onMounted } from '@vue/composition-api'
import HelloWorld from './components/HelloWorld.vue'
import logo from '@/assets/logo.png'

export default defineComponent({
  setup() {
    onMounted(() => {})
  },
  render() {
    console.log(this)
    return (
      <div class="app">
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </div>
    )
  },
})
