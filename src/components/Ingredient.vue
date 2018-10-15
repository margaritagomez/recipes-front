<template>
  <div class="ingredient ui grid">
      <div class="one wide column" v-show="isEditing">
        <button class="ui negative basic button trash" v-on:click="deleteIngredient">
          <i class='trash alternate outline icon' />
        </button>
      </div>
      <div class="fifteen wide column">
        <span v-show="!isEditing">
          <i class='utensil icon' />
        </span>
        {{ ingredient.name }} ({{ ingredient.quantity }} {{ ingredient.unit }})
      </div>
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
  margin: 0;
}
.center {
  text-align: center;
}
.ui.negative.basic.button.trash{
  padding: 5px 0pc 5px 9px;
}
</style>
