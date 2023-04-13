<script setup lang="ts">
import { usePostsStore } from "@/stores/posts"

import Button from "./Button.vue"

const postsStore = usePostsStore()
</script>

<template>
  <div class="flex flex-col font-medium text-lg gap-3">
    <!-- Add default -->

    <div class="py-2 px-3 dashed dashed-sm">
      <div class="text-light-900">Add default</div>
      <div class="dashed">
        <Button @click="postsStore.addPost({ type: 'default' })">image</Button>
        <Button @click="postsStore.addPost({ type: 'default', media: 'video' })"
          >video</Button
        >
      </div>
    </div>

    <!-- Add suggested -->
    <div class="py-2 px-3 dashed dashed-sm">
      <div class="text-light-900">Add suggested</div>
      <div class="dashed">
        <Button @click="postsStore.addPost({ type: 'suggested' })"
          >image</Button
        >
        <Button
          @click="postsStore.addPost({ type: 'suggested', media: 'video' })"
          >video</Button
        >
      </div>
    </div>

    <!-- Add ad -->
    <div class="py-2 px-3 dashed dashed-sm">
      <div class="text-light-900">Add ad</div>
      <div class="dashed">
        <Button @click="postsStore.addPost({ type: 'ad' })">image</Button>
        <Button @click="postsStore.addPost({ type: 'ad', media: 'video' })"
          >video</Button
        >
      </div>
    </div>
  </div>
</template>

<style></style>
