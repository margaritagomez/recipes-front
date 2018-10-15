<template>
  <div class="ui centered card">
    <div class="image">
      <img :src=recipe.image />
    </div>
    <div class='content'>
      <div class="header">
        {{ recipe.title }}
      </div>
      <div class='meta'>
        <h4>Ingredients:</h4>
        <Ingredient
          v-for="ingredient in ingredients"
          v-bind:key="ingredient.name"
          v-bind:ingredient="ingredient"
          v-bind:isEditing="isEditing"
        />
        <h4>Instructions:</h4>
        <p>{{ recipe.instructions }}</p>
      </div>
      <div class='extra content'>
        <span class='right floated edit icon' v-on:click="showForm">
        <button class="ui primary basic button top-margin-button">
            <i class='edit icon' /> Edit
        </button>
        </span>
      </div>
    </div>
    <div
      class='ui bottom attached red basic button'
      v-on:click="deleteRecipe"
    >
    <i class='trash alternate outline icon' />
      Delete
    </div>
  </div>
</template>

<script>
import Ingredient from './Ingredient';

export default {
  name: 'Recipe',
  components: {
    Ingredient,
  },
  props: ['recipe', 'isEditing'],
  data() {
    return {
      ingredients: this.recipe.ingredients,
    };
  },
  methods: {
    showForm() {
      this.$parent.toggleEdit(true);
    },
    deleteRecipe() {
      this.$parent.deleteRecipe();
    },
  },
};
</script>

<style>
.recipe {
  margin: 0;
}
.center{
  text-align: center;
}
.top-margin-button{
  margin-top: 15px !important;
}
.ui.centered.card{
  width: 100%;
}
.image{
  max-height: 500px !important;
  overflow: hidden !important;
}
</style>
