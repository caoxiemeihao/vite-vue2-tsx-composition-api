/* eslint-disable */
import { defineComponent, ref } from '@vue/composition-api'
import { Col, Row, Icon, NavBar } from 'vant'
import { Demo } from './interface'
import styles from './index.module.less'

export default defineComponent({
  name: 'home',
  setup() {
    const demos = ref<Demo[]>([
      {
        title: 'Hooks',
        path: '/hooks',
        // icon: <Icon name="enlarge" />, setup 中不支持 tsx
        icon: {
          name: 'enlarge',
        },
      },
      {
        title: 'Component',
        path: '/component',
        icon: {
          name: 'wap-nav',
        },
      },
      {
        title: 'hooks',
        path: '/hooks',
        icon: {
          name: 'diamond',
        },
      },
    ])

    return {
      demos,
    }
  },
  render() {
    return (
      <div class={styles.home}>
        <NavBar title="Home" />
        <main>
          <div class="items">
            <Row>
              {this.demos.map((demo, idx) => (
                <Col span={8} key={idx}>
                  <div class="icon">
                    <Icon {...{ props: demo.icon }} />
                  </div>
                  <div class="title">
                    <a>{demo.title}</a>
                  </div>
                </Col>
              ))}
            </Row>
            <div class="van-hairline--top" />
            <div class="components">
            </div>
          </div>
        </main>
      </div>
    )
  },
})
