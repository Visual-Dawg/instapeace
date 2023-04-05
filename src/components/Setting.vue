<script setup lang="ts">
import { watch } from "vue"

import type { AppFeature, SwitchState } from "~/Types"

import Switch from "~/components/Switch.vue"

const properties = defineProps<{
  modelValue: SwitchState
  feature: AppFeature
}>()

watch(
  () => properties.modelValue,
  (x) => console.log({ x })
)
</script>

<template>
  <div class="flex gap-3 items-center">
    <Switch :model-value="properties.modelValue" />
    {{ properties.feature.fullName }}
  </div>
</template>
