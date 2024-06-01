<template>
  <section class="flex justify-between items-center mb-10">
    <h1 class="text-2xl font-extrabold">收支统计</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section class="grid grid-cols-2 mb-10 lg:grid-cols-4 gap-8 lg:gap-16">
    <Trand title="收入" color="green" :amount="incomeTotal" :lastAmount="previousIncomeTotal" :loading="pending" />
    <Trand title="支出" color="green" :amount="expenseTotal" :lastAmount="previousExpenseTotal" :loading="pending" />
    <Trand title="投资" color="green" :amount="4000" :lastAmount="3000" :loading="pending" />
    <Trand title="储蓄" color="green" :amount="4000" :lastAmount="3000" :loading="pending" />
  </section>

  <section class="flex justify-between items-center mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">收支明细</h2>
      <div class="text-gray-500 drak:text-gray-400 mt-1">
        这段时间你有 {{ incomeCount }} 笔收入和 {{ expenseCount }} 笔支出.
      </div>
    </div>
    <div>
      <TransactionModel v-model="dialog" @saved="refresh()" />
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="新增"
        @click="dialog = true"
      ></UButton>
    </div>
  </section>

  <section v-if="!pending">
    <div v-for="(item, date) in byDate" :key="date">
      <TransactionSummary :date="date" :transactions="item" />
      <TransactionItem
        v-for="transaction of item"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refresh()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="w-full h-8 mb-2" v-for="item in 4" :key="item"></USkeleton>
  </section>
</template>

<script setup>
import { transactionViewOptions } from "../constants";

const selectedView = ref(transactionViewOptions[2]);
const dialog = ref(false);
const { current, previous } = useSelectedTimePeriod(selectedView);
const {
  pending,
  refresh,
  transactions: {
    income,
    expense,
    incomeTotal,
    expenseTotal,
    incomeCount,
    expenseCount,
    grouped: { byDate },
  },
} = useFetchTransactions(current);
const {
  refresh: previousRefresh,
  transactions: { incomeTotal: previousIncomeTotal, expenseTotal: previousExpenseTotal },
} = useFetchTransactions(previous);
await refresh();
await previousRefresh();
</script>

<style lang="scss" scoped></style>
