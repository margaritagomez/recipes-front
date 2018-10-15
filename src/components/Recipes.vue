<template>
  <div class="ui stackable two column grid">
    <RecipeNew />
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
import RecipeNew from './RecipeNew';

export default {
  name: 'Recipes',
  components: {
    Recipe, RecipeNew,
  },
  mounted() {
    this.getRecipes();
  },
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
    getRecipes() {
      axios.get('https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes')
        .then((result) => {
          this.recipes = result.data;
        }, (error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.recipes {
  margin: 10;
}
</style>
