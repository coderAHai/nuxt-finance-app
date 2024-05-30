<template>
  <div class="grid grid-cols-2 py-4 border-b">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-1">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-600"></UIcon>
        <div>Salary</div>
      </div>
      <div>
        <UBadge color="white">Category</UBadge>
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
          ></UButton>
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const { currency } = useCurrency(3000);
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
      click: () => console.log("Delete"),
    },
  ],
];
</script>

<style scoped></style>
