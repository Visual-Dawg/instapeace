<script setup lang="ts">
import {
  disableAutoplayStorage,
  hideAdsStorage,
  hideSuggestedStorage,
} from "~/logic/storage"

console.log("Popup started...")
</script>

<template>
  <main
    class="flex flex-col text-center py-5 px-4 text-gray-700 w-[340px] gap-6"
  >
    <!-- Header -->
    <div class="flex gap-3 items-center">
      <Logo class="h-10 w-10" />
      <h1 class="text-xl">Instapeace</h1>
    </div>

    <!-- Setting toggles -->
    <div class="flex flex-col gap-2">
      <Setting v-model="hideAdsStorage" label="Hide ads"></Setting>
      <Setting v-model="hideSuggestedStorage" label="Hide suggested"></Setting>
      <Setting
        v-model="disableAutoplayStorage"
        label="Disable autoplay"
      ></Setting>
    </div>

    <!-- Footer -->
    <div class="mt-2"></div>
  </main>
</template>
