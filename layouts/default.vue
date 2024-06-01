<template>
  <div class="container mx-auto max-w-5xl py-4 px-2 lg:p-0">
    <AppHeader></AppHeader>
    <main class="my-10">
      <slot></slot>
    </main>
  </div>
</template>

<script setup></script>

<style>
body {
  @apply dark:bg-gray-900 bg-white;
}
</style>
