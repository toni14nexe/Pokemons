<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue"
import router from "../router/index"
import { useUsersStore } from "../stores/users";
import { checkSignInData } from "../composables/userDataCheck";
import { ElNotification } from 'element-plus'

const usersStore = useUsersStore();
let user = ref<any>({
	email: '',
	username: '',
	password: ''
})
let errorResponse = ref<any>({
	email: null,
	username: null,
	password: null
})
let confirmPassword = ref<any>('')

function switchTo(componentForSwitch){
	router.push({ path: `/${componentForSwitch}/` })
	emits('componentChange', componentForSwitch)
}

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();

async function signUp(){
	errorResponse.value = checkSignInData(user.value, confirmPassword.value)
	await checkIfUserAlreadyExist()
	if(!errorResponse.value.email && !errorResponse.value.username && !errorResponse.value.password){
		try {
			const response = await usersStore.signUp(user.value);
		} catch (error) {
			throw error;
		}
		ElNotification({
			message: 'Successfully register',
			type: 'success',
			offset: 80,
			showClose: flase
		})
	}
	user.value.email = ''
	user.value.username = ''
	user.value.password = ''
	confirmPassword.value = ''
}

async function checkIfUserAlreadyExist(){
	try {
		const response = await usersStore.ifUsernameAlreadyExist(user.value.username);
		if(response) errorResponse.value.username = "Username already exist!"
	} catch (error) {
		throw error;
	}
	try {
		const response = await usersStore.ifEmailAlreadyExist(user.value.email);
		if(response) errorResponse.value.email = "Email already exist!"
	} catch (error) {
		throw error;
	}
}
</script>

<template>
	<el-container>
        <el-col align="center">
			<h1>SignUp</h1>
			<span>E-mail<br><span class="warning-text">{{ errorResponse.email }}</span></span>
			<el-input
				v-model="user.email"
				autosize
				type="text"
				placeholder="Email"
				autofocus
				input-style="text-align: center"
			/>
			<span>Username<br><span class="warning-text">{{ errorResponse.username }}</span></span>
			<el-input
				v-model="user.username"
				autosize
				type="email"
				placeholder="Username"
				maxlength="40"
				minlength="4"
				input-style="text-align: center"
			/>
			<span>Password<br><span class="warning-text">{{ errorResponse.password }}</span></span>
			<el-input
				v-model="user.password"
				autosize
				type="password"
				placeholder="Password"
				maxlength="40"
				minlength="8"
				input-style="text-align: center"
			/>
			<span>Repeat password</span>
			<el-input
				v-model="confirmPassword"
				autosize
				type="password"
				placeholder="Confirm password"
				maxlength="40"
				minlength="8"
				input-style="text-align: center"
			/>
			<el-button 
				class="wide-btn"
				type="success"
				@click="signUp"
				:disabled="
					!user.email.length ||
					!user.username.length ||
					!user.password.length ||
					!confirmPassword.length
				"
			>Sign Up
			</el-button>
			<span>Already have an account? <span class="link-color" @click="switchTo('login')">Login</span></span>
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
