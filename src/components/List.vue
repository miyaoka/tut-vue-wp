<template>
  <div>
    <h2>
      active:{{enabledSum}} / total:{{allSum}}
    </h2>

    <label>
      <input type="checkbox" v-model="extra">
      show raw data
    </label>
    <fancy-btn @click.native="addItem(2)">
      Add(2)
    </fancy-btn>
    <fancy-btn @click.native="clearItem()">
      Clear
    </fancy-btn>

    <div :class="{ isLoading: isLoading }">
      <table v-if="items.length > 0">
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
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          <list-item
            v-for="(item, i) in items"
            v-bind:key="item.id"
            v-model="items[i]"
            :extra="extra"
            :deleteItem="deleteItem"
          />
        </tbody>
      </table>
      <div v-else>
        No Data
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ListItem from './ListItem'
import SlideCheckBtn from './SlideCheckBtn'
import FancyBtn from './FancyBtn'

const RANDOM_USER_API = 'https://randomuser.me/api/'
// const RANDOM_USER_API = './static/api/users.json'

const INIT_COUNT = 5

export default {
  components: {
    ListItem,
    SlideCheckBtn,
    FancyBtn,
  },
  data () {
    return {
      items: [],
      extra: false,
      lastID: 0,
      loadingCount: 0,
    }
  },
  created () {
    this.addItem(INIT_COUNT)
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
    isLoading () {
      return this.loadingCount > 0
    },
  },
  methods: {
    deleteItem (id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    addItem (count) {
      this.loadingCount++

      axios.get(RANDOM_USER_API, {
        params: {
    //      seed: 'foobar',
          results: count,
        },
      })
      .then(res => {
        this.items = this.items.concat(
          res.data.results.map(item => Object.assign(item, {
            enabled: Math.random() < 0.5,
            number: Math.floor(Math.random() * 10),
            id: this.lastID++,
          }))
        )
      })
      .catch(e => {
        this.errors.push(e)
      })
      .then(() => {
        this.loadingCount--
      })
    },
    clearItem () {
      this.items = []
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.isLoading > * {
  border: #f00 10px solid;
  transition: all 0.2s ease-out;
}

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
