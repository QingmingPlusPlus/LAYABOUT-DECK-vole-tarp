<script setup lang="ts">
import {defineProps} from "vue";
import {Card} from "../data/getCardList.ts";

defineProps({
  cardList: {
    type: Array,
    required: true,
    default: []
  }
});

const emit = defineEmits(['empty', 'remove'])

function handleEmptyButtonClick() {
  emit('empty')
}

function handleCardClick(idx: number) {
  emit('remove', idx)
}

</script>

<template>
  <div class="h-full overflow-auto">
    <button @click="handleEmptyButtonClick" class="rounded border-gray-500 border-2 px-2 py-1">清空</button>
    <div class="flex flex-wrap flex-row">
      <img v-for="(card,idx) in cardList" :src="(card as Card).image" :key="(card as Card).image"
           :alt="(card as Card).name" @click="handleCardClick(idx)"
           class="m-2 w-1/3">
    </div>

  </div>
</template>
