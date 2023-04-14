<script setup lang="ts">
import { RouterLink } from "vue-router"

import { router } from "@/router"

import {
  getCurrentLanguage,
  isLanguageSupported,
} from "../../../src/contentScripts/Lang"

import HomeActions from "./HomeActions.vue"
import ExploreActions from "./ExploreActions.vue"

const routes = router.getRoutes()

const currentLanguage = getCurrentLanguage()
</script>

<template>
  <nav class="h-screen flex-shrink-0 w-60 dash-long dashed">
    <div
      class="flex font-extrabold text-sm mb-8 tracking-wider text-light-900/50 dashed dashed-spacing-4 dashed-width-1 dashed-length-10"
    >
      <div
        class="flex max-w-min py-2 px-4 text-stone-400 dashed uppercase items-center dashed-width-3"
      >
        Sidebar
      </div>
      <div
        class="w-full py-2 px-4 dashed dashed-width-3"
        :class="isLanguageSupported ? 'text-cyan-600' : 'text-red-600'"
      >
        { lang: {{ currentLanguage }}, isSupported: {{ isLanguageSupported }} }
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <div class="">
        <div class="font-extrabold tracking-wide px-4 text-light-900/50">
          nav =>
        </div>
        <nav class="font-medium text-lg gap-6">
          <ul class="flex flex-col">
            <li
              v-for="{ path, name: label } in routes"
              :key="path"
              class="p-4 dashed"
            >
              <RouterLink
                :to="path"
                active-class="text-green-400 "
                class="underline"
                >{{ label }}</RouterLink
              >
            </li>
          </ul>
        </nav>
      </div>

      <div class="">
        <div class="font-extrabold tracking-wide px-4 text-light-900/50">
          actions
        </div>
        <div class="">
          <HomeActions v-if="router.currentRoute.value.name === 'home'">
          </HomeActions>
          <ExploreActions
            v-else-if="router.currentRoute.value.name === 'explore'"
          >
          </ExploreActions>
          <div v-else class="p-3 text-stone-400">[ None for this page ]</div>
        </div>
      </div>
    </div>
  </nav>
</template>
