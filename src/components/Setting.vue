<script setup lang="ts">
import type { ISwitchState } from "~/Types"

import Switch from "~/components/Switch.vue"

const properties = defineProps<{
  modelValue: ISwitchState
  label: string
  deactivated?: { message: string } | false | undefined
}>()

defineEmits(["update:modelValue"])
</script>

<template>
  <div class="flex gap-3 items-center">
    <Switch
      :model-value="modelValue"
      :disabled="!!properties.deactivated"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    {{ properties.label }}

    <ri:error-warning-line v-if="!!deactivated" />
  </div>
</template>
