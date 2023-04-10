<script setup lang="ts">
import type { ISwitchState } from "~/Types"

type Properties = {
  modelValue: ISwitchState
}

const properties = withDefaults(defineProps<Properties>(), {
  modelValue: false,
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
  <div
    class="border rounded-full flex h-5 p-[1px] w-9 relative"
    :class="properties.modelValue ? 'bg-blue-500' : 'bg-gray-100'"
    @click="toggleState()"
  >
    <!-- Circle -->
    <div
      class="rounded-full h-[1.125rem] w-[1.125rem]"
      transition="duration-150 all "
      :class="
        properties.modelValue
          ? 'bg-white translate-x-[100%] '
          : 'bg-gray-500 translate-x-[0px] '
      "
    ></div>
  </div>
</template>
