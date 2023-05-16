<template>
  <div class="order__container">
    <p class="title">Выберите количество</p>
    <p class="label">
      Более 5 = 8 BYN <br>
      Более 9 = 6 BYN
    </p>

    <div class="col-2">
      <v-input :label="'Количество'" :type="'number'" v-model="count"/>
    </div>
    <div class="col-2">
      <p>Стоимость заказа: <strong>{{ orderPrice }}</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {useUserStore} from "@/stores/user";
import {useProductStore} from "@/stores/product";
import {useOrderStore} from "@/stores/order";
import {useSystemStore} from "@/stores/system";
import VInput from "@/components/v-components/v-input.vue";

const props = defineProps<{
  canvas: {}
}>()

const order = {};
const count = ref(1);

const orderPrice = computed(() => {
  if (count.value > 9) return count.value * 6
  if (count.value > 4) return count.value * 8
  return count.value * 10
})

const systemStore = useSystemStore();
const orderStore = useOrderStore();
const user = useUserStore().user;
const activeProduct = useProductStore().activeProduct;

async function createOrder() {
  console.log('asd');
  if (!user.email) {
    systemStore.setAuthModal(true);
    watch(user, () => {
      createOrder()
    })
  } else {
    order.canvasList = props.canvas.chartList;
    order.type = activeProduct.type

    await orderStore.createOrder({order: order});
  }
}

defineExpose({
  createOrder
})
</script>

<style scoped>
.order__container {

  max-width: 400px;
  margin: auto;
}

.col-2 {
  width: 50%;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--color-heading);
  font-size: 26px;
}

.label {
  margin-bottom: 20px;
  color: var(--color-heading);
  font-size: 16px;
}
</style>