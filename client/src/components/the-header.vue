<template>
  <header>
    <div class="dropdown__container" @mouseover="showDropdown" @mouseleave="hideDropdown">
      <button class="dropdown__btn">Создать</button>
      <div class="dropdown" v-if="isShowDropdown">
        <ul class="dropdown__list">
          <li>
            <button v-for="product in productList" class="text" @click="changeActiveProduct(product)">
              {{ product.name }} <span class="color" :class="product.color"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="item-option__list">
      <button v-if="!user.email" @click="showAuthModal">Войти</button>
      <user-dropdown v-else/>
    </div>
  </header>
</template>

<script setup lang="ts">

import {useProductStore} from "@/stores/product";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import UserDropdown from "@/components/user-dropdown/user-dropdown.vue";
import {useSystemStore} from "@/stores/system";

const userStore = useUserStore()
const productStore = useProductStore()
const systemStore = useSystemStore()
const productList = ref();

const user = computed(() => userStore.user)

productStore.getProductList().then(list => {
  productList.value = list;
})

const changeActiveProduct = (newActiveProduct) => {
  productStore.activeProduct = newActiveProduct
}

function showAuthModal() {
  systemStore.setAuthModal(true);
}

const isShowDropdown = ref(false)

const showDropdown = () => {
  if (!isShowDropdown.value) isShowDropdown.value = true
}
const hideDropdown = () => {
  if (isShowDropdown.value) isShowDropdown.value = false
}
</script>

<style scoped lang="sass">
header
  display: flex
  padding: 0 60px
  justify-content: space-between
  background-color: var(--accent-color)

  & button
    background-color: transparent
    border-radius: 0
    padding: 15px 10px

    &:hover
      background-color: var(--accent-color-hover)


  .add-item
    flex-shrink: 0

  .item-option__list
    width: 50%

    &:last-child
      text-align: right
      display: flex
      justify-content: end
      align-items: center



.dropdown
  position: absolute
  top: 100%
  background-color: var(--divider-light-color)
  color: var(--color-heading)
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
    color: var(--color-heading)
    display: flex
    justify-content: space-between
    align-items: center

    &:hover
      background-color: var(--divider-color)
      color: var(--text-color)

.color
  margin-left: 10px
  width: 26px
  height: 26px
  display: inline-block
  border-radius: 100%
  border: 1px solid #000

  &.white
    background-color: #fff

  &.black
    background-color: #000
  &.red
    background-color: #d30000

</style>