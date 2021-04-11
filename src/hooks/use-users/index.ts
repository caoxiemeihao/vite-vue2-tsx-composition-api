import { ref } from '@vue/composition-api'
import { User } from './interface'

export default function () {
  const users = ref<User[]>([])
  fetch('https://api.github.com/users')
    .then(_ => _.json())
    .then(data => {
      users.value = data
    })
  return {
    users
  }
}
