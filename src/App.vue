<template>
  <div id="app">
    <list />
  </div>
</template>

<script>
import List from './components/List'

export default {
  name: 'app',
  components: {
    List,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px;
}
</style>
