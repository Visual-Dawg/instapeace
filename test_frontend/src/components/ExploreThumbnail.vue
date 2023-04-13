<script setup lang="ts">
import type { IExploreThumbnail } from "@/Types"

type IThumbnail = {
  type: "default"
  media?: "image" | "video"
}

const properties = defineProps<IThumbnail>()

type TypeMatcher<Test> = Test extends IExploreThumbnail ? true : false
const _: TypeMatcher<IThumbnail> = true
</script>

<template>
  <a class="h-full w-full p-4 dashed aspect-square" href="/p/post">
    <!-- Post image / video -->
    <div class="h-full w-full">
      <img
        v-if="properties.media === 'image' || properties.media === undefined"
        src="/green.svg"
        alt="Post alt text"
        class="w-full aspect-square"
      />
      <video
        v-else
        src="/beeple_loop.mp4"
        alt="Post alt text"
        class="h-full object-cover w-full px-4"
        autoplay
        muted
        loop
        controls
      />
    </div>
  </a>
</template>
