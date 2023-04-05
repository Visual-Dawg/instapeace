<script setup lang="ts">
import { ref } from "vue"

import { storageDemo } from "~/logic/storage"
import { settings } from "~/logic/settings.js"

console.log("Popup started...")
const x = ref<"off" | "on">("off")

function toggleX() {
  x.value === "off" ? (x.value = "on") : (x.value = "off")
}
</script>

<template>
  <main
    class="w-[340px] px-4 py-5 text-center text-gray-700 flex flex-col gap-6"
  >
    <!-- Header -->
    <div class="flex gap-3 items-center">
      <Logo class="h-10 w-10" />
      <h1 class="text-xl">Instapeace</h1>
    </div>

    <!-- Setting toggles -->
    <div class="flex flex-col gap-2" @click="toggleX">
      <Setting :model-value="x" :feature="settings.hideAds"></Setting>
    </div>

    <!-- Footer -->
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
