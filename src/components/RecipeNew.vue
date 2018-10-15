<template>
  <div class="column">
    <button
    class='massive ui inverted blue button icon add'
    v-on:click="openForm"
    v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <RecipeForm
      v-show="isCreating"
      v-bind:isEditing="true"
      v-bind:recipe="recipe"
      v-bind:isCreating="isCreating"
    />
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import RecipeForm from './RecipeForm';

export default {
  name: 'RecipeNew',
  components: {
    RecipeForm,
  },
  data() {
    return {
      recipe: {
        image: '',
        title: '',
        ingredients: [],
        instructions: '',
      },
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeFormAndSave() {
      this.isCreating = false;
      axios.post('https://cors-anywhere.herokuapp.com/https://evening-peak-29761.herokuapp.com/recipes', this.recipe)
        .then(() => {
          this.$parent.getRecipes();
          swal({
            type: 'success',
            title: 'Your recipe has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.recipe.title = '';
          this.recipe.image = '';
          this.recipe.instructions = '';
          this.recipe.ingredients.splice(0, this.recipe.ingredients.length);
        })
        .catch(error => console.log(error));
    },
    sendForm() {
      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const title = this.titleText;
        const project = this.projectText;
        this.$emit('create-todo', {
          title,
          project,
          done: false,
        });
        this.newTodoText = '';
      }
      this.isCreating = false;
    },
  },
};
</script>

<style>
.recipes {
  margin: 10;
}
.ui.button.add {
  width: 100%;
  height: 98%;
}
</style>
