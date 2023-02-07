<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue"
import router from "../router/index"
import { useUsersStore } from "../stores/users";
import { checkLogInData } from "../composables/userDataCheck";

const usersStore = useUsersStore();
let user = ref<any>({
	username: '',
	password: ''
})
let errorResponse = ref<any>({
	username: null,
	password: null
})
let wrongUsernameOrPassword = ref<string>('')

function switchTo(componentForSwitch){
	router.push({ path: `/${componentForSwitch}/` })
	emits('componentChange', componentForSwitch)
}

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
  (event: "loggedIn"): void;
}>();

async function login(){
    if(user.value.username.length>0 && user.value.password.length>0){
        errorResponse.value = checkLogInData(user.value)
        if(!errorResponse.value.username && !errorResponse.value.password){
            try {
                const response = await usersStore.login(user.value)
                if(response){
                    wrongUsernameOrPassword.value = ''
	                emits('loggedIn')
                    switchTo('game')
                } else{
                    wrongUsernameOrPassword.value = 'Wrong username or password!'
                }
            } catch (error) {
                throw error;
            }
        }
        user.value.username = ''
        user.value.password = ''
    }
}
</script>

<template>
    <el-container @keyup.enter="login">
        <el-col align="center">
            <h1>Login</h1>
            <span v-if="wrongUsernameOrPassword.length>0" class="warning-text">{{ wrongUsernameOrPassword }}<br></span>
            <span>Username<br><span class="warning-text">{{ errorResponse.username }}</span></span>
            <el-input
                v-model="user.username"
                autosize
                type="text"
                placeholder="Username"
                maxlength="40"
                minlength="4"
                autofocus
                input-style="text-align: center"
            />
            <span>Password<br><span class="warning-text">{{ errorResponse.password }}</span></span>
            <el-input
                v-model="user.password"
                autosize
                type="Password"
                placeholder="Password"
                maxlength="40"
                minlength="8"
                input-style="text-align: center"
            />
            <el-button 
				class="wide-btn"
				type="success"
				@click="login"
				:disabled="
					!user.username.length ||
					!user.password.length
				"
			>Login
			</el-button>
			<span>Don't have account? <span class="link-color" @click="switchTo('signup')">SignUp</span></span>
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
