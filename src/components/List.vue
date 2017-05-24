<template>
  <div>
    <h2>
      active:{{enabledSum}} / total:{{allSum}}
    </h2>
    <label>
      <input type="checkbox" v-model="extra">
      show raw data
    </label>
    <table>
      <thead>
        <tr>
          <th>
            <slide-check-btn
              v-model="enabledAll"
            />
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
        />
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'
import ListItem from './ListItem'
import SlideCheckBtn from './SlideCheckBtn'

// const RANDOM_USER_API = 'https://randomuser.me/api/'
const RANDOM_USER_API = './static/api/users.json'

const SHOW_COUNT = 10

export default {
  components: {
    ListItem,
    SlideCheckBtn,
  },
  data () {
    return {
      items: [],
      extra: false,
    }
  },
  created () {
    axios.get(RANDOM_USER_API, {
      params: {
  //      seed: 'foobar',
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
      get () {
        return this.items.every(item => item.enabled)
      },
      set (val) {
        const src = { enabled: val }
        this.items.map(item => Object.assign(item, src))
      },
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

table {
  margin: auto;
  font-size: 20px;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #ccc;
}

thead {
	background: #04162e;
  color: #fff;
}

th {
  padding: 0 10px;
}

</style>
