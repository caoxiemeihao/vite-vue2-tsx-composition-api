import { ref } from '@vue/composition-api'
import { Toast } from 'vant'
import { User } from './interface'

export default function () {
  const users = ref<User[]>([])
  fetch('https://api.github.com/users')
    .then(_ => _.json())
    .then(data => {
      if (!Array.isArray(data)) {
        return Toast(`获取数据失败\n${data}`)
      }
      users.value = data
    })
  return {
    users
  }
}
