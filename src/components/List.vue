<template>
  <div>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" v-model="checked" v-on:change="onChangeCheck"></th>
          <th>id</th>
          <th>num</th>
          <th>text</th>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="item in items"
          v-bind:key="item.path"
          :item="item"
          :extra="extra"
        />
        <tr>
          <td>{{checked}}</td>
          <td></td>
          <td>{{sum}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <label>
      <input type="checkbox" v-model="extra">
      show extra info
    </label>
  </div>
</template>

<script>
import ListItem from './ListItem'
const NOW_TIME = new Date().getTime()
const DATE_SPAN = 86400 * 1000 * 7
let itemCount = 5

let initItems = Array.apply(null, new Array(itemCount)).map((val, idx) => {
  return {
    id: idx,
    checked: Math.random() < 0.5,
    number: Math.floor(Math.random() * 10),
    date: new Date(NOW_TIME + Math.random() * DATE_SPAN),
  }
})

export default {
  components: {
    ListItem,
  },
  data () {
    return {
      items: initItems,
      extra: false,
    }
  },
  computed: {
    sum () {
      return this.items.reduce((prev, curr) => Number(prev) + Number(curr.number), 0)
    },
    checked () {
      return this.items.every(item => item.checked)
    },
  },
  methods: {
    onChangeCheck (e) {
      let src = { checked: e.target.checked }
      this.items.map(item => Object.assign(item, src))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  margin: auto;
  font-size: 20px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
