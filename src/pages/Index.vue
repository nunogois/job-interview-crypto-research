<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { getTokens, getTokenDaily, getTokenMonthly } from '../api'

Chart.register(...registerables)

enum INTERVAL {
  DAILY = 'daily',
  MONTHLY = 'monthly'
}

const loading = ref(true)
const token = ref('')
const tokenData = ref<TokenData[]>([])
const tokens = ref<Token[]>([])
const interval = ref<INTERVAL>(INTERVAL.DAILY)

onMounted(async () => {
  tokens.value = await getTokens()
  token.value = tokens.value[0].id
  loading.value = false
})

watch([token, interval], async () => {
  tokenData.value =
    interval.value === INTERVAL.MONTHLY
      ? await getTokenMonthly(token.value)
      : await getTokenDaily(token.value)
})

const selectedTokenLabel = computed<string>(() => {
  const selToken = tokens.value.find((t) => t.id === token.value)
  return selToken ? `${selToken.symbol} - ${selToken.name}` : ''
})

const chartData = computed(() => ({
  labels: tokenData.value.map((d) => d.label),
  datasets: [
    {
      label: selectedTokenLabel.value,
      borderColor: '#00b894',
      backgroundColor: '#00b894',
      fill: false,
      data: tokenData.value.map((d) => d.value)
    }
  ]
}))

const options = computed(() => ({
  scales: {
    y: {
      grid: {
        color: '#444'
      },
      ticks: {
        callback: (value: number) => `$${value.toLocaleString()}`
      }
    },
    x: {
      grid: {
        color: '#444'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (data: { dataset: { label: string }; formattedValue: string }) =>
          `${data.dataset.label} - $${data.formattedValue}`
      }
    }
  }
}))

const { lineChartProps } = useLineChart({
  chartData,
  options
})
</script>

<template>
  <div
    class="h-full max-w-screen-md m-auto flex flex-col justify-center items-center"
  >
    <div v-if="loading">Loading...</div>
    <div v-else class="w-full">
      <div class="flex justify-between w-full items-center mb-4">
        <select v-model="token">
          <option v-for="{ id, symbol } in tokens" :key="id" :value="id">
            {{ symbol }}
          </option>
        </select>
        <h1 class="text-xs md:text-2xl font-bold">
          {{ selectedTokenLabel }}
        </h1>
        <select v-model="interval">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <line-chart v-bind="lineChartProps" css-classes="chart" />
    </div>
  </div>
</template>
