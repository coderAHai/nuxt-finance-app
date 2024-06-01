<template>
  <div class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
    <div class="flex justify-between items-center space-x-4 col-span-2">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="iconColor"></UIcon>
        <div>{{ transaction.description }}</div>
      </div>
      <div>
        <UBadge color="white" v-if="transaction.category">
          {{ transaction.category }}
        </UBadge>
      </div>
    </div>
    <div class="flex justify-end items-center space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            :loading="isLoading"
          ></UButton>
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction: Object,
});
const emit = defineEmits(["deleted"]);
// supabase实例
const supabase = useSupabaseClient();
// 提示
const { toastSucess, toastError } = useAppToast();
// 加载状态
const isLoading = ref(false);
// 收入 | 支出状态
const isIncome = computed(() => props.transaction.type === "收入");
const icon = computed(() => (isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-left"));
const iconColor = computed(() => (isIncome.value ? "text-green-600" : "text-red-600"));
// 收入 | 支出金额
const { currency } = useCurrency(props.transaction.amount);
// 收支数据操作
// 删除收支数据
const deleteTransaction = async () => {
  isLoading.value = true;
  try {
    await supabase.from("transactions").delete().eq("id", props.transaction.id);
    toastSucess({ title: "删除收支数据成功！" });
    emit("deleted");
  } catch (error) {
    toastError({ title: "删除收支数据失败！", description: error.message });
  } finally {
    isLoading.value = false;
  }
};
const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: deleteTransaction,
    },
  ],
];
</script>

<style scoped></style>
