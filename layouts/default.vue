<template>
  <div class="container mx-auto max-w-4xl">
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
