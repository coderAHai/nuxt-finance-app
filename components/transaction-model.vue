<template>
  <UModal v-model="dialog" prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3>{{ isEditing ? "编辑" : "添加" }}收支数据</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="dialog = false"
          />
        </div>
      </template>
      <UForm :state="state" :schema="schema" ref="form" @submit="submitForm">
        <UFormGroup label="收支类型" name="type" class="mb-4" :required="true">
          <USelect placeholder="请选择收支类型" :options="types" v-model="state.type"></USelect>
        </UFormGroup>
        <UFormGroup label="金额" name="amount" class="mb-4" :required="true">
          <UInput placeholder="请输入金额" type="number" v-model="state.amount"></UInput>
        </UFormGroup>
        <UFormGroup label="收支日期" name="created_at" class="mb-4" :required="true">
          <UInput type="date" v-model="state.created_at" icon="i-heroicons-calendar-days-20-solid"></UInput>
        </UFormGroup>
        <UFormGroup label="描述" name="description" class="mb-4" hint="可选属性">
          <UInput placeholder="请输入收支描述" v-model="state.description"></UInput>
        </UFormGroup>
        <UFormGroup label="分类" name="category" class="mb-4" :required="true">
          <UInput placeholder="请输入收支分类" v-model="state.category"></UInput>
        </UFormGroup>
        <div class="flex items-center justify-end space-x-2">
          <UButton type="submit" color="black" variant="solid" label="保存" :loading="isLoading"></UButton>
          <UButton type="button" color="black" variant="solid" label="重置" @click="resetForm"></UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import { types } from "../constants.js";
import { z } from "zod";

const props = defineProps({
  modelValue: Boolean,
  transaction: {
    type: Object,
    required: false,
  },
});
const isEditing = computed(() => !!props.transaction);
const emit = defineEmits(["update:modelValue", "saved"]);
const form = ref();
const isLoading = ref(false);
const supabase = useSupabaseClient();
const { toastSucess, toastError } = useAppToast();
const schema = z.object({
  type: z.enum(types, { message: "请选择收支类型" }),
  amount: z
    .number({ required_error: "请输入收支金额", invalid_type_error: "请输入正确金额" })
    .positive({ message: "收支金额必须大于0" }),
  created_at: z.string({ required_error: "请选择收支日期" }),
  description: z.string().optional(),
  category: z.string({ required_error: "请输入收支分类" }),
});

const initState = isEditing.value
  ? {
      type: props.transaction.type,
      amount: props.transaction.amount,
      created_at: props.transaction.created_at,
      description: props.transaction.description,
      category: props.transaction.category,
    }
  : {
      type: undefined,
      amount: 0,
      created_at: undefined,
      description: undefined,
      category: undefined,
    };
const state = ref({ ...initState });
const resetForm = () => {
  Object.assign(state.value, initState);
  form.value.clear();
};
const submitForm = async () => {
  isLoading.value = true;
  try {
    const { error } = await supabase.from("transactions").upsert({ ...state.value, id: props.transaction?.id });
    if (error) throw error;
    toastSucess({ title: isEditing.value ? "编辑成功" : "添加成功" });
    dialog.value = false;
    emit("saved");
  } catch (error) {
    toastError({ title: isEditing.value ? "编辑失败" : "添加失败！", description: error.message });
  } finally {
    isLoading.value = false;
  }
};
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm();
    emit("update:modelValue", value);
  },
});
</script>

<style scoped></style>
