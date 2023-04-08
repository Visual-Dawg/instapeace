<script setup lang="ts">
import { hideAdsStorage } from "~/logic/storage"
import { contentFeatures } from "~/contentScripts/features/index.js"

console.log("Popup started...")

function toggle(reference: Ref<boolean | undefined | null>): () => void {
  return () =>
    reference.value ? (reference.value = false) : (reference.value = true)
}

function toggleAds() {
  toggle(hideAdsStorage)()
}
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
    <div class="flex flex-col gap-2" @click="toggleAds">
      <Setting
        :state="hideAdsStorage"
        :feature="contentFeatures.hideAds"
      ></Setting>
    </div>

    <!-- Footer -->
    <div class="mt-2">
      <span class="opacity-50">Hide ads storage:</span>
      {{ hideAdsStorage }}
    </div>
  </main>
</template>
