<script setup lang="ts">
type Properties = {
  modelValue: "off" | "on" | "middle"
}

const properties = withDefaults(defineProps<Properties>(), {
  modelValue: "off",
})

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: Properties["modelValue"]): void
}>()

function toggleState() {
  properties.modelValue === "on"
    ? emit("update:modelValue", "off")
    : emit("update:modelValue", "on")
}
</script>

<template>
  <div
    class="flex border rounded-full relative h-5 w-10"
    :class="properties.modelValue === 'on' ? 'bg-blue-500' : 'bg-gray-100'"
    @click="toggleState()"
  >
    <!-- Circle -->
    <div
      class="rounded-full h-[1.125rem] w-[1.125rem]"
      transition="duration-150 all "
      :class="
        properties.modelValue === 'on'
          ? 'bg-white translate-x-[20px] '
          : 'bg-gray-500 translate-x-[1px] '
      "
    ></div>
  </div>
  <!-- <
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    > -->
  <!-- <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div> -->
</template>
