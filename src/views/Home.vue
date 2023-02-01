<script setup lang="ts">
// @ts-nocheck
import Login from "../components/home/Login.vue"

defineProps({
    component: String
})
</script>

<template>
    {{ component }}
    <el-main>
        <el-container>
            <el-col align="center">
                <Login v-if="component = 'registration'" />
                <Login v-if="component = 'login'" />
                <Login v-if="component = 'home'" />
            </el-col>
        </el-container>
    </el-main>
</template>

<style scoped>
</style>
