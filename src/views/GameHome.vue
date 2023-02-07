<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, watch } from "vue"
import GuessPokemon from "../components/Game/GuessPokemon.vue"
import Pokedex from "../components/Game/Pokedex.vue"
import Search from "../components/Game/Search.vue"
import { usePokemonStore } from "../stores/pokemons";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from 'pinia'
import router from "../router/index"

const pokemonStore = usePokemonStore();
const usersStore = useUsersStore();
let pokedex = ref<any>([])
let show = ref<string>('')

watch(() => router.currentRoute.value.name, () => {
    show.value = router.currentRoute.value.name
});

onMounted(() => {
    pokemonStore.getFirst151Pokemons()
    refreshUserData()
    show.value = router.currentRoute.value.name
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
            <Search v-if="show == 'game/search'" :pokedex="pokedex" />
            <GuessPokemon v-else-if="show == 'game'" :pokedex="pokedex" @pokedex="(result) => addPokemon(result)" />
            <Pokedex v-else :pokedex="pokedex" :component="show" />
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
