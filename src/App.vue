<script setup lang="ts">
// @ts-nocheck
import { ref } from "@vue/reactivity"
import { RouterLink, RouterView } from "vue-router"
import Header from "./components/Header.vue"
import router from "../router/index"

let component = ref(window.location.pathname.slice(1, window.location.pathname.length - 1))

function switchComponent(result){
	component.value = result
}
</script>

<template>
	<Header class="header" @componentChange="(result) => switchComponent(result)" />
	<el-main class="bg-opacity main">
		<RouterView 
			:class="{ router: component != '' && component != 'home' }"
			@componentChange="(result) => switchComponent(result)"
		/>
	</el-main>
</template>

<style scoped>
</style>
