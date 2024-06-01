<template>
  <header class="flex justify-between items-center">
    <NuxtLink to="/" class="text-3xl font-bold"> Finance Tracker </NuxtLink>
    <div v-if="user">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account="{ item }">
          <div class="text-left">
            <p>邮箱：</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ user.email }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
    </div>
  </header>
</template>

<script setup>
const user = await useSupabaseUser();
const supabase = useSupabaseClient();
const logout = async () => {
  await supabase.auth.signOut();
  return navigateTo("/login");
};
const items = [
  [
    {
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "用户设置",
      icon: "i-heroicons-cog-8-tooth",
      click: () => console.log("用户设置"),
    },
    {
      label: "退出登录",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: logout,
    },
  ],
];
</script>

<style scoped></style>
