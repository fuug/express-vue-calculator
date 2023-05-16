<template>
  <div class="order-list">
    <img v-if="testImage" :src="testImage" alt="">

    <div class="order-item" v-for="order in orderList" :key="order._id">
      <p><span>Тип: </span><span>{{ getRusOrderTypeName(order.type) }}</span></p>
      <p><span>Изображения: </span></p>
      <template v-for="chart in order.canvasList">
        <p><span>ширина: </span> <span>{{ chart.width }}</span></p>
        <p><span>высота: </span> <span>{{ chart.height }}</span></p>
        <p><span>x: </span> <span>{{ chart.x }}</span></p>
        <p><span>y: </span> <span>{{ chart.y }}</span></p>
        <!--      <p><span>image: </span> <span>{{ chart.img }}</span></p>-->
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useOrderStore} from "@/stores/order";
import {ref} from "vue";
import buffer from "buffer";

type Order = {
  type: { type: string, required: true },
  canvasList: Array<{
    id: { type: number, required: true },
    width: { type: number, required: true },
    height: { type: number, required: true },
    x: { type: number, required: true },
    y: { type: number, required: true },
    img: { type: buffer, required: true },
  }>,
  user: { type: string, ref: 'Role' }
}

const orderStore = useOrderStore();

const orderList = ref([])
const testImage = ref()

function getTestImage(res) {
  const bufferedImage = res[0].canvasList[0].img.data
  // const blobImage = toBase64(bufferedImage.data)
  const blobImage = new Blob(bufferedImage, {type: 'application/octet-binary'})
  testImage.value = URL.createObjectURL(blobImage)
  console.log(testImage.value)
  // testImage.value ='data:image/png;base64,' + blobImage
  // console.log(testImage.value)
}

orderStore.getOrderList().then(res => {
  orderList.value = res
  getTestImage(res)
})

function toBase64(arr) {
  return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}
function getRusOrderTypeName(name:string) {
  if (name === 'cup') return 'Кружка'
  return
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


</style>