import { defineComponent } from '@vue/composition-api'
import styles from './index.module.less'

export default defineComponent({
  setup() {
    console.log('========')
  },
  render() {
    return (
      <div class={styles.home}>
        Home component.
      </div>
    )
  },
})
