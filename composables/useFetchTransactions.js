export const useFetchTransactions = () => {
  const supabase = useSupabaseClient();
  const data = ref([]);
  const pending = ref(false);

  // 刷新收支数据
  const refresh = async () => (data.value = await fetchTransactions());

  // 获取收支数据
  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const { data } = await useAsyncData("transactions", async () => {
        const { data, error } = await supabase.from("transactions").select().order("created_at", { ascending: false });
        if (error) return [];
        return data;
      });
      return data.value;
    } finally {
      pending.value = false;
    }
  };

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

  // 获取收支日期
  const transactionGroupedByDate = computed(() => {
    let grouped = {};
    for (const item of data.value) {
      const date = new Date(item.created_at).toISOString().split("T")[0];
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
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount,
    },
    refresh,
    pending,
  };
};
