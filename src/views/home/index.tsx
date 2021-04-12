/* eslint-disable */
import { defineComponent, ref, watch } from '@vue/composition-api'
import { NavBar, Tab, Tabs, Row, Col, Image, Toast, Button } from 'vant'
import useUsers from '@/hooks/use-users'
import withComps from '@/hooks/with-comps'
import HelloWorld from '@/components/HelloWorld.vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'home',
  setup() {
    const { users } = useUsers()
    const { date, visble, component } = withComps()
    const tab = ref(1)
    const toast = Toast.loading({
      message: 'Loading...',
      forbidClick: true,
    })

    const unwatch = watch(
      () => users.value,
      (newVal, oldVal) => {
        if (newVal.length) {
          unwatch()
          toast.close()
        }
      },
    )

    watch(
      () => date.value,
      () => {
        Toast(`你选择的日期:\n${new Array(37).fill('-').join('')}\n${date.value}`)
      },
    )

    return {
      tab,
      users,
      HCVisble: visble,
      HCComponent: component,
    }
  },
  render() {
    const HookComp = (
      <Row class="img-box">
        {this.users.map((user, idx) => (
          <Col class="img-item" key={idx} span={8}>
            <Image src={user.avatar_url} />
            <div>{user.login}</div>
          </Col>
        ))}
      </Row>
    )

    return (
      <div class={styles.home}>
        <NavBar title="Home" />
        <main>
          <Tabs vModel={this.tab}>
            <Tab title="Hooks" name={1}>
              {HookComp}
            </Tab>
            <Tab title="H-C" name={2}>
              <h2>
                Hooks with Component
              </h2>
              <div>
                <Button type="info" onclick={() => this.HCVisble = true}>点击唤起日期</Button>
              </div>
              {this.HCComponent()}
            </Tab>
            <Tab title="Component" name={3}>
              <HelloWorld />
            </Tab>
          </Tabs>
        </main>
      </div>
    )
  },
})
