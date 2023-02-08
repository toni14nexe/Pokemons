<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, watch } from "vue"
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";
import { usePokemonStore } from "../../stores/pokemons";

const pokemonsStore = usePokemonStore();
let pokemonIds = ref<number[]>([])
let tablePokemons = ref<any[]>([])
let isLoading = ref<boolean>(true)
let title = ref<string>('')

const props = defineProps<{
    pokedex: any,
    component: any
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
    if(props.component == 'pokedexMy'){
        title.value = 'My Pokemons'
        tablePokemons.value = props.pokedex
    } else if(props.component == 'pokedexFree'){
        title.value = 'Free Pokemons'
        pokemonsStore.pokemons.forEach(pokemon => {
            if(!pokemonIds.value.includes(pokemon.id)){
                tablePokemons.value.push(pokemon)
            }
        });
    } else{
        title.value = 'All Pokemons'
        tablePokemons.value = pokemonsStore.pokemons
    }
}
</script>

<template>
    <el-container>
        <el-row v-if="!tablePokemons.length || !pokemonsStore.pokemons.length || isLoading">
            <el-skeleton :rows="6" animated />
        </el-row>
        <div v-else>
            <h1 class="mb-1">{{ title }}</h1>
            <el-row class="pl-2" :class="{'pr-2': tablePokemons.length < 10}" :gutter="5" >
                <el-col class="pb-1" v-bind:key="pokemon.id" v-for="pokemon in tablePokemons" :span="8">
                    <el-card :body-style="{ padding: 0 }" class="pb-3">
                        <el-skeleton class="pokedex-image mt-5">
                            <template #template>
                                <el-popover
                                    v-if="pokemonIds.includes(pokemon.id)"
                                    placement="top-start"
                                    :title="pokemon.name[0].toUpperCase() + pokemon.name.slice(1)"
                                    :width="200"
                                    :trigger="'hover' || 'click'"
                                >
                                <template #default>
                                    <span>HP: {{ pokemon.hp }}<br></span>
                                    <span>Speed: {{ pokemon.speed }}<br></span>
                                    <span>Attack: {{ pokemon.attack }}<br></span>
                                    <span>Defense: {{ pokemon.defense }}</span>
                                </template>
                                    <template #reference>
                                        <img :src="pokemon.image" />
                                    </template>
                                </el-popover>
                                <el-skeleton-item v-else variant="image" class="pokedex-image" />
                            </template>
                        </el-skeleton>
                        <span>{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}</span>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<style scoped>
</style>
