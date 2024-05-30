export const useCurrency = (amount) => {
  const currency = computed(() => {
    return new Intl.NumberFormat("zh-Hans", {
      style: "currency",
      currency: "CNY",
    }).format(isRef(amount) ? amount.value : amount);
  });

  return { currency };
};
