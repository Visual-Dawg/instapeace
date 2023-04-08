<script setup lang="ts">
import { language } from "../../../src/contentScripts/Lang.js"

import type { IPost } from "@/Types"

type Post = {
  type: "ad" | "default" | "suggested"
}

const properties = defineProps<Post>()

const profileName = "x.x0"
const description = "Image description here"

type isPostTypeMatching<Test> = Test extends IPost ? true : false
const _: isPostTypeMatching<Post> = true
</script>

<template>
  <article class="w-full max-w-[460px] dashed">
    <div
      class="flex py-2 px-4 justify-between dashed dashed-width-2 dashed-length-4 dashed-spacing-3"
    >
      <header class="">
        <canvas class="h-0 w-0"></canvas>
        <div class="flex gap-4 justify-between items-center">
          <a :href="`/${profileName}`">
            <img
              src="/smiley.svg"
              :alt="profileName"
              class="h-8 text-yellow-600 w-8"
            />
          </a>
          <div>{{ profileName }}</div>
          <div class="text-cyan-600">
            {{
              properties.type === "ad"
                ? language.sponsored
                : properties.type === "suggested"
                ? language.follow
                : ""
            }}
          </div>
        </div>
      </header>
      <button>...</button>
    </div>

    <!-- Post image -->
    <div class="">
      <img
        :src="
          properties.type === 'ad'
            ? '/red.svg'
            : properties.type === 'suggested'
            ? '/orange.svg'
            : '/green.svg'
        "
        alt="Post alt text"
        class="w-full px-4 aspect-square"
      />
    </div>

    <!-- Interaction buttons -->
    <section class="flex text-lg py-1 px-4 justify-between">
      <div class="flex gap-4">
        <button>&lt;3</button><button>O</button><button>></button>
      </div>
      <button>[]</button>
    </section>

    <!-- Liked by -->
    <section class="font-bold text-sm mb-1 px-4 text-light-300">
      {{ language.likedBy }} <a class="bold">Ooo</a> and
      <a class="bold">others</a>
    </section>

    <!-- Description -->
    <div
      class="py-4 px-4 dashed dashed-width-2 dashed-length-4 dashed-spacing-6"
    >
      {{ description }}
    </div>

    <!-- Add comment -->
    <section class="py-4 px-4">
      <form method="POST">
        <textarea
          aria-label="Add a comment…"
          placeholder="Add a comment…"
          autocomplete="off"
          autocorrect="off"
          style="height: 18px !important"
          class="bg-transparent text-sm w-full appearance-none placeholder:text-sm"
        ></textarea>
      </form>
    </section>
  </article>
</template>
