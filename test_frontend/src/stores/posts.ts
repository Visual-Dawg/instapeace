import { ref } from "vue"
import { defineStore } from "pinia"

import type { IExploreThumbnail, IPost } from "@/Types"

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

export const useExploreThumbsStore = defineStore("thumbs", () => {
  const defaultThumbs: IExploreThumbnail[] = [
    { type: "default", media: "image" },
    { type: "default", media: "image" },
    { type: "default", media: "image" },
    { type: "default", media: "video" },
    { type: "default", media: "image" },
    { type: "default", media: "image" },
    { type: "default", media: "image" },
    { type: "default", media: "video" },
  ]

  const thumbnails = ref<IExploreThumbnail[]>(defaultThumbs)

  function addThumbnail(thumbnail: IExploreThumbnail) {
    thumbnails.value.push(thumbnail)
  }

  return { thumbnails, addThumbnail }
})
