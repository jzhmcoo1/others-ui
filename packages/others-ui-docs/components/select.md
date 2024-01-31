# Select

<br>

<div>
  <div>{{val}}</div>
  <ot-select :options="options" @change="val = $event.detail"/>
</div>

<script setup>
  import { ref } from 'vue'

  const val = ref(0)

  const options = [
    {
      label: '第一个',
      value: "1"
    },
    {
      label: '第二个',
      value: "2"
    },
    {
      label: '第三个',
      value: "3"
    },
    {
      label: '第四个',
      value: "4"
    },
    {
      label: '第五个',
      value: "5"
    }
  ]
</script>


