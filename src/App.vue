<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, watch } from "vue"
import { RouterLink, RouterView } from "vue-router"
import Header from "./components/Header.vue"
import router from "./router/index"
import { useUsersStore } from "./stores/users"

const usersStore = useUsersStore()
let component = ref(router.currentRoute.value.href)
let loggedIn = ref<number>(0)
let firstMusic = ref<boolean>(false)

watch(
	() => router.currentRoute.value.path,
	() => {
		component.value = router.currentRoute.value.path
		usersStore.refreshUserData()
	}
)

onMounted(() => {
	component.value = router.currentRoute.value.path
})

async function refreshUserData() {
	try {
		await usersStore.refreshUserData()
		pokedex.value = usersStore.pokedex
	} catch (error) {
		throw error
	}
}

function switchComponent(result) {
	component.value = result
}
</script>
<template>
	<Header
		class="header"
		:loggedIn="loggedIn"
		@componentChange="(result) => switchComponent(result)"
		:firstMusic="firstMusic"
	/>
	<el-main class="main bg-opacity">
		<RouterView
			:class="{
				router_small:
					component != '/' &&
					component != 'home' &&
					component != '/home' &&
					component != '/home/'
			}"
			@componentChange="(result) => switchComponent(result)"
			:component="component"
			@loggedIn="loggedIn++"
			@firstMusic="firstMusic = true"
		/>
	</el-main>
</template>

<style scoped></style>
