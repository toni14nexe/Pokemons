<script setup lang="ts">
// @ts-nocheck 
import router from "../router/index"
import { ref, onMounted, watch } from "vue"
import { Search, SwitchButton } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useUsersStore } from "../stores/users";
import Music from "./Music.vue"
import DarkLightMode from "./DarkLightMode.vue"

const usersStore = useUsersStore();
let component = ref('home')
let search = ref<string>('')
let user = ref<any>({ role: '', username: '' })
let firstMusic = ref<boolean>(false)
let darkLightMode = ref<boolean>(false)

const props = defineProps<{
    loggedIn: number,
	firstMusic: boolean
}>();

watch(() => props.loggedIn, () => {
  checkIfUserIsLoggedIn()
});

watch(() => props.firstMusic, () => {
    firstMusic = true
});

onMounted(() =>{
	checkIfUserIsLoggedIn()
})

async function checkIfUserIsLoggedIn(){
	user.value = await usersStore.checkIfUserIsLoggedIn()
}

function switchTo(componentForSwitch){
	if(componentForSwitch == 'game/search'){
		if(!search.value.length){
			ElNotification({
				message: 'Search input field is empty!',
				type: 'info',
				offset: 60,
				showClose: false
			})
		} else{
			router.push({ path: `/${componentForSwitch}/`, query: { 'pokemon': search.value } })
			emits('componentChange', componentForSwitch)
		}
	} else{
		router.push({ path: `/${componentForSwitch}/` })
		emits('componentChange', componentForSwitch)
	}
}

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();

function logout(){
	$cookies.remove('user')
	router.push({ path: '/login' })
	checkIfUserIsLoggedIn()
}
</script>

<template>
	<el-menu
		@click="firstMusic = true"
		style="opacity: 0.9;"
		class="hover-pointer"
		:default-active="component"
		mode="horizontal"
		menu-trigger="click"
	>
		<el-menu-item index="home" @click="switchTo('home')">
			<el-space wrap>
				<el-icon class="ml-3 hover-pointer">
					<img class="logo-fix" src="@/assets/images/logo.png"/>
				</el-icon>
			</el-space>
		</el-menu-item>
		<div class="flex-grow" />
			<el-menu-item v-if="!user.username.length" index="login" @click="switchTo('login')">Login</el-menu-item>
			<el-menu-item v-if="!user.username.length" index="registration" @click="switchTo('signup')">SignUp</el-menu-item>
			<el-input
				v-if="user.username.length"
				class="search-input"
				placeholder="Search Pokemon"
				v-model="search"
				@keyup.enter="switchTo('game/search')"
			>
				<template #suffix>
					<el-icon @click="switchTo('game/search')">
						<Search />
					</el-icon>
				</template>
			</el-input>
			<el-menu-item v-if="user.username.length" index='me' @click="switchTo('game/pokedex/my-pokemons')">{{ user.username }}</el-menu-item>
			<el-menu-item v-if="user.username.length" index="play" @click="switchTo('game')">Play</el-menu-item>
			<el-sub-menu v-if="user.username.length" index="pokedex-all" class="hover-pointer-off">
				<template #title>Pokedex</template>
				<el-menu-item index="pokedex-all" @click="switchTo('game/pokedex/all-pokemons')">All Pokemons</el-menu-item>
				<el-menu-item index="pokedex-my" @click="switchTo('game/pokedex/my-pokemons')">My Pokemons</el-menu-item>
				<el-menu-item index="pokedex-free" @click="switchTo('game/pokedex/free-pokemons')">Free Pokemons</el-menu-item>
			</el-sub-menu>
			<el-menu-item class="justify-center">
				<Music :music="firstMusic" />
			</el-menu-item>
			<el-menu-item
				class="justify-center"
				index="logout"
				v-if="user.username.length" 
				@click="logout"
			>
				<el-icon size="35">
					<SwitchButton />
				</el-icon>
			</el-menu-item>
			<el-menu-item
				class="justify-center mt-2 mb-2"
				index="dark-light"
				alignment="center"
				@click="darkLightMode = !darkLightMode">
				<DarkLightMode :darkLightMode="darkLightMode" />
			</el-menu-item>
	</el-menu>
</template>

<style scoped>
.logo-fix{
	width: 3rem;
	position: relative;
}

.flex-grow {
  flex-grow: 1;
}

.search-input{
	width: 12rem; 
	min-width: fit-content; 
	height: 50px;
	align-self: center;
}

@media screen and (max-width: 300px) {
	.ml-3{
		margin-left: 0;
	}
}

@media screen and (max-height: 649px) {
	.logo-fix{
		width: auto;
		height: 30px;
	}
}
</style>
