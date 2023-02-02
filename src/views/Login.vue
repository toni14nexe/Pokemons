<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue"

let username = ref<string>('')
let password = ref<string>('')
</script>

<template>
    <el-container>
        <el-col align="center">
            <h1>Login</h1>
            <span>Username</span>
            <el-input
                v-model="username"
                autosize
                type="text"
                placeholder="Username"
                maxlength="40"
                minlength="4"
                autofocus
                input-style="text-align: center"
            />
            <span>Password</span>
            <el-input
                v-model="password"
                autosize
                type="Password"
                placeholder="Password"
                maxlength="40"
                minlength="8"
                input-style="text-align: center"
            />
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
