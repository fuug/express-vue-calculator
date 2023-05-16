<template>
  <draggable-panel v-if="props.type === 't-shirt'" class="draggable-panel"
                   :canvas-style="canvasStyle"
                   :chart-style="{ background: 'rgba(255,255,255,0)' }"
                   :width="canvasWidth"
                   :height="canvasHeight"
                   :padding="0"
                   :data="chartList"
                   :chart-min-width="10"
                   :chart-min-height="10"
                   :scale-min="1"
                   :scale-max="1"
                   :lock="false"
                   :chartId='chartId'
                   @canvas-scale="canvasScale"
                   @canvas-drop="dropInCanvas"
                   @chart-move="chartMove"
                   @chart-scale="chartScale">
    <template #chart="{ chart, index }">
      <div class="img-wrapper">
        <img :src="chart.img">
        <button @click="removeChart(chart.id)" class="btn-remove">
          <icon-xmark/>
        </button>
      </div>
    </template>
  </draggable-panel>
  <draggable-panel v-else class="draggable-panel"
                   :canvas-style="canvasStyle"
                   :chart-style="{ background: 'rgba(255,255,255,0)' }"
                   :width="canvasWidth"
                   :height="canvasHeight"
                   :padding="0"
                   :data="chartListBack"
                   :chart-min-width="10"
                   :chart-min-height="10"
                   :scale-min="1"
                   :scale-max="1"
                   :lock="false"
                   :chartId='chartIdBack'
                   @canvas-scale="canvasScale"
                   @canvas-drop="dropInCanvas"
                   @chart-move="chartMove"
                   @chart-scale="chartScale">
    <template #chart="{ chart, index }">
      <div class="img-wrapper">
        <img :src="chart.img">
        <button @click="removeChart(chart.id)" class="btn-remove">
          <icon-xmark/>
        </button>
      </div>
    </template>
  </draggable-panel>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import DraggablePanel from "draggable-panel"
import 'draggable-panel/dist/style.css'
import IconXmark from "@/components/icons/icon-xmark.vue";

type chart = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  img: string
}

const props = defineProps<{
  type: string;
}>()

const canvasWidth = computed(() => 180)
const canvasHeight = computed(() => 300)
const offset = reactive({x: 0, y: 0})
const chartId = ref(0)
const chartIdBack = ref(1)
const chartList = ref<Array<chart>>([])
const chartListBack = ref<Array<chart>>([])
const canvasStyle = ref({
  background: 'rgba(152,152,152,0.6)',
  // backgroundImage: 'url("@/assets/cup.png")',
  border: '2px dashed #000',
})

const addChart = (img: File) => {
  getDimensions(img)
}

function dropInCanvas(img: string, width: number, height: number) {
  chartId.value = Number((Math.random() * 10 ** 4).toFixed(0))
  chartList.value.push({
    id: chartId.value,
    width: width,
    height: height,
    x: 10,
    y: 10,
    img: img ?? '',
  })
}

function addInBackCanvas(img: string, width: number, height: number) {
  chartId.value = Number((Math.random() * 10 ** 4).toFixed(0))
  chartListBack.value.push({
    id: chartId.value,
    width: width,
    height: height,
    x: 10,
    y: 10,
    img: img ?? '',
  })
}

function canvasScale(scale) {
  // console.info('[Event]', 'canvas-scale', scale)
}

function chartMove(item) {
  // console.info('[Event]', 'chart-move', item)
}

function chartScale(item) {
  // console.info('[Event]', 'chart-scale', item)
}

function removeChart(chartId: number) {
  const index = chartList.value.findIndex(item => item.id === chartId);
  chartList.value.splice(index, 1);
}

function removeBackChart(chartId: number) {
  const index = chartListBack.value.findIndex(item => item.id === chartId);
  chartListBack.value.splice(index, 1);
}

function getDimensions(val: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = URL.createObjectURL(val)
    const image = new Image
    image.onload = () => {
      const dimensions = {w: 0, h: 0};
      if (image.width > image.height) {
        const t = image.height / image.width
        dimensions.w = canvasWidth.value - 20;
        dimensions.h = (dimensions.w * t) - 20;
      } else {
        const t = image.width / image.height
        dimensions.h = (canvasHeight.value - 20);
        dimensions.w = (canvasHeight.value - 20) * t;
      }
      if (props.type === 't-shirt') dropInCanvas(e.target.result, dimensions.w, dimensions.h);
      else addInBackCanvas(e.target.result, dimensions.w, dimensions.h)
    }
    image.src = img;
  }
  reader.readAsDataURL(val);
}

defineExpose({chartList, addChart})
</script>

<style scoped lang="sass">

.chart-item:hover .btn-remove
  display: block

.chart-item
  position: relative

  .img-wrapper
    width: 100%
    height: 100%

    img
      width: 100%
      height: 100%

  .btn-remove
    display: none
    background: none
    position: absolute
    top: 0
    right: 0
    padding: 0
    color: var(--color-heading)

    svg
      width: 20px
      height: 20px


</style>

<style lang="sass">
.draggable-panel
  width: 100%
  height: 100%
  background: none
//background: url("@/assets/cup.png")
</style>