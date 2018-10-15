<template>
  <div class="ingredient ui grid">
      <span v-show="isEditing">
        <button class="ui negative basic button trash" v-on:click="deleteIngredient">
          <i class='trash alternate outline icon' />
        </button>
      </span>
      <span>
        <span v-show="!isEditing">
          <i class='utensil icon' />
        </span>
        {{ ingredient.name }} ({{ ingredient.quantity }} {{ ingredient.unit }})
      </span>
  </div>
</template>

<script>

export default {
  name: 'Ingredient',
  props: ['ingredient', 'isEditing'],
  methods: {
    deleteIngredient() {
      this.$parent.deleteIngredient(this.ingredient);
    },
  },
};
</script>

<style>
.ingredient {
  margin: 20px 0px !important;
}
.center {
  text-align: center;
}
.ui.negative.basic.button.trash{
  padding: 5px 0pc 5px 9px;
}
</style>
