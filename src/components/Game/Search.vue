<script setup lang="ts">
// @ts-nocheck
import { Search } from "@element-plus/icons-vue";
import { ref, watch, onMounted } from "vue"
import router from "../../router/index"
import { usePokemonStore } from "../../stores/pokemons";
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";

const pokemonsStore = usePokemonStore();
let tablePokemons = ref<any>([])
let pokemonIds = ref<number[]>([])
let search = ref<string>('')
let isLoading = ref<boolean>(true)

const props = defineProps<{
    pokedex: any
}>();

watch(() => router.currentRoute.value.query.pokemon, () => {
    getSearch()
});

onMounted(() => {
    if(pokemonsStore.pokemons.length){
        getSearch()
    } else{
        setTimeout(async () => {
            getSearch()
        }, 750);
    }
})

async function getSearch(){
    isLoading.value = true
    pokemonIds.value = getUserPokemonsIds(props.pokedex)
    search.value = router.currentRoute.value.query.pokemon
    tablePokemons.value = pokemonsStore.pokemons
    tablePokemons.value = tablePokemons.value.filter((pokemon) => { 
        return pokemon.name.includes(search.value.toLowerCase()) 
    })
    isLoading.value = false
}
</script>

<template>
    <el-container>
        <el-col align="center">
            <el-row v-if="!tablePokemons.length || !pokemonsStore.pokemons.length || isLoading">
                <el-skeleton :rows="6" animated />
            </el-row>
            <div v-else>
                <h1 class="mb-1">Search: {{ search }}</h1>
                <el-row class="pl-2" :class="{'pr-2': tablePokemons.length < 10}" :gutter="5" >
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
            </div>
        </el-col>
    </el-container>
</template>

<style scoped>
</style>
