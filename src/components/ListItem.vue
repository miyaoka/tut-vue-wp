<template>
  <tr v-bind:class="{ disabled: disabled }">
    <td>
      <label class="slide-check">
        <input type="checkbox" v-model="item.enabled">
        <div class="btn" />
      </label>
    </td>
    <td>
      {{item.id}}
    </td>
    <td>
      <img :src="picture">
    </td>
    <td>
      {{item.gender}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      <input type="number" v-model="item.number" :disabled="disabled">
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
    picture () {
      return this.item.picture ? this.item.picture.thumbnail : ''
    },
    name () {
      return this.item.name ? `${this.item.name.last} ${this.item.name.first}` : ''
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
  cursor: not-allowed;
}
.disabled td:not(:first-child) {
  opacity: .3;
}
.raw {
  font-size: 10px;
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
    transition: all 0.4s ease;
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

