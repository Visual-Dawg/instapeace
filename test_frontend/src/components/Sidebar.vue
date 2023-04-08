<script setup lang="ts">
import { RouterLink } from "vue-router"

import { usePostsStore } from "@/stores/posts"

import Button from "./Button.vue"

const postsStore = usePostsStore()

function addPost() {
  postsStore.addPost({ type: "default" })
}
function addAd() {
  postsStore.addPost({ type: "ad" })
}
function addSuggested() {
  postsStore.addPost({ type: "suggested" })
}
</script>

<template>
  <nav class="h-screen flex-shrink-0 w-48 dash-long dashed">
    <div
      class="font-extrabold text-sm mb-8 tracking-wider text-light-900/50 uppercase dashed dashed-spacing-4 dashed-width-1 dashed-length-10"
    >
      <div class="max-w-min py-2 px-4 dashed dashed-width-3">Sidebar</div>
    </div>

    <div class="flex flex-col gap-8">
      <div class="">
        <div class="font-extrabold tracking-wide px-4 text-light-900/50">
          actions
        </div>
        <nav class="font-medium text-lg pl-3 gap-6">
          <div class="flex w-full dashed">
            <Button @click="addPost">Add post</Button>
          </div>
          <div class="flex w-full dashed">
            <Button @click="addAd">Add ad</Button>
          </div>
          <div class="flex w-full dashed">
            <Button @click="addSuggested">Add suggested</Button>
          </div>
        </nav>
      </div>

      <div class="">
        <div class="font-extrabold tracking-wide px-4 text-light-900/50">
          nav =>
        </div>
        <nav class="font-medium text-lg gap-6 underline">
          <ul class="flex flex-col">
            <li class="p-4 dashed"><RouterLink to="/">Home</RouterLink></li>
            <li class="p-4 dashed">
              <RouterLink to="/reels">Reels</RouterLink>
            </li>
            <!-- <li class="p-4 dashed">
              <RouterLink to="/userprofile">Userprofile</RouterLink>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>
  </nav>
</template>
