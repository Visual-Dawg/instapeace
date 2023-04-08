<script setup lang="ts">
const properties = defineProps<{ classes?: string }>()
</script>

<template>
  <button class="border border-double py-2 px-4" :class="properties.classes">
    <slot><span class="text-red-500">No text provided for button</span></slot>
  </button>
</template>
