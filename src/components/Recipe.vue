<template>
  <div class="recipe eight wide column">
    <div class="ui centered card">
      <!--Content for displaying recipe-->
      <div class="image">
        <img :src=recipe.image />
      </div>
      <div class='content' v-show="!isEditing">
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
        v-show="!isEditing"
        v-on:click="deleteRecipe"
      >
      <i class='trash alternate outline icon' />
        Delete
      </div>
      <!--Content for updating recipe-->
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
              v-model="recipe.ingredients"
            />
            <div class="center">
              <button
                class="ui secondary basic button top-margin-button"
                v-on:click="addIngredient">
                <i class='plus icon' /> Add
              </button>
            </div>
          </div>
          <div class='field'>
            <label>Instructions</label>
            <textarea type='text' v-model="recipe.instructions" />
          </div>
        </div>
      </div>
      <div
        class='ui bottom attached green basic button'
        v-show="isEditing"
        v-on:click="hideFormAndSave">
        <i class='check icon' /> Save
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
    hideFormAndSave() {
      this.isEditing = false;
      console.log(this.recipe);
      axios.put('https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes', this.recipe)
        .then((response) => {
          console.log(response);
          swal({
            type: 'success',
            title: 'Your recipe has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(error => console.log(error));
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
        if (result.value) {
          axios.delete('https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes', { data: this.recipe })
            .then((response) => {
              this.$parent.deleteRecipe(this.recipe);
              swal('Deleted!', response.data.msg, 'success');
            })
            .catch(error => console.log(error));
        }
      });
    },
    deleteIngredient(pIngredient) {
      const idx = this.ingredients.indexOf(pIngredient);
      this.ingredients.splice(idx, 1);
    },
    addIngredient() {
      swal.mixin({
        input: 'text',
        inputAttributes: {
          autocapitalize: 'on',
        },
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3'],
      }).queue([
        {
          title: 'Name',
          text: 'Write just the name of the ingredient',
        },
        {
          title: 'Quantity',
          text: 'Write just the amount as a number',
        },
        {
          title: 'Unit',
          text: 'Write the unit of measurement (e.i. teaspoon, oz, lb)',
        },
      ]).then((result) => {
        const ing = result.value;
        if (ing) {
          ing[1] = Number(ing[1]) ? Number(ing[1]) : 0;
          const newIng = {
            name: ing[0],
            quantity: ing[1],
            unit: ing[2],
          };
          const idx = this.ingredients.indexOf(newIng);
          console.log(idx);
          if (idx !== -1 || ing[0] === '') {
            swal({
              title: 'Oh no!',
              html: `Either your ingredient: ${newIng.name} (${newIng.quantity} ${newIng.unit}) already exists or you forgot to write its name`,
              confirmButtonText: 'Silly me!',
            });
          } else {
            this.recipe.ingredients.push(newIng);
            swal({
              title: 'All done!',
              html: `Your ingredient: ${newIng.name} (${newIng.quantity} ${newIng.unit}) was added`,
              confirmButtonText: 'Yay!',
            });
          }
        }
      });
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
