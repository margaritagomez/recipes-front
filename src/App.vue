<template>
  <div id="app">
    <Recipes/>
  </div>
</template>

<script>
import Recipes from './components/Recipes';

export default {
  name: 'App',
  components: {
    Recipes,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 60px;
}
</style>
