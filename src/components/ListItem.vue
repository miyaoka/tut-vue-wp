<template>
  <tr v-bind:class="{ disabled: disabled }">
    <td>
      <input type="checkbox" v-model="item.checked">
    </td>
    <td>
      {{item.id}}
    </td>
    <td>
      <input type="number" v-model="item.number" :disabled="disabled">
    </td>
    <td>
      <input type="text" v-model="item.date" :disabled="disabled">
    </td>
    <td class="raw" v-if="extra">
      {{item}}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'list-item',
  data () {
    return {
      checked: false,
      num: 0,
      text: '',
    }
  },
  props: [
    'item',
    'extra',
  ],
  computed: {
    disabled () {
      return !this.item.checked
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
input {
  font-size: 18px;

  &::disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
tr.disabled {
  background: #eee;
}
.raw {
  font-size: 10px;
}
</style>
