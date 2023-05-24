<template>
  <div class="order-list">
    <div class="order-item" v-for="order in orderList" :key="order._id">
      <p><span>Пользователь: </span><span>{{ order.userEmail }}</span></p>
      <p><span>Тип: </span><span>{{ getRusOrderTypeName(order.type) }}</span></p>
      <p><span>Количество: </span><span>{{ order.count ?? 1 }}</span></p>
      <p><span>Изображения: </span></p>
      <div class="image-raw">
        <div v-for="chart in order.canvasList" :key="chart.id" class="image-item">
          <p><span>Ширина: </span> <span>{{ chart.width }}px</span></p>
          <p><span>Высота: </span> <span>{{ chart.height }}px</span></p>
          <p><span>X: </span> <span>{{ chart.x }}px</span></p>
          <p><span>Y: </span> <span>{{ chart.y }}px</span></p>
          <!--      <p><span>image: </span> <span>{{ chart.img }}</span></p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useOrderStore} from "@/stores/order";
import {ref} from "vue";
import {useUserStore} from "@/stores/user";

type Order = {
  type: string
  count: string
  canvasList: {
    id: number
    width: number
    height: number
    x: number
    y: number
  }[]
  user: string
  userEmail: string
}

const orderStore = useOrderStore();
const userStore = useUserStore();

const orderList = ref<Order[] | []>([])

orderStore.getOrderList().then(async res => {
  for (const orderItem of res) {
    const res = await getUser(orderItem.user)
    console.log(res)
    orderItem.userEmail = res.email
  }
  return res;
}).then(res => {
  orderList.value = res
})

function getRusOrderTypeName(name: string) {
  if (name === 'cup') return 'Кружка'
  if (name === 't-shirt') return 'Майка'
  return
}

async function getUser(id: string) {
  return await userStore.getUserById(id)
}
</script>

<style scoped lang="sass">
.order-list
  width: 90%
  margin: 60px auto 0

.order-item
  margin-bottom: 10px
  background-color: #e4e4e4
  border-radius: 20px
  padding: 20px

  .image-raw
    display: flex

  .image-item
    margin-left: 10px
    margin-top: 10px
    background-color: #fff
    width: fit-content
    padding: 15px
    border-radius: 10px

</style>