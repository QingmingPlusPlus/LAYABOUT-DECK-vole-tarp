<script setup lang="ts">
import {ref} from "vue";
import Filter from "./components/Filter.vue";
import Deck from "./components/Deck.vue";

const cardName = ref('')
const setCardName = (name: string) => {
  cardName.value = name
  console.log('setCardName', cardName.value)
}
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <Filter @name-change="setCardName"/>
    <Deck></Deck>
  </div>

</template>

<style scoped>

</style>
