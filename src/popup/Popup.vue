<script setup lang="ts">
import { sendMessage, setNamespace } from "webext-bridge"

import { NAMESPACE_ID } from "~/contentScripts/constants"
import {
  disableAutoplayStorage,
  disableInfiniteScrollStorage,
  hideAdsStorage,
  hideSuggestedImagesStorage,
  hideSuggestedStorage,
  hideSuggestedVideosStorage,
} from "~/logic/storage"

console.info("Popup started...")

const isLanguageSupported = ref(true)

setNamespace(NAMESPACE_ID)

sendMessage("x", undefined, "window").then((data) => {
  console.log({ answer: data })
  isLanguageSupported.value = data
})

watch(isLanguageSupported, (isSupported) =>
  console.log({ isLanguageSupported: isSupported })
)

const deactivated = computed(() =>
  isLanguageSupported.value
    ? false
    : {
        message:
          "The current language is not supported for this feature. Currently only english is supported.",
      }
)

function sendM() {
  console.log("CLICK")
  sendMessage("x", undefined, "content-script")
    .then(console.log)
    .catch(console.error)
}
</script>

<template>
  <main
    class="flex flex-col text-center p-4 shadow-2xl text-gray-700 w-[340px] gap-4"
  >
    <!-- Header -->
    <div class="flex gap-3 items-center" @click="sendM">
      <Logo class="h-9 w-9" />
      <h1 class="font-medium text-lg">Instapeace</h1>
    </div>

    <div v-if="!isLanguageSupported" class="">
      The current Instagram language is not supported. Currently only english is
      supported.
    </div>
    {{ isLanguageSupported }}

    <!-- Setting toggles -->
    <div class="flex flex-col gap-2">
      <Setting
        v-model="hideAdsStorage"
        :deactivated="deactivated"
        label="Hide ads"
      ></Setting>
      <Setting
        v-model="hideSuggestedStorage"
        :deactivated="deactivated"
        label="Hide suggested"
      ></Setting>
      <Setting
        v-model="hideSuggestedImagesStorage"
        label="Hide suggested images"
        :deactivated="deactivated"
      ></Setting>
      <Setting
        v-model="hideSuggestedVideosStorage"
        label="Hide suggested videos"
        :deactivated="deactivated"
      ></Setting>
      <Setting
        v-model="disableAutoplayStorage"
        label="Disable autoplay"
        :deactivated="deactivated"
      ></Setting>
      <Setting
        v-model="disableInfiniteScrollStorage"
        label="Disable infinite scroll"
      ></Setting>
    </div>

    <!-- Footer -->
    <div class="mt-2"></div>
  </main>
</template>
