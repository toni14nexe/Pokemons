<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, watch } from "vue"
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";
import { usePokemonStore } from "../../stores/pokemons";

const pokemonsStore = usePokemonStore();
let pokemonIds = ref<number[]>([])
let tablePokemons = ref<any[]>([])
let isLoading = ref<boolean>(true)

const props = defineProps<{
    pokedex: any,
    component: string
}>();

watch(() => props.pokedex, () => {
    getPokemonIds()
});
watch(() => props.component, () => {
    isLoading.value = true
    getPokemonIds()
    changeTablePokemons()
    isLoading.value = false
});

onMounted(() => {
    getPokemonIds()
    if(pokemonsStore.pokemons.length){
        tablePokemons.value = pokemonsStore.pokemons
        changeTablePokemons()
    } else{
        setTimeout(async () => {
            tablePokemons.value = pokemonsStore.pokemons
            changeTablePokemons()
        }, 250);
    }
    isLoading.value = false
})

function getPokemonIds(){
    pokemonIds.value = getUserPokemonsIds(props.pokedex)
}

function changeTablePokemons(){
    tablePokemons.value = []
    if(props.component == 'game/pokedex/my-pokemons'){
        tablePokemons.value = props.pokedex
    } else if(props.component == 'game/pokedex/free-pokemons'){
        pokemonsStore.pokemons.forEach(pokemon => {
            if(!pokemonIds.value.includes(pokemon.id)){
                tablePokemons.value.push(pokemon)
            }
        });
    } else{
        tablePokemons.value = pokemonsStore.pokemons
    }
}
</script>

<template>
    <el-container>
        <el-row v-if="!tablePokemons.length || !pokemonsStore.pokemons.length || isLoading">
            <el-skeleton :rows="6" animated />
        </el-row>
        <el-row v-else class="pl-2" :class="{'pr-2': tablePokemons.length < 10}" :gutter="5" >
            <el-col class="pb-1" v-bind:key="pokemon.id" v-for="pokemon in tablePokemons" :span="8">
                <el-card :body-style="{ padding: 0 }" class="pb-3">
                    <el-skeleton class="pokedex-image mt-5">
                        <template #template>
                            <img v-if="pokemonIds.includes(pokemon.id)" :src="pokemon.image" class="pokedex-image" />
                            <el-skeleton-item v-else variant="image" class="pokedex-image" />
                        </template>
                    </el-skeleton>
                    <span>{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}</span>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<style scoped>
    .pokedex-image{
        min-width: 120px;
        min-height: 120px;
        width: 120px; 
        height: 120px;
    }

    .active{
        background: var(--primary-color);
        color: black;
    }
</style>
