<!-- Show Error for normal -->

<script setup>
const props = defineProps({
  isError: Boolean,
  errors: Array,
})
</script>
<template>
  <span v-if="isError">
    <div v-for="error of errors" :key="error.id">
      <div>
        <small class="p-error">{{ error.message }}</small>
      </div>
    </div>
  </span>
</template>
