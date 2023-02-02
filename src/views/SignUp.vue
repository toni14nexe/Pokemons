<script setup lang="ts">
// @ts-nocheck
</script>

<template>
	<el-container>
        <el-col align="center">
			<h1>SignUp</h1>
			<span>E-mail</span>
			<el-input
				v-model="email"
				autosize
				type="text"
				placeholder="Email"
				autofocus
				input-style="text-align: center"
			/>
			<span>Username</span>
			<el-input
				v-model="username"
				autosize
				type="text"
				placeholder="Username"
				maxlength="40"
				minlength="4"
				input-style="text-align: center"
			/>
			<span>Password</span>
			<el-input
				v-model="password"
				autosize
				type="password"
				placeholder="Password"
				maxlength="40"
				minlength="8"
				input-style="text-align: center"
			/>
			<span>Repeat password</span>
			<el-input
				v-model="repeatedPassword"
				autosize
				type="password"
				placeholder="Repeat password"
				maxlength="40"
				minlength="8"
				input-style="text-align: center"
			/>
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
