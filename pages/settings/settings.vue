<template>
  <UForm :state="state" :schema="schema" @submit="saveSettings">
    <UFormGroup
      label="财务追踪"
      name="transaction_view"
      class="mb-4"
      help="财务追踪设置将会根据你的选择默认展示对应的时间的财务状况"
    >
      <USelect
        placeholder="请选择财务追踪类型"
        :options="transactionViewOptions"
        v-model="state.transaction_view"
      ></USelect>
    </UFormGroup>
    <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">保存</UButton>
  </UForm>
</template>

<script setup>
import { transactionViewOptions } from "../constants.js";
import { z } from "zod";
const supabase = useSupabaseClient();
const pending = ref(false);
const user = useSupabaseUser();
const { toastSucess, toastError } = useAppToast();
const state = ref({
  transaction_view: user.value.user_metadata?.transaction_view ?? transactionViewOptions[2],
});
const schema = z.object({
  transaction_view: z.enum(transactionViewOptions, { message: "请选择财务追踪类型" }),
});
const saveSettings = async () => {
  pending.value = true;
  try {
    const { error } = await supabase.auth.updateUser({
      data: { transaction_view: state.value.transaction_view },
    });
    if (error) throw error;
    toastSucess({ title: "财务追踪设置更新成功" });
  } catch (error) {
    toastError({ title: "财务追踪设置错误", description: error.message });
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped></style>
