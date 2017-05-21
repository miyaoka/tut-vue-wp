<template>
  <tr v-bind:class="{ disabled: disabled }">
    <td>
      <input type="checkbox" v-model="item.enabled">
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
  props: [
    'item',
    'extra',
  ],
  computed: {
    disabled () {
      return !this.item.enabled
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
input {
  font-size: 18px;
}
input:disabled {
  background: #eee;
  cursor: not-allowed;
}
.disabled td:not(:first-child) {
  opacity: .3;
}
.raw {
  font-size: 10px;
}
</style>
