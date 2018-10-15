<template>
  <div id="app">
    <Header />
    <Recipes />
  </div>
</template>

<script>
import Header from './components/Header';
import Recipes from './components/Recipes';

export default {
  name: 'App',
  components: {
    Header, Recipes,
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
