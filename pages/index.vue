<template>
  <section class="flex justify-between items-center mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionView" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <template v-for="item in trandData" :key="item.id">
      <Trand
        :title="item.title"
        :color="item.color"
        :amount="item.amount"
        :last-amount="item.lastAmount"
        :loading="item.loading"
      />
    </template>
  </section>
  <section>
    <Transaction />
    <Transaction />
    <Transaction />
    <Transaction />
  </section>
</template>

<script setup>
import { transactionView } from "../constants";
const selectedView = ref(transactionView[1]);
const trandData = [
  {
    id: 1,
    title: "Income",
    color: "green",
    amount: 4000,
    lastAmount: 3000,
    loading: false,
  },
  {
    id: 2,
    title: "Expense",
    color: "green",
    amount: 2000,
    lastAmount: 3000,
    loading: false,
  },
  {
    id: 3,
    title: "Investments",
    color: "green",
    amount: 4000,
    lastAmount: 3000,
    loading: false,
  },
  {
    id: 4,
    title: "Saving",
    color: "green",
    amount: 4000,
    lastAmount: 3000,
    loading: false,
  },
];
</script>

<style lang="scss" scoped></style>
