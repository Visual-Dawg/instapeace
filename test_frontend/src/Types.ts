export type IPost = {
  type: "ad" | "default" | "suggested"
  media?: "image" | "video"
}

export type IExploreThumbnail = {
  type: "default"
  media?: "video" | "image"
}
