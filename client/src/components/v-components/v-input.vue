<template>
  <div class="form-input__container">
    <div class="form-input">
      <input @input="handler" :value="modelValue" :name="name" :type="type" :required="required">
      <label :for="name">{{ label }}</label>
    </div>
    <span v-if="errorMsg">{{ errorMsg }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue', 'name', 'label', 'required', 'type', 'errorMsg'])
const emit = defineEmits(['update:modelValue'])

const handler = e => {
  if (+e.target?.value > 0) emit('update:modelValue', e.target?.value)
  else emit('update:modelValue', 1)
}
</script>

<style scoped lang="sass">
.form-input
  position: relative

  &__container
    margin-bottom: 20px

  input
    width: 100%
    padding: 10px
    border: 2px solid var(--color-background-mute)
    border-radius: 15px

  label
    position: absolute
    top: -12px
    left: 16px
    color: var(--color-heading)
    font-size: 16px
    background-color: #fff

  input:focus-visible
    outline: none
    border-color: var(--primary-color)

  input:focus + label
    font-size: 14px
    color: var(--color-text)

</style>