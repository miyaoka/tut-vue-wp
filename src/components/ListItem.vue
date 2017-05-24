<template>
  <tr :class="{ disabled: disabled }">
    <td>
      <slide-check-btn
        v-model="val.enabled"
      />
    </td>
    <td>
      {{val.id}}
    </td>
    <td>
      <img :src="picture">
    </td>
    <td>
      {{val.gender}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      <input
        type="number"
        class="number"
        v-model="val.number"
        :disabled="disabled"
      >
    </td>
    <td class="raw" v-if="extra">
      {{val}}
    </td>
  </tr>
</template>

<script>
import SlideCheckBtn from './SlideCheckBtn'

export default {
  name: 'list-item',
  components: {
    SlideCheckBtn,
  },
  data () {
    return {
      val: this.value,
    }
  },
  props: {
    'value': Object, // special prop received from v-model
    'extra': Boolean,
  },
  computed: {
    disabled () {
      return !this.value.enabled
    },
    picture () {
      return this.value.picture ? this.value.picture.thumbnail : ''
    },
    name () {
      return this.value.name ? `${this.value.name.last} ${this.value.name.first}` : ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

input {
  font-size: 18px;
}
input:disabled {
  background: #eee;
}
td:not(:first-child) {
  transition: all 0.3s ease-out;

  .disabled & {
    opacity: .3;
    cursor: not-allowed;
  }
}

.raw {
  font-size: 10px;
}
.number {
  width: 80px;
}

</style>

