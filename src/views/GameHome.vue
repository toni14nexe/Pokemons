<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue"
import GuessPokemon from "../components/Game/GuessPokemon.vue"
import Pokedex from "../components/Game/Pokedex.vue"
import Search from "../components/Game/Search.vue"
import { useUsersStore } from "../stores/users";
import { storeToRefs } from 'pinia'

const usersStore = useUsersStore();
let pokedex = ref<any>([])
const props = defineProps<{
    component: string
}>();

async function refreshUserData(){
    try {
        await usersStore.refreshUserData()
        pokedex.value = usersStore.pokedex
    } catch (error) {
        throw error;
    }
}

refreshUserData()

async function addPokemon(pokemon) {
    pokedex.value.push(pokemon)
    try {
        await usersStore.addPokemon(pokemon)
        refreshUserData()
    } catch (error) {
        throw error;
    }
}

</script>

<template>
    <el-container>
        <el-col align="center">
            <Search v-if="component == 'game/search'" />
            <Pokedex v-else-if="component == 'game/pokedex'" />
            <GuessPokemon v-else :pokedex="pokedex" @pokedex="(result) => addPokemon(result)" />
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
