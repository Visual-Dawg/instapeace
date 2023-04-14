<script setup lang="ts">
import ExploreThumbnail from "@/components/ExploreThumbnail.vue"
import Headline from "@/components/Headline.vue"
import { useExploreThumbsStore } from "@/stores/posts.js"

const thumbnailsStore = useExploreThumbsStore()
</script>

<template>
  <Headline>Explore</Headline>

  <main
    class="w-full max-w-[920px] grid p-4 pt-8 pb-12 gap-3 grid-cols-3 items-center"
  >
    <ExploreThumbnail
      v-for="(thumb, index) in thumbnailsStore.thumbnails"
      :key="index"
      :type="thumb.type"
      :media="thumb.media"
    ></ExploreThumbnail>
  </main>
</template>
