<script setup lang="ts">
// @ts-nocheck
import { ref, watch } from "vue"
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";
import { usePokemonStore } from "../../stores/pokemons";

const pokemonsStore = usePokemonStore();
let pokemonIds = ref<number[]>([])
let allPokemons = ref<any>([])

const props = defineProps<{
    pokedex: any
}>();

watch(() => props.pokedex, () => {
  getPokemonIds()
});

function getPokemonIds(){
    pokemonIds.value = getUserPokemonsIds(props.pokedex)
    if(allPokemons.value.length != 151){
        getAllPokemons()
    }
    //console.log(pokemonIds.value)
    //console.log(props.pokedex)
}

getPokemonIds()

async function getAllPokemons(){
    try {
        allPokemons.value = await pokemonsStore.getFirst151Pokemons()
        //console.log(allPokemons.value)
    } catch (error) {
        throw error;
    }
}

</script>

<template>
    <el-container>
        <el-col align="center">
            <h1>Pokedex</h1>
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
