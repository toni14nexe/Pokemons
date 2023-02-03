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
	<el-main class="main" :class="{ bg_opacity: component != 'game', 
		main_game: component == 'game/search' || component == 'game/pokedex' ||
            component == 'game/play' || component == 'game' }">
		<RouterView 
			:class="{ router_small: component == 'login' || component == 'signup'}"
			@componentChange="(result) => switchComponent(result)"
			:component="component"
		/>
	</el-main>
</template>

<style scoped>
</style>
