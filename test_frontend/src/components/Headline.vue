<script setup lang="ts">
//
</script>

<template>
  <div
    class="font-extrabold bg-dark-700 text-sm tracking-wide w-full top-0 text-light-100/50 sticky uppercase dashed dashed-spacing-9 dashed-length-5 dashed-width-2"
  >
    <div class="max-w-max py-2 px-4 dashed dashed-width-2 dashed-length-15">
      { Main view -
      <slot><span class="text-red-500">No headline passed</span></slot> }
    </div>
  </div>
</template>
