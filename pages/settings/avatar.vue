<template>
  <div>
    <div class="mb-4">
      <UFormGroup label="用户头像" class="w-full">
        <UAvatar :src="url" size="3xl" />
      </UFormGroup>
    </div>
    <div class="mb-4">
      <UFormGroup label="上传头像" class="w-full" name="avatar" help="请上传你需要使用的图片作为用户头像">
        <UInput type="file" ref="fileInput"></UInput>
      </UFormGroup>
    </div>
    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="保存"
      @click="saveAvatar"
      :loading="pending"
      :disabled="pending"
    ></UButton>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { toastSucess, toastError } = useAppToast();
const pending = ref(false);
const fileInput = ref();
const { url } = useAvatarUrl();

const saveAvatar = async () => {
  const file = fileInput.value.input.files[0];
  if (!file) {
    toastError({ title: "请选择你要上传的用户头像" });
    return;
  }
  const fileExt = file.name.split(".").pop();
  const randomName = `${Math.random()}`.split(".")[1];
  const fileName = `${randomName}.${fileExt}`;
  try {
    pending.value = true;
    // 获取用户头像
    const currentAvatar = user.value.user_metadata?.avatar_url;
    // 上传用户头像
    const { error } = await supabase.storage.from("avatars").upload(fileName, file);
    if (error) throw error;
    // 判断用户之前是否存在用户头像，存在则删除之前头像图片
    if (currentAvatar) {
      const { error } = await supabase.storage.from("avatars").remove([currentAvatar]);
      if (error) throw error;
    }
    // 更新用户数据
    await supabase.auth.updateUser({ data: { avatar_url: fileName } });
    // 清空图片上传Input
    fileInput.value.input.value = null;
    toastSucess({ title: "上传用户头像成功" });
  } catch (error) {
    toastError({ title: "上传用户头像失败", description: error.message });
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped></style>
