<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold"
  >
    <div class="flex justify-between items-center">
      {{ date }}
    </div>
    <div class="flex justify-end items-center space-x-2 mr-10">
      {{ currency }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  transactions: Array,
});
// 收支总和
const sum = computed(() => {
  let count = 0;
  for (const transaction of props.transactions) {
    if (transaction.type === "收入") {
      count += transaction.amount;
    } else {
      count -= transaction.amount;
    }
  }
  return count;
});
const { currency } = useCurrency(sum);
</script>

<style scoped></style>
