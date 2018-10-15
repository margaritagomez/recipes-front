<template>
  <div class=" recipes ui two column grid">
    <Recipe
      v-for="recipe in recipes"
      v-bind:key="recipe.id"
      v-bind:recipe="recipe"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Recipe from './Recipe';

export default {
  name: 'Recipes',
  components: {
    Recipe,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    axios({
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes',
    }).then((result) => {
      this.recipes = result.data;
    }, (error) => {
      console.log(error);
    });
  },
};
</script>

<style>
.recipes {
  margin: 10;
}
</style>
