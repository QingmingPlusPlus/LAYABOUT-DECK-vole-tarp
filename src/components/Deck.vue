<script setup lang="ts">
import {Card, getCardList} from "../data/getCardList";
import {onMounted, onUnmounted, ref} from "vue";


const MIN_BOTTOM_GAP = 5
const allCardList: Card[] = []
const cardList = ref<Card[]>([])
const boxDom = ref<HTMLDivElement | null>(null)

let pageNo = 0
const pageSize = ref(10)

function handleScroll(e: Event) {
  const target = e.target as HTMLDivElement
  if (target.scrollHeight - target.scrollTop - target.clientHeight < MIN_BOTTOM_GAP) {
    pageNo +=1
    loadNextPage()
  }
}

/**
 * 懒加载方法：加载下一页
 * SideEffect
 */
function loadNextPage() {
  const start = pageNo * pageSize.value
  const end = start + pageSize.value

  cardList.value.push(...allCardList.slice(start, end))
}

getCardList().then(res => {
  allCardList.push(...res as Card[]
)
  loadNextPage()
})


onMounted(() => {
  boxDom.value?.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  boxDom.value?.removeEventListener('scroll', handleScroll)
})


</script>

<template>
  <div ref="boxDom" class=" overflow-auto flex-grow flex flex-row flex-wrap justify-start items-start bg-amber-500">
    <div v-for="card in cardList" :key="card.image" class="m-2 flex-grow-0">
      <img :src="card.image" :alt="card.name">
    </div>
  </div>
</template>
