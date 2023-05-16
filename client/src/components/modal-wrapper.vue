<template>
  <div class="modal-wrapper">
    <div class="modal-container">
      <span class="close" @click="emit('close')"></span>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>()
</script>

<style scoped>
.modal-wrapper {
  background-color: #000000b0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-container {
  background-color: #fff;
  padding: 40px 20px 20px;
  border-radius: 16px;
  position: relative;
  min-width: 300px;
  width: 40%;
}

.close {
  cursor: pointer;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 20px;
  right: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 6L18 18' stroke='%230F0E0E' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M18 6L6.00001 18' stroke='%230F0E0E' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
}

</style>