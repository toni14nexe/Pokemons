<script setup lang="ts">
// @ts-nocheck
const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();

emits('componentChange', 'PageNotFound')
</script>

<template>
	<el-container>
    <el-col align="center">
      <h2>Page not found</h2>
    </el-col>
  </el-container>
</template>

<style scoped>
</style>
