<template>
  <tr v-bind:class="{ disabled: disabled }">
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
.disabled td:not(:first-child) {
  opacity: .3;
  cursor: not-allowed;
}
.raw {
  font-size: 10px;
}
.number {
  width: 80px;
}


.slide-check {
  display: block;
  cursor: pointer;
  position: absolute;

  width: 80px;
  height: 26px;
  background: #333;
  margin: 20px auto;
  position: relative;
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
  &:after {
    content: 'OFF';
    color: #000;
    position: absolute;
    right: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 0px rgba(255,255,255,.15);
  }
  &:before {
    content: 'ON';
    color: #27ae60;
    position: absolute;
    left: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
  }
  .btn {
    display: block;
    width: 34px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 1;
    background: #fcfff4;
    background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    border-radius: 50px;
    transition: all 0.2s ease-out;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);
  }
  input[type=checkbox] {
    visibility: hidden;
    &:checked + .btn {
      left: 43px;
    }
  }
}


</style>

