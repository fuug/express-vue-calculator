<script setup lang="ts">
import {computed, ref, watch} from "vue";
import VFileInput from "@/components/v-components/v-file-input.vue";
import CanvasCup from "@/components/canvas/canvas-cup.vue";
import CanvasTshirt from "@/components/canvas/canvas-tshirt.vue";
import ModalAuth from "@/components/auth/modal-auth.vue";
import {useUserStore} from "@/stores/user";
import TheHeader from "@/components/the-header.vue";
import {useSystemStore} from "@/stores/system";
import {useProductStore} from "@/stores/product";
import OrderCheck from "@/components/order-check.vue";

const userStore = useUserStore()
const systemStore = useSystemStore()
const productStore = useProductStore()

const user = computed(() => userStore.user)
const activeProduct = computed(() => productStore.activeProduct)

const activeSection = ref('constructor')
const imagePath = ref()
const canvas = ref<InstanceType<typeof CanvasCup | CanvasTshirt> | null>(null)
const orderCheck = ref<InstanceType<typeof OrderCheck>>(null)
const pathToContainer = ref('/src/assets/tshirt.png');
const wrapperStyle = ref({
  height: '430px',
  width: '260px',
  top: '100px',
  left: '170px',
});
const canvasSize = ref({
  width: 360,
  height: 161
})
const canvasType = ref('t-shirt')
const order = ref<{ type?: string, canvasList?: [], count?: number, userEmail?: string }>({})

function changeAsset(type: string, color = 'white') {
  if (type === 't-shirt-back') {
    pathToContainer.value = '/src/assets/tshirt-back.png'
    canvasSize.value = {
      width: 360,
      height: 161
    }
    wrapperStyle.value = {
      height: '430px',
      width: '260px',
      top: '100px',
      left: '170px',
    }
    canvasType.value = 't-shirt-back'
  }
  if (type === 't-shirt') {
    pathToContainer.value = '/src/assets/tshirt.png'
    canvasSize.value = {
      width: 360,
      height: 161
    }
    wrapperStyle.value = {
      height: '430px',
      width: '260px',
      top: '100px',
      left: '170px',
    }
    canvasType.value = 't-shirt'
  }
  if (type === 'cup') {
    canvasType.value = 'cup'
    if (color === 'white-old') {
      wrapperStyle.value = {
        height: '228px',
        width: '500px',
        top: '250px',
        left: '350px',
      }
      canvasSize.value = {
        width: 150,
        height: 200
      }
    } else {
      wrapperStyle.value = {
        height: '190px',
        width: '420px',
        top: '305px',
        left: '90px',
      }
      canvasSize.value = {
        width: 150,
        height: 200
      }
    }
    pathToContainer.value = '/src/assets/cup-' + color + '.png'
  }
}

function addChart(val) {
  canvas.value?.addChart(val)
}

function hideAuthModal() {
  systemStore.setAuthModal(false)
}

function backToConstructor() {
  activeSection.value = 'constructor';
}

function completeOrder() {
  orderCheck.value.createOrder();
  activeSection.value = 'done';
}

const goToOrder = () => {
  if (!user.value.email) return systemStore.setAuthModal(true)
  activeSection.value = 'order'
}

watch(imagePath, (val) => {
  addChart(val)
})

watch(activeProduct, (val) => {
  changeAsset(val.type, val.color)
})
</script>

<template>
  <the-header/>
  <main>
    <section v-show="activeSection === 'constructor'" id="constructor">
      <div class="canvas-container" :style="'background-image: url(' + pathToContainer +')'">
        <div v-if="canvasType === 'cup'" class="canvas-wrapper" :style="wrapperStyle">
          <canvas-cup ref="canvas"/>
        </div>
        <div v-if="canvasType === 't-shirt' || canvasType === 't-shirt-back'" class="canvas-wrapper"
             :style="wrapperStyle">
          <canvas-tshirt ref="canvas" :type="canvasType"/>
        </div>
      </div>
    </section>
    <section v-show="activeSection === 'order'" class="order">
      <order-check :canvas="canvas" ref="orderCheck"/>
    </section>
    <section v-show="activeSection === 'done'" class="done">
      <h1>Спасибо за Ваш заказ!</h1>
      <p>Менеджер свяжется с вами в ближайшее время</p>
    </section>
    <div class="btn-container" :class="{'justify-between':imagePath || (canvasType === 't-shirt' ||canvasType === 't-shirt-back')}">
      <template v-if="activeSection === 'constructor'">
        <v-file-input v-model="imagePath"/>
        <button v-if="imagePath" @click="goToOrder">Продолжить</button>
        <button v-if="canvasType === 't-shirt' || canvasType === 't-shirt-back'"
                @click="changeAsset(canvasType === 't-shirt' ? 't-shirt-back' : 't-shirt')">
          {{ canvasType === 't-shirt-back' ? 'Лицевая сторона' : 'Обратная сторона' }}
        </button>
      </template>
      <template v-else-if="activeSection === 'order'">
        <button @click="backToConstructor" class="col-2">Назад</button>
        <button @click="completeOrder" class="col-2">Продолжить</button>
      </template>
    </div>
  </main>
  <modal-auth @close="hideAuthModal" v-if="systemStore.isShowAuthModal"/>
</template>

<style scoped lang="sass">
main
  margin-top: 30px

  .left-side, .right-side
    width: calc((100% - 1150px) / 2)

  .btn-container
    display: flex
    justify-content: center
    max-width: 560px
    margin: 20px auto 30px

    &.justify-between
      justify-content: space-between

  .left-side
    button
      width: 80%
      margin: 15px 10% 0

  .canvas-container
    position: relative
    height: 600px
    width: 600px
    margin: auto
    //background-image: url('../assets/cup.png')
    background-position: center
    background-size: contain
    background-repeat: no-repeat

  .canvas-wrapper
    height: 228px
    width: 500px
    top: 250px
    left: 350px
    position: absolute


.col-2
  width: calc(50% - 10px)


section.done
  h1
    text-align: center
    font-size: 30px
    font-weight: 600
    color: var(--primary-text)
    margin-top: 15px

  p
    font-size: 18px
    text-align: center

</style>