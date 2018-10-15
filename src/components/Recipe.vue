<template>
  <div class="recipe column">
    <RecipeCard
      v-show="!isEditing"
      v-bind:isEditing="isEditing"
      v-bind:recipe="recipe"
    />
    <RecipeForm
      v-show="isEditing"
      v-bind:isEditing="isEditing"
      v-bind:recipe="recipe"
    />
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';

export default {
  name: 'Recipe',
  components: {
    RecipeCard,
    RecipeForm,
  },
  props: ['recipe'],
  data() {
    return {
      isEditing: false,
      ingredients: this.recipe.ingredients,
    };
  },
  methods: {
    toggleEdit(pIs) {
      this.isEditing = pIs;
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
