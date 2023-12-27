<script setup lang="ts">
import {ref} from "vue";
import _ from "lodash";

const emit = defineEmits(["name-change"])

const cardName = ref("");
const onCardNameChange = _.debounce(() => {
  emit("name-change", cardName.value)
}, 500)
const clearInput = () => {
  cardName.value = ''
  onCardNameChange()
}
</script>

<template>
  <div class="flex">
    <label>
      <span>名称:</span>
      <input v-model="cardName" type="text" @input="onCardNameChange"
             class="border-2 border-gray-400 outline-1 rounded-xl pl-2">
    </label>
    <button @click="clearInput">清空</button>
  </div>
</template>
