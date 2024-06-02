<template>
  <div class="grid grid-cols-6 gap-8">
    <UVerticalNavigation :links="links" class="col-span-2" />
    <div class="col-span-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: "账号设置",
    to: "/settings/profile",
  },
  {
    label: "用户头像",
    to: "/settings/avatar",
  },
  {
    label: "个性设置",
    to: "/settings/settings",
  },
];
</script>

<style scoped></style>
