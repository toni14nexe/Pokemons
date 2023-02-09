<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref, watch } from "vue"
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";
import { getFavouritePokemons } from "../../composables/getFavourites";
import { usePokemonStore } from "../../stores/pokemons";
import { useUsersStore } from "../../stores/users";
import { Star, StarFilled } from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'

const pokemonsStore = usePokemonStore();
const userStore = useUsersStore();
let pokemonIds = ref<number[]>([])
let favouritePokemons = ref<number[]>([])
let tablePokemons = ref<any[]>([])
let isLoading = ref<boolean>(true)
let title = ref<string>('')
let myPokemonProgress = ref<number>(0)

const props = defineProps<{
    pokedex: any,
    component: any
}>();

const emits = defineEmits<{
  (event: "reloadUserData")
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
    myPokemonProgress.value = parseFloat(((pokemonIds.value.length / 151) * 100).toFixed(1))
    getFavourites()
}

function getFavourites(){
    favouritePokemons.value = getFavouritePokemons(props.pokedex)
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
async function removeFromFavourite(pokemon){
    let response = false
    try {
        response = await userStore.removePokemonFromFavourites(pokemon)
		emits('reloadUserData')
    } catch (error) { throw error }
    if(response){
        getPokemonIds()
        ElNotification({
            message: `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} removed from favourites`,
            type: 'warning',
            offset: 60,
            showClose: false
        })
    } else{
        ElNotification({
            message: 'Something went wrong!',
            type: 'error',
            offset: 60,
            showClose: false
        })
    }
}

async function addToFavourite(pokemon){
    let response = false
    try {
        response = await userStore.addPokemonToFavourite(pokemon)
		emits('reloadUserData')
    } catch (error) { throw error }
    if(response){
        getPokemonIds()
        ElNotification({
            message: `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} added to favourites`,
            type: 'success',
            offset: 60,
            showClose: false
        })
    } else{
        ElNotification({
            message: 'Something went wrong!',
            type: 'error',
            offset: 60,
            showClose: false
        })
    }
}
</script>

<template>
    <el-container>
        <el-row v-if="!tablePokemons.length || !pokemonsStore.pokemons.length || isLoading">
            <el-skeleton :rows="6" animated />
        </el-row>
        <div v-else style="width: 100%;">
            <h1 class="mb-1">{{ title }}</h1>
            <span>My Pokemon progress</span>
            <el-progress
                class="mt-3 mb-5 ml-1 mr-1"
                :text-inside="true"
                :stroke-width="30"
                :percentage="myPokemonProgress"
                status="success"
            />
            <el-row class="pl-2" :class="{'pr-2': tablePokemons.length < 10}" :gutter="5" >
                <el-col class="pb-1" v-bind:key="pokemon.id" v-for="pokemon in tablePokemons" :span="8">
                    <el-card :body-style="{ padding: 0 }" class="pb-3">
                        <el-skeleton class="pokedex-image mt-5">
                            <template #template>
                                <el-popover
                                    v-if="pokemonIds.includes(pokemon.id)"
                                    placement="top-start"
                                    :width="200"
                                    :trigger="'hover' || 'click'"
                                >
                                <template #default>
                                    <el-row justify="space-between">
                                        <h3>{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}</h3>
                                        <el-icon 
                                            size="25" 
                                            v-if="favouritePokemons.includes(pokemon.id)" 
                                            class="favourite-star hover-pointer"
                                            @click="removeFromFavourite(pokemon)"
                                        >
                                            <StarFilled />
                                        </el-icon>
                                        <el-icon 
                                            size="25" 
                                            v-else
                                            class="notfavourite-star hover-pointer"
                                            @click="addToFavourite(pokemon)"
                                        >
                                            <Star />
                                        </el-icon>
                                    </el-row>
                                    <span><br>HP: {{ pokemon.hp }}<br></span>
                                    <span>Speed: {{ pokemon.speed }}<br></span>
                                    <span>Attack: {{ pokemon.attack }}<br></span>
                                    <span>Defense: {{ pokemon.defense }}<br><br></span>
                                </template>
                                    <template #reference>
                                        <div>
                                            <img :src="pokemon.image" class="pokedex-image" />
                                            <el-icon
                                                v-if=(favouritePokemons.includes(pokemon.id))
                                                size="25" 
                                                class="favourite-star on-image-star"
                                                @click="addToFavourite(pokemon)"
                                            ><StarFilled /></el-icon>
                                        </div>
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
    .on-image-star{
        position:absolute;
        top: var(--spacing-1);
        right: var(--spacing-1);
    }
</style>
