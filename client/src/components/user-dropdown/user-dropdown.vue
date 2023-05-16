<template>
  <div class="dropdown__container" @mouseover="showDropdown" @mouseleave="hideDropdown">
    <button class="dropdown__btn">{{ user.name }}</button>
    <div class="dropdown" v-if="isShowDropdown">
      <ul class="dropdown__list">
        <li><button class="text">Заказы</button></li>
        <li><button class="text" @click="logout">Выйти</button></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";

const user = computed(() => useUserStore().user)

const isShowDropdown = ref(false)

const showDropdown = () => {
  if (!isShowDropdown.value) isShowDropdown.value = true
}
const hideDropdown = () => {
  if (isShowDropdown.value) isShowDropdown.value = false
}
const logout = () => {
  useUserStore().logout()
}
</script>

<style scoped lang="sass">
.dropdown
  position: absolute
  top: 100%
  background-color: var(--accent-color)
  color: var(--text-color)
  z-index: 1

  &__container
    position: relative
    width: fit-content
    height: 100%

  &__btn
    background-color: transparent
    border: none
    color: var(--text-color)
    padding: 15px 10px

  &__list button
    width: 100%

    &:hover
      background-color: var(--accent-color-hover)


</style>