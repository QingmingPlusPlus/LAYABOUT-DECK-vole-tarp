<script setup lang="ts">
import {Card, getCardList} from "../data/getCardList";
import {onMounted, ref} from "vue";

const cardList = ref<Card[]>([])
const boxDom = ref<HTMLDivElement | null>(null)
getCardList().then(res => {
  cardList.value = res.slice(0, 10)
})

onMounted(()=>{
  //获取dom元素
  const dom = boxDom.value
  const width = dom?.clientWidth
  const height = dom?.clientHeight
  console.log(width,height)
})

</script>

<template>
  <div ref="boxDom" class=" overflow-auto flex flex-row flex-wrap bg-amber-500">
    <div v-for="card in cardList" :key="card.image" class="m-2 p-1 border-gray-900 rounded-xl border-2">
      <h3>{{ card.name }}</h3>
      <img :src="card.image" :alt="card.name">
    </div>
  </div>
</template>
