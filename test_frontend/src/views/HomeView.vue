<script setup lang="ts">
import Headline from "@/components/Headline.vue"
import Post from "@/components/Post.vue"
import { usePostsStore } from "@/stores/posts.js"

const postsStore = usePostsStore()
</script>

<template>
  <Headline>Home page</Headline>

  <main class="flex flex-col w-full pt-16 pb-12 gap-10 items-center">
    <Post
      v-for="(post, index) in postsStore.posts"
      :key="index"
      :type="post.type"
      :media="post.media"
    ></Post>
  </main>
</template>
