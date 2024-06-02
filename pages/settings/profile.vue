<template>
  <UForm :state="state" :schema="schema" @submit="saveProfile">
    <UFormGroup label="昵称" name="nick_name" class="mb-4">
      <UInput placeholder="请输入昵称" v-model="state.nick_name"></UInput>
    </UFormGroup>
    <UFormGroup label="邮箱" name="email" class="mb-4" help="你将收到一份邮件用于验证更换账号邮箱验证">
      <UInput placeholder="请输入昵称" v-model="state.email"></UInput>
    </UFormGroup>
    <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">保存</UButton>
  </UForm>
</template>

<script setup>
import { z } from "zod";
const supabase = useSupabaseClient();
const pending = ref(false);
const user = useSupabaseUser();
const { toastSucess, toastError } = useAppToast();
const state = ref({
  nick_name: user.value.user_metadata?.nick_name,
  email: user.value.email,
});
const schema = z.object({
  nick_name: z.string({ required_error: "请输入昵称" }),
  email: z.string({ required_error: "请输入邮箱" }).email({ message: "邮箱格式错误" }),
});
const saveProfile = async () => {
  pending.value = true;
  try {
    const data = {
      data: { nick_name: state.value.nick_name },
    };
    if (state.value.email !== user.value.email) {
      data.email = state.value.email;
    }
    const { error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    toastSucess({ title: "账号设置更新成功" });
  } catch (error) {
    toastError({ title: "账号设置错误", description: error.message });
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped></style>
