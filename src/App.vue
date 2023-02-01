<script setup lang="ts">
// @ts-nocheck
import { ref } from "@vue/reactivity"
import { RouterLink, RouterView } from "vue-router"
import Header from "./components/Header.vue"

let component = ref('home')

</script>

<template>
	<Header class="header" @change="(result) => component = result" />
	<el-main class="bg-opacity main">
		<RouterView class="router" :component="component" />
	</el-main>
</template>

<style scoped>
</style>
