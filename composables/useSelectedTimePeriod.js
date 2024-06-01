import { startOfYear, endOfYear, startOfMonth, endOfMonth, startOfDay, endOfDay, sub } from "date-fns";

export const useSelectedTimePeriod = (period) => {
  const current = computed(() => {
    switch (period.value) {
      case "年份":
        return {
          from: startOfYear(new Date()),
          to: endOfYear(new Date()),
        };
      case "月份":
        return {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        };
      case "天数":
        return {
          from: startOfDay(new Date()),
          to: endOfYear(new Date()),
        };
    }
  });

  const previous = computed(() => {
    switch (period.value) {
      case "年份":
        return {
          from: startOfYear(sub(new Date(), { years: 1 })),
          to: endOfYear(sub(new Date(), { years: 1 })),
        };
      case "月份":
        return {
          from: startOfMonth(sub(new Date(), { months: 1 })),
          to: endOfMonth(sub(new Date(), { months: 1 })),
        };
      case "天数":
        return {
          from: startOfDay(sub(new Date(), { days: 1 })),
          to: endOfDay(sub(new Date(), { days: 1 })),
        };
    }
  });

  return { current, previous };
};
