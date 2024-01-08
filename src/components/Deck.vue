<script setup lang="ts">
import {defineProps, nextTick, ref, toRaw, watch} from "vue";
import {Card} from "../data/getCardList.ts";
import {jsPDF} from "jspdf";

const prop = defineProps({
  cardList: {
    type: Array,
    required: true,
    default: []
  }
});
const deckDom = ref<HTMLDivElement | null>(null)
const emit = defineEmits(['empty', 'remove'])

function handleEmptyButtonClick() {
  emit('empty')
}

function handleCardClick(idx: number) {
  emit('remove', idx)
}

function handleExportButtonClick() {
  const imgList = toRaw(prop.cardList) as Card[]

  const pdf = new jsPDF({
    unit: 'mm',
  })

  imgList.forEach((img, idx) => {
    const imgData = img.image
    const x = 2 + idx % 3 * 63
    const pageIdx = idx % 9
    const y = 2 + Math.floor(pageIdx / 3) * 88
    pdf.addImage(imgData, 'JPEG', x, y, 65, 90)

    if ((idx % 9 === 8) && (idx !== imgList.length - 1)) {
      pdf.addPage()
    }

  })

  pdf.save('deck.pdf')
}


//@ts-ignore
window.dd = () => {
  console.log(deckDom.value?.scrollTop)
  console.log(deckDom.value?.scrollHeight)
  console.log(deckDom.value?.scrollTo(0, 0))
}
watch(
    () => prop.cardList,
    () => {

      nextTick(() => {
        if (deckDom.value) {
          deckDom.value.scrollTo(0, deckDom.value.scrollHeight)
        }
      })

    },
    {
      deep: true
    }
)
</script>

<template>
  <div class="h-full">
    <div class="h-1/6">
      <button @click="handleEmptyButtonClick" class="rounded border-gray-500 border-2 px-2 py-1 mr-4">清空</button>
      <button @click="handleExportButtonClick" class="rounded border-gray-500 border-2 px-2 py-1">导出</button>
    </div>

    <div class="h-5/6 flex flex-wrap flex-row content-start overflow-auto  pb-10" ref="deckDom">
      <img v-for="(card,idx) in cardList" :src="(card as Card).image" :key="(card as Card).image"
           :alt="(card as Card).name" @click="handleCardClick(idx)"
           class="m-2 w-1/3">
    </div>
  </div>
</template>
