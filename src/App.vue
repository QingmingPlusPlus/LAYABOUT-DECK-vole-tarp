<script setup lang="ts">
import {ref} from "vue";
import Filter from "./components/Filter.vue";
import Album from "./components/Album.vue";
import Deck from "./components/Deck.vue";
import {Card} from "./data/getCardList.ts";

const cardName = ref('')
const selectedCardList = ref([] as Card[])
const setCardName = (name: string) => {
  cardName.value = name
}

const addCard = (card: Card) => {
  selectedCardList.value.push(card)
  selectedCardList.value.sort((a, b) => a.name.localeCompare(b.name))
}
const emptyDeck = () => {
  selectedCardList.value = []
}

const delCardByIdx = (idx: number) => {
  selectedCardList.value.splice(idx, 1)
}
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <Filter @name-change="setCardName"/>
    <div class="flex-grow h-full w-screen  bg-amber-500 flex flex-row">
      <Album :name="cardName" @add-card="addCard"></Album>
      <Deck class="w-1/3 bg-red-300" :card-list="selectedCardList" @empty="emptyDeck" @remove="delCardByIdx"></Deck>
    </div>
  </div>
</template>

<style scoped>

</style>
