<script setup lang="ts">
import type { ISwitchState, IToggleFeature } from "~/Types"

import Switch from "~/components/Switch.vue"

const properties = defineProps<{
  state: ISwitchState
  feature: IToggleFeature
}>()
</script>

<template>
  <div class="flex gap-3 items-center">
    <Switch :model-value="properties.state" />
    {{ properties.feature.displayName }}
  </div>
</template>
