<template>
  <div class="input__container">
    <button @click="fileInputHandler" class="input__btn">
      <slot>Загрузить</slot>
    </button>
    <input class="input__input-file" type="file" name="image" ref="fileInput"
           accept="image/jpeg, image/png, image/jpg" @change="fileHandler">
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null);

function fileHandler(e:Event) {
  emit('update:modelValue', e.target?.files[0])
}

function fileInputHandler() {
  fileInput.value.click();
}
</script>

<style scoped lang="sass">
.input__input-file
  display: none
</style>