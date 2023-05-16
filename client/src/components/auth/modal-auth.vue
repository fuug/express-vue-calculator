<template>
  <modal-wrapper @close="emit('close')" class="auth">
    <div class="auth-tabs">
      <div class="auth-tabs__item" :class="{active: activeTab === 'signing'}"
           @click="toggleTabs('signing')">Вход
      </div>
      <div class="auth-tabs__item" :class="{active: activeTab === 'signup'}"
           @click="toggleTabs('signup')">Регистрация
      </div>
    </div>

    <div class="auth-item" v-if="activeTab === 'signing'">
      <form class="auth-form" @submit.prevent="formSigningSubmit">
        <div class="form-input__container">
          <div class="form-input">
            <input v-model="email" type="email" name="email" required>
            <label for="email">Email</label>
          </div>
          <span v-if="emailError">{{ emailError }}</span>
        </div>
        <div class="form-input__container">
          <div class="form-input">
            <input v-model="password" type="password" name="password" required>
            <label for="password">Пароль</label>
            <span class="eye" @click="showPass"></span>
          </div>
          <span v-if="passwordError">{{ passwordError }}</span>
        </div>
        <button>Войти</button>
      </form>
    </div>

    <div class="auth-item" v-if="activeTab === 'signup'">
      <form class="auth-form" @submit.prevent="formSignupSubmit">

        <div class="form-input__container">
          <div class="form-input">
            <input v-model="email" type="email" name="email" required>
            <label for="email">Email</label>
          </div>
          <span v-if="emailError">{{ emailError }}</span>
        </div>
        <div class="form-input__container">
          <div class="form-input">
            <input v-model="name" type="text" name="name">
            <label for="name">Имя</label>
          </div>
          <span v-if="nameError">{{ nameError }}</span>
        </div>
        <div class="form-input__container">
          <div class="form-input">
            <input v-model="password" type="password" name="password" required>
            <label for="password">Пароль</label>
            <span class="eye" @click="showPass"></span>
          </div>
          <span v-if="passwordError">{{ passwordError }}</span>
        </div>
        <div class="form-input__container">
          <div class="form-input">
            <input v-model="secondPassword" type="password" name="second_password" required>
            <label for="password">Подтверждение пароля</label>
            <span class="eye" @click="showPass"></span>
          </div>
          <span v-if="secondPasswordError">{{ secondPasswordError }}</span>
        </div>
        <button>Зарегистрироваться</button>
      </form>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/modal-wrapper.vue";
import {computed, ref, watch} from "vue";
import {useUserStore} from "@/stores/user";

type Tabs = 'signing' | 'signup';

const emit = defineEmits<{
  (e: 'close'): void;
}>()
const userStore = useUserStore()
const activeTab = ref<Tabs>('signing')

const email = ref('')
const name = ref('')
const password = ref('')
const secondPassword = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const secondPasswordError = computed(() => {
  if (secondPassword.value.length > 0) {
    if (secondPassword.value !== password.value) return 'Пароли не совпадают'
  }
  return null
})

const formSignupSubmit = () => {
  userStore.registration({
    email: email.value,
    password: password.value,
    second_password: secondPassword.value,
    name: name.value
  }).then(res => {
    console.log(res)
    if (res.error) {
      console.log(res.error)
      res.error.errors.forEach(error => {
        console.log(error);
        if (error.msg === 'user.password.wrong') {
          showPassError()
        }
        if (error.msg === 'user.password.short') {
          showPassError('Короткий пароль')
        }
        if (error.msg === 'user.email.wrong') {
          showEmailError()
        }
        if (error.msg === 'user.email.exist') {
          showEmailError('Такой Email уже существует')
        }
        if (error.msg === 'user.name.required') {
          showNameError()
        }
      })
    } else {
      emit('close')
    }
  })
}

const formSigningSubmit = () => {
  userStore.login({email: email.value, password: password.value}).then(res => {
    if (res.error) {
      res.error.errors.forEach(error => {
        if (error.msg === 'user.password.wrong') {
          showPassError()
        }
        if (error.msg === 'user.password.short') {
          showPassError('Короткий пароль')
        }
        if (error.msg === 'user.email.wrong') {
          showEmailError()
        }
      })
    } else {
      emit('close')
    }

  })
}

const showPassError = (str?: string) => {
  if (str) passwordError.value = str;
  else passwordError.value = 'Неверный пароль'
}

const showEmailError = (str?: string) => {
  if (str) emailError.value = str;
  else emailError.value = 'Неверный Email'
}

const showNameError = (str?: string) => {
  if (str) nameError.value = str;
  else nameError.value = 'Имя обязательно для заполнения'
}

const toggleTabs = (newTab: Tabs): void => {
  activeTab.value = newTab
}

const showPass = (e: PointerEvent) => {
  const input = e.target.closest('.form-input').querySelector('input');
  if (input.type === 'text') {
    input.type = 'password'
    e.target.classList.remove('showed')
  } else {
    input.type = 'text'
    e.target.classList.add('showed')
  }
}

watch(email, () => {
  emailError.value = '';
})
watch(name, () => {
  nameError.value = '';
})
watch(password, () => {
  passwordError.value = '';
})


</script>

<style scoped lang="sass">
.auth-tabs
  display: flex
  justify-content: space-evenly
  width: 80%
  margin: auto

  &__item
    width: fit-content
    color: var(--color-heading)
    font-weight: 600
    font-size: 20px
    cursor: pointer

    &.active
      border-bottom: 4px solid var(--dark-primary-color)

.auth-item
  margin-top: 40px

  &__title
    font-size: 24px
    font-weight: 600
    color: var(--color-heading)
    text-align: center

.auth-form
  width: 80%
  margin: 20px auto 0

  button
    width: 100%

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


.eye
  width: 24px
  height: 24px
  display: block
  position: absolute
  bottom: 8px
  right: 10px
  cursor: pointer
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5.25102C7.96901 5.18302 3.80001 8.00002 1.17901 10.885C0.609194 11.5176 0.609194 12.4784 1.17901 13.111C3.74301 15.935 7.90001 18.817 12 18.748C16.1 18.817 20.258 15.935 22.824 13.111C23.3938 12.4784 23.3938 11.5176 22.824 10.885C20.2 8.00002 16.031 5.18302 12 5.25102Z' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.75 12C15.7494 14.071 14.0703 15.7494 11.9993 15.749C9.9284 15.7487 8.24982 14.0696 8.25 11.9987C8.25018 9.92775 9.92906 8.24902 12 8.24902C12.9948 8.24876 13.9489 8.6439 14.6523 9.34743C15.3556 10.051 15.7505 11.0052 15.75 12V12Z' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")

  &.showed
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.78302 20.9999L21.533 2.99994' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.96402 19.0509C9.94683 19.3562 10.9709 19.5076 12 19.4999C16.1 19.5689 20.258 16.6869 22.824 13.8629C23.3938 13.2303 23.3938 12.2695 22.824 11.6369C21.8944 10.6172 20.8646 9.6935 19.75 8.87994' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.413 6.28195C13.624 6.0856 12.8131 5.99083 12 5.99995C7.96901 5.93295 3.80001 8.75195 1.17901 11.635C0.609194 12.2676 0.609194 13.2283 1.17901 13.861C1.97593 14.7333 2.84575 15.5363 3.77901 16.261' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 12.7499C8.24973 11.7553 8.64474 10.8013 9.34806 10.098C10.0514 9.39468 11.0054 8.99967 12 8.99994' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.75 12.749V12.749C15.7503 13.7437 15.3553 14.6978 14.652 15.4013C13.9487 16.1047 12.9947 16.5 12 16.5' stroke='%23898D9E' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
</style>

<style lang="sass">
.auth .modal-container
  max-width: 400px
</style>