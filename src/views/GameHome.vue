<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from "vue"
import GuessPokemon from "../components/Game/GuessPokemon.vue"
import Pokedex from "../components/Game/Pokedex.vue"
import Search from "../components/Game/Search.vue"
import { usePokemonStore } from "../stores/pokemons";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore();
const usersStore = useUsersStore();
let pokedex = ref<any>([])
const props = defineProps<{
    component: string
}>();

onMounted(() => {
    pokemonStore.getFirst151Pokemons()
    refreshUserData()
})

async function refreshUserData(){
    try {
        await usersStore.refreshUserData()
        pokedex.value = usersStore.pokedex
    } catch (error) {
        throw error;
    }
}

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
            <GuessPokemon v-else-if="component == 'game'" :pokedex="pokedex" @pokedex="(result) => addPokemon(result)" />
            <Pokedex v-else :pokedex="pokedex" :component="component" />
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
