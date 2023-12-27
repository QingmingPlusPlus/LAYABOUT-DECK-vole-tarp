<script setup lang="ts">
import {Card, getCardList} from "../data/getCardList";
import {defineProps, onMounted, onUnmounted, ref, watch} from "vue";

const emit = defineEmits(['add-card'])

const MIN_BOTTOM_GAP = 5
const CARD_WIDTH = 300
const CARD_HEIGHT = 417

const props = defineProps({
  name: {
    type: String,
    required: false
  }
})
const allCardList: Card[] = []
const cardList = ref<Card[]>([])
const boxDom = ref<HTMLDivElement | null>(null)

let pageNo = 0
let pageSize = 10
let resizeObserver: ResizeObserver | null = null

function handleCardClick(card: Card) {
  emit('add-card', card)
}

function handleScroll(e: Event) {
  const target = e.target as HTMLDivElement
  if (target.scrollHeight - target.scrollTop - target.clientHeight < MIN_BOTTOM_GAP) {
    pageNo += 1
    loadNextPage()
  }
}

function handlePageResize(entries: ResizeObserverEntry[]) {
  const {width, height} = entries[0].contentRect
  pageSize = calcPageSize(width, height)
}

function calcSizeGen(cardWidth: number, cardHeight: number) {
  return function (width: number, height: number) {
    const col = Math.ceil(width / cardWidth) + 1
    const row = Math.ceil(height / cardHeight) + 1
    return col * row
  }
}

const calcPageSize: (width: number, height: number) => number = calcSizeGen(CARD_WIDTH, CARD_HEIGHT)

function loadNextPage() {
  const start = pageNo * pageSize
  const end = start + pageSize
  cardList.value.push(...allCardList.slice(start, end))
}

onMounted(async () => {

  if (!boxDom.value) {
    console.warn('DOOOOOOM!!')
    return
  }


  boxDom.value.addEventListener('scroll', handleScroll)


  resizeObserver = new ResizeObserver(handlePageResize)
  resizeObserver.observe(boxDom.value)


})
onUnmounted(() => {
  boxDom.value?.removeEventListener('scroll', handleScroll)

  if (resizeObserver && boxDom.value) {
    resizeObserver.unobserve(boxDom.value)
    resizeObserver = null
  }

  boxDom.value = null
})
watch(
    () => props.name,
    (name) => {

      allCardList.length = 0;
      cardList.value.length = 0;
      pageNo = 0;
      pageSize = calcPageSize(boxDom.value?.clientWidth || 0, boxDom.value?.clientHeight || 0)

      getCardList({name})
          .then(res => {
            allCardList.push(...res)
            loadNextPage()
          })

    },
    {immediate: true}
)
</script>

<template>
  <div ref="boxDom" class="overflow-auto h-full w-full flex flex-row flex-wrap justify-start items-start">
    <div v-for="card in cardList" :key="card.image" class="m-2 flex-grow-0">
      <img :src="card.image" :alt="card.name" @click="handleCardClick(card)">
    </div>
  </div>
</template>
