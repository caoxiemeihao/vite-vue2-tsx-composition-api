import { defineComponent } from '@vue/composition-api'
import { add } from '@/utils'
import HelloWorld from './components/HelloWorld.vue'
import logo from '@/assets/logo.png'

export default defineComponent({
  setup() {
    console.log('----', add(1, 2))
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
