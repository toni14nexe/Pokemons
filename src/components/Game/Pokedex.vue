<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, watch } from "vue"
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";
import { usePokemonStore } from "../../stores/pokemons";

const pokemonsStore = usePokemonStore();
let pokemonIds = ref<number[]>([])

const props = defineProps<{
    pokedex: any
}>();

watch(() => props.pokedex, () => {
    getPokemonIds()
});

onMounted(() => {
    getPokemonIds()
})

function getPokemonIds(){
    pokemonIds.value = getUserPokemonsIds(props.pokedex)
    //console.log(pokemonIds.value)
    //console.log(props.pokedex)
}

    console.log(pokemonsStore.pokemons)

</script>

<template>
    <el-container>
        <el-row class="pl-2 mb-5" gutter="5" >
            <el-col class="pb-1" v-bind:key="pokemon.id" v-for="pokemon in pokemonsStore.pokemons" :span="8">
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
</style>
