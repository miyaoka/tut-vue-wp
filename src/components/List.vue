<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>
            <slide-check-btn
              v-model="allCheck"
            />
            {{allCheck}}
          </th>
          <th>id</th>
          <th>img</th>
          <th>gender</th>
          <th>name</th>
          <th>number</th>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="(item, i) in items"
          v-bind:key="item.id"
          v-model="items[i]"
          :extra="extra"
          @change="onUpdate"
        />

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{enabledSum}} / {{allSum}}</td>
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
import axios from 'axios'
import ListItem from './ListItem'
import SlideCheckBtn from './SlideCheckBtn'

// const RANDOM_USER_API = 'https://randomuser.me/api/'
const RANDOM_USER_API = '/static/api/users.json'

const SHOW_COUNT = 5

export default {
  components: {
    ListItem,
    SlideCheckBtn,
  },
  data () {
    return {
      items: [],
      extra: false,
      allCheck: false,
    }
  },
  created () {
    axios.get(RANDOM_USER_API, {
      params: {
        seed: 'foobar',
        results: SHOW_COUNT,
      },
    })
    .then(res => {
      this.items = res.data.results.map((item, i) => Object.assign(item, {
        enabled: Math.random() < 0.5,
        number: Math.floor(Math.random() * 10),
        id: i,
      }))
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    allSum () {
      return this.items.reduce((prev, curr) => Number(prev) + Number(curr.number), 0)
    },
    enabledSum () {
      return this.items.reduce((prev, curr) => Number(prev) + (curr.enabled ? Number(curr.number) : 0), 0)
    },
    enabledAll: {
      get: function () {
        console.log('get')
        return this.items.every(item => item.enabled)
      },
      set: function (newValue) {
        console.log('set')
        const src = { enabled: newValue }
        this.items.map(item => Object.assign(item, src))
      },
    },
  },
  watch: {
    allCheck (newValue, old) {
      console.log('all')
      const src = { enabled: newValue }
      this.items.map(item => Object.assign(item, src))
    },
  },
  methods: {
    onChangeCheck (e) {
      console.log('onchange', e.target)
      const src = { enabled: e.target.checked }
      this.items.map(item => Object.assign(item, src))
    },
    onUpdate (e) {
      console.log('onup', e)
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
