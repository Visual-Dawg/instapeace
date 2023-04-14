<script setup lang="ts">
import type { ISwitchState } from "~/Types"

type Properties = {
  modelValue: ISwitchState
  disabled?: boolean
}

const properties = withDefaults(defineProps<Properties>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: Properties["modelValue"]): void
}>()

function toggleState() {
  properties.modelValue
    ? emit("update:modelValue", false)
    : emit("update:modelValue", true)
}
</script>

<template>
  <button
    class="border rounded-full flex h-5 w-9 relative disabled:opacity-80"
    :class="properties.modelValue ? 'bg-blue-500' : 'bg-gray-100'"
    :disabled="disabled"
    @click="toggleState()"
  >
    <!-- Circle -->
    <div
      class="rounded-full h-4 top-[1px] left-[2px] w-4 absolute"
      transition="duration-150 all "
      :class="
        properties.modelValue
          ? 'bg-white left-[calc(100%-2px)] -translate-x-[100%] '
          : 'bg-gray-500 translate-x-[0px] '
      "
    ></div>
  </button>
</template>
