<script setup lang="ts">
import { RouterLink } from "vue-router"

import { router } from "@/router"

import HomeActions from "./HomeActions.vue"
import ExploreActions from "./ExploreActions.vue"

const routes = router.getRoutes()
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
          nav =>
        </div>
        <nav class="font-medium text-lg gap-6 underline">
          <ul class="flex flex-col">
            <li
              v-for="{ path, name: label } in routes"
              :key="path"
              class="p-4 dashed"
            >
              <RouterLink :to="path">{{ label }}</RouterLink>
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
        </div>
      </div>
    </div>
  </nav>
</template>
