<script setup lang="ts">
import router from "../router/index"
import { ref } from "vue"
// @ts-nocheck 
let component = ref('home')

function switchTo(componentForSwitch){
	router.push({ path: `/${componentForSwitch}/` })
	emits('componentChange', componentForSwitch)
}

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();
</script>

<template>
	<el-menu
		style="opacity: 0.9;"
		class="hover-pointer"
		:default-active="component"
		mode="horizontal"
		:ellipsis="false"
	>
		<el-menu-item index="home" @click="switchTo('home')">
			<el-space wrap>
				<el-icon class="ml-3 hover-pointer">
					<img class="logo-fix" src="@/assets/images/logo.png"/>
				</el-icon>
			</el-space>
		</el-menu-item>
		<div class="flex-grow" />
		<el-space style="color: black" spacer="|" class="pr-3">
			<el-menu-item index="registration" @click="switchTo('signup')">SignUp</el-menu-item>
			<el-menu-item index="login" @click="switchTo('login')">Login</el-menu-item>
		</el-space>
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

@media screen and (max-width: 300px) {
	.ml-3{
		margin-left: 0;
	}
}
</style>
