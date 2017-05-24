<template>
  <tr :class="{ disabled: disabled }">
    <td>
      <slide-check-btn
        v-model="item.enabled"
      />
    </td>
    <td>
      {{item.id}}
    </td>
    <td>
      <img :src="picture" class="pic">
    </td>
    <td>
      {{item.gender}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      <input
        type="number"
        class="number"
        v-model="item.number"
        :disabled="disabled"
      >
    </td>
    <td class="raw" v-if="extra">
      <textarea :value="JSON.stringify(item, null, 2)"></textarea>
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
      item: this.value,
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
      return this.value.picture
      ? this.value.picture.medium
      : ''
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

  &:disabled {
    background: #eee;
  }
}

td {
  padding: 4px 10px;
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

.pic {
  transition: 0.15s ease-in;
  transform:scale(1);
  border-radius: 50%;

  .disabled & {
    transform:scale(.5);
  }
}
</style>

