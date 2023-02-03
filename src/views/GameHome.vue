<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue"
import GuessPokemon from "../components/Game/GuessPokemon.vue"
import Pokedex from "../components/Game/Pokedex.vue"
import Search from "../components/Game/Search.vue"
import router from "../router/index"

const props = defineProps<{
    component: string
}>();

</script>

<template>
    <el-container>
        <el-col align="center">
            <Search v-if="component == 'game/search'" />
            <Pokedex v-else-if="component == 'game/pokedex'" />
            <GuessPokemon v-else />
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
