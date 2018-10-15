<template>
  <div class="recipe four wide column">
    <div class="ui centered card">
      <div class='content' v-show="!isEditing">
        <div class="header">
          {{ recipe.title }}
        </div>
        <div class='meta'>
          <img :src=recipe.image />
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
          <i class='edit icon' />
          </span>
        </div>
      </div>
      <div class="content" v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input type='text' v-model="recipe.title" >
          </div>
          <div class='field'>
            <label>Image</label>
            <input type='text' v-model="recipe.image" >
          </div>
          <div class='field'>
            <label>Ingredients</label>
            <Ingredient
              v-for="ingredient in ingredients"
              v-bind:key="ingredient.name"
              v-bind:ingredient="ingredient"
              v-bind:isEditing="isEditing"
            />
          </div>
          <div class='field'>
            <label>Instructions</label>
            <input type='text' v-model="recipe.instructions" >
          </div>
          <div class='ui bottom attached button'>
            <button class='ui green basic button' v-on:click="hideForm">
              Close and save
            </button>
          </div>
        </div>
      </div>
      <div
        class='ui bottom attached red basic button'
        v-show="!isEditing"
        v-on:click="deleteRecipe"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import Ingredient from './Ingredient';

export default {
  name: 'Recipe',
  components: {
    Ingredient,
  },
  props: ['recipe'],
  data() {
    return {
      isEditing: false,
      ingredients: this.recipe.ingredients,
    };
  },
  methods: {
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
    deleteRecipe() {
      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this recipe!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        console.log(result);
        axios.delete('https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes', { data: this.recipe })
          .then(response => swal('Deleted!', response.data.msg, 'success'))
          .catch(error => console.log(error.response.data));
      });
    },
  },
};
</script>

<style>
.recipe {
  margin: 0;
}
</style>
