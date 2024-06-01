<template>
  <div>
    <!-- 标题 -->
    <div class="font-bold" :class="{ green: trendingUp, red: !trendingUp }">
      {{ title }}
    </div>
    <!-- 账户 -->
    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="w-full h-8" v-if="loading"></USkeleton>
      <div v-else>{{ currency }}</div>
    </div>
    <!-- 趋势 -->
    <div>
      <USkeleton class="w-full h-6" v-if="loading"></USkeleton>
      <div v-else class="flex items-center text-sm space-x-1">
        <UIcon :name="icon" class="w-6 h-6" :class="{ green: trendingUp, red: !trendingUp }"></UIcon>
        <div class="text-gray-500 dark:text-gray-400">{{ percentageTrend }} vs last period</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  amount: Number,
  lastAmount: Number,
  color: String,
  loading: Boolean,
});
const { amount, lastAmount } = toRefs(props);
const { currency } = useCurrency(amount);

// 趋势
const trendingUp = computed(() => amount.value >= lastAmount.value);
// 图标
const icon = computed(() => (trendingUp.value ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down"));
// 比例
const percentageTrend = computed(() => {
  if (amount.value === 0 || lastAmount.value === 0) return `∞%`;
  const bigger = Math.max(amount.value, lastAmount.value);
  const lower = Math.min(amount.value, lastAmount.value);
  const ratio = ((bigger - lower) / lower) * 100;
  return `${Math.ceil(ratio)}%`;
});
</script>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}

.red {
  @apply text-red-600 dark:text-red-400;
}
</style>
