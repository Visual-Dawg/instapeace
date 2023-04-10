<script setup lang="ts">
import type { ISwitchState } from "~/Types"

import Switch from "~/components/Switch.vue"

const properties = defineProps<{
  modelValue: ISwitchState
  label: string
}>()

defineEmits(["update:modelValue"])
</script>

<template>
  <div class="flex gap-3 items-center">
    <Switch
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    {{ properties.label }}
  </div>
</template>
