<script setup lang="ts">
import { useExploreThumbsStore } from "@/stores/posts"

import Button from "./Button.vue"

const thumbsStore = useExploreThumbsStore()
</script>

<template>
  <div class="flex flex-col font-medium text-lg gap-3">
    <!-- Add default -->

    <div class="py-2 px-3 dashed dashed-sm">
      <div class="text-light-900">Add default</div>
      <div class="dashed">
        <Button @click="thumbsStore.addThumbnail({ type: 'default' })"
          >image</Button
        >
        <Button
          @click="thumbsStore.addThumbnail({ type: 'default', media: 'video' })"
          >video</Button
        >
      </div>
    </div>
  </div>
</template>

<style></style>
