<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'

const component = ref('home')

const emits = defineEmits<{
  	(event: "change", value: string);
}>();

function switchComponent(component){
	component = component
	emits('change', component)
}
</script>

<template>
	<el-menu
		style="opacity: 0.9"
		class="hover-pointer"
		:default-active="component"
		mode="horizontal"
		:ellipsis="false"
	>
		<el-menu-item index="home" @click="switchComponent('home')">
			<el-space wrap>
				<el-icon class="ml-3 hover-pointer">
					<img class="logo-fix" src="@/assets/images/logo.png"/>
				</el-icon>
			</el-space>
		</el-menu-item>
		<div class="flex-grow" />
		<el-space spacer="|" class="pr-3">
			<el-menu-item index="registration" @click="switchComponent('registration')">Registration</el-menu-item>
			<el-menu-item index="login" @click="switchComponent('login')">Login</el-menu-item>
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
</style>
