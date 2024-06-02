<template>
  <UCard v-if="!sucess">
    <template #header> 邮箱登录 </template>
    <UForm :state="state" :schema="schema" @submit="handleLogin">
      <UFormGroup label="邮箱" name="email" class="mb-4" :required="true" help="你将收到一封邮件用于验证账号注册">
        <UInput type="email" placeholder="请输入邮箱" required v-model="state.email"></UInput>
      </UFormGroup>
      <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">登录</UButton>
    </UForm>
  </UCard>
  <UCard v-else>
    <template #header> 邮件已发送 </template>
    <div class="text-center">
      <p class="mb-4">我们已经给{{ state.email }}发了一封邮件，里面有登录的链接</p>
      <p><strong>登录链接5分钟内有效</strong></p>
    </div>
  </UCard>
</template>

<script setup>
import { z } from "zod";

useRedirectAuth();
const sucess = ref(false);
const state = ref({ email: undefined });
const pending = ref(false);
const { toastSucess, toastError } = useAppToast();
const supabase = useSupabaseClient();
const schema = z.object({
  email: z.string({ required_error: "请输入邮箱" }).email({ message: "邮箱格式错误" }),
});
const redirectUrl = useRuntimeConfig().public.baseUrl;
const handleLogin = async () => {
  pending.value = true;
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: state.value.email,
      options: {
        emailRedirectTo: `${redirectUrl}/confirm`,
      },
    });
    if (error) throw error;
    sucess.value = true;
  } catch (error) {
    toastError({
      title: error.message,
      icon: "i-heroicons-exlamation-circle",
    });
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped></style>
