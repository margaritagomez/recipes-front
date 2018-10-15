<template>
  <div class="ingredient">
    <p>{{ ingredient.name }} ({{ ingredient.quantity }} {{ ingredient.unit }})</p>
    <!--<div class='extra content'>
      <span class='right floated edit icon' v-on:click="showForm">
       <i class='add icon' />
      </span>
    </div>-->
  </div>
</template>

<script>

export default {
  name: 'Ingredient',
  props: ['ingredient'],
};
</script>

<style>
.ingredient {
  margin: 0;
}
</style>
