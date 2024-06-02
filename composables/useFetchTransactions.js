import { formatInTimeZone } from "date-fns-tz";

export const useFetchTransactions = (period) => {
  const supabase = useSupabaseClient();
  const data = ref([]);
  const pending = ref(false);

  // 获取收支数据
  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const current = formatInTimeZone(period.value.from, "Asia/Shanghai", "yyyy-MM-dd HH:mm:ss");
      const previous = formatInTimeZone(period.value.to, "Asia/Shanghai", "yyyy-MM-dd HH:mm:ss");
      const { data } = await useAsyncData(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
          const { data, error } = await supabase
            .from("transactions")
            .select()
            .gte("created_at", current)
            .lte("created_at", previous)
            .order("created_at", { ascending: false });
          if (error) return [];
          return data;
        }
      );
      return data.value;
    } finally {
      pending.value = false;
    }
  };

  // 刷新收支数据
  const refresh = async () => (data.value = await fetchTransactions());

  watch(period, async () => await refresh());

  // 收入
  const income = computed(() => data.value.filter((item) => item.type === "收入"));
  const incomeCount = computed(() => income.value.length);
  const incomeTotal = computed(() => {
    if (incomeCount) {
      return income.value.reduce((sum, item) => sum + item.amount, 0);
    } else {
      return 0;
    }
  });

  // 支出
  const expense = computed(() => data.value.filter((item) => item.type === "支出"));
  const expenseCount = computed(() => expense.value.length);
  const expenseTotal = computed(() => {
    if (expenseCount) {
      return expense.value.reduce((sum, item) => sum + item.amount, 0);
    } else {
      return 0;
    }
  });

  // 投资
  const invest = computed(() => data.value.filter((item) => item.type === "投资"));
  const investCount = computed(() => invest.value.length);
  const investTotal = computed(() => {
    if (investCount) {
      return invest.value.reduce((sum, item) => sum + item.amount, 0);
    } else {
      return 0;
    }
  });

  // 储蓄
  const savings = computed(() => data.value.filter((item) => item.type === "储蓄"));
  const savingsCount = computed(() => savings.value.length);
  const savingsTotal = computed(() => {
    if (savingsCount) {
      return savings.value.reduce((sum, item) => sum + item.amount, 0);
    } else {
      return 0;
    }
  });

  // 获取收支日期
  const transactionGroupedByDate = computed(() => {
    let grouped = {};
    for (const item of data.value) {
      const date = formatInTimeZone(item.created_at, "Asia/Shanghai", "yyyy-MM-dd");
      item.created_at = formatInTimeZone(item.created_at, "Asia/Shanghai", "yyyy-MM-dd");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    }
    return grouped;
  });
  return {
    transactions: {
      data,
      grouped: {
        byDate: transactionGroupedByDate,
      },
      income,
      expense,
      invest,
      savings,
      incomeTotal,
      expenseTotal,
      investTotal,
      savingsTotal,
      incomeCount,
      expenseCount,
      investCount,
      savingsCount,
    },
    refresh,
    pending,
  };
};
