<script setup lang="ts">
// @ts-nocheck
const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();

emits('componentChange', 'PageNotFound')
</script>

<template>
	<h1 class="mt-8">Page Not Found</h1>
</template>

<style scoped>
</style>
