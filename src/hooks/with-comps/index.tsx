import { ref } from '@vue/composition-api'
import { Calendar } from 'vant'

export default function () {
  const visble = ref(false)
  const date = ref()

  const onConfirm = (val) => {
    visble.value = false
    date.value = val
  }

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
