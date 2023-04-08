import { ref } from "vue"
import { defineStore } from "pinia"

import type { IPost } from "@/Types"

export const usePostsStore = defineStore("posts", () => {
  const defaultPosts: IPost[] = [
    { type: "default" },
    { type: "ad" },
    { type: "suggested" },
  ]

  const posts = ref<IPost[]>(defaultPosts)

  function addPost(post: IPost) {
    posts.value.push(post)
  }

  return { posts, addPost }
})
