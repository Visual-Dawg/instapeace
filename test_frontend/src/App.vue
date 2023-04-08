<script setup lang="ts">
import { RouterView } from "vue-router"

import Sidebar from "./components/Sidebar.vue"
</script>

<template>
  <div class="flex">
    <Sidebar />

    <div class="flex-grow max-h-screen overflow-x-hidden overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>
