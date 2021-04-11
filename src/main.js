import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App'
import router from './router'
import './global.less'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
