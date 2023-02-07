<script setup lang="ts">
// @ts-nocheck
import { ref, watch, onMounted } from "vue"
import { usePokemonStore } from "../../stores/pokemons";
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { getUserPokemonsIds } from "../../composables/getPokemonsIds";

const pokemonStore = usePokemonStore();
let loading = ref<boolean>(true)
let correct = ref<boolean>(false)
let wrong = ref<boolean>(false)
let pokemon = ref<any>()
let pokemonIds = ref<number[]>([])
let pokemonName = ref<string>('')
let showIfWrongPokemonName = ref<string>('')
let myPokemonProgress = ref<number>(0)

const props = defineProps<{
    pokedex: any
}>();

const emits = defineEmits<{
  (event: "pokedex", value: any): any;
}>();

watch(() => props.pokedex, () => {
  getPokemonIds()
});

onMounted(() => {
    getPokemonIds('firstPokemon')
})

function getPokemonIds(loading){
    pokemonIds.value = getUserPokemonsIds(props.pokedex)
    myPokemonProgress.value = parseFloat(((pokemonIds.value.length / 151) * 100).toFixed(1))
    getRandomPokemon()
}

async function getRandomPokemon() {
    loading.value = true
    let randomNum = await getRandomId()
    try {
        pokemon.value = await pokemonStore.getOnePokemon(randomNum)

        /* Delete this console log */
        console.log(pokemon.value)

        loading.value = false
    } catch (error) {
        throw error;
    }
}

function getRandomId(){
    let num = Math.floor(Math.random() * 151) + 1
    if(pokemonIds.value.includes(num)){
        getRandomId()
    } else{
        return num
    }
}

function submit(){
    pokemonName.value = pokemonName.value.toLowerCase()
    if(pokemonName.value == pokemon.value.name){
        correct.value = true
        pokemonIds.value.push(pokemon.value.id)
        emits('pokedex', pokemon.value)
        setTimeout(async () => {
            correct.value = false
        }, 2000);
    } else{
        showIfWrongPokemonName.value = pokemon.value.name
        wrong.value = true
        setTimeout(async () => {
            wrong.value = false
        }, 2000);
    }
    pokemonName.value = ''
    getRandomPokemon()
}
</script>

<template>
    <el-container>
        <el-col v-if="loading" align="center">
            <el-skeleton :rows="6" animated />
        </el-col>
        <el-col @keyup.enter="submit" v-else align="center">
            <h1>Guess Pokemon</h1>
            <img v-if="!correct && !wrong" :src="pokemon.image">
            <div v-if="correct">
                <el-icon class="icon-size" color="var(--success-color)">
                    <CircleCheck class="icon-size"/>
                </el-icon>
                <span style="color: var(--success-color)"><br>Correct!<br></span>
            </div>
            <div v-if="wrong">
                <el-icon class="icon-size" color="var(--danger-color)">
                    <CircleClose class="icon-size"/>
                </el-icon>
                <span style="color: var(--danger-color)"><br>Wrong!<br></span>
                <span><br>That Pokemon was {{ showIfWrongPokemonName[0].toUpperCase() }}{{ showIfWrongPokemonName.slice(1) }}<br></span>
            </div>
            <span></span>
            <el-input
                v-if="!correct && !wrong"
                v-model="pokemonName"
                autosize
                type="text"
                placeholder="Pokemon name"
                maxlength="50"
                minlength="1"
                autofocus
                input-style="text-align: center"
            />
            <el-row justify="space-evenly" v-if="!correct && !wrong">
                <el-button 
                    type="danger"
                    @click="getRandomPokemon"
                >Skip
                </el-button>
                <el-button 
                    type="success"
                    @click="submit"
                    :disabled="!pokemonName.length"
                >Submit
                </el-button>
            </el-row>
            <el-row class="mt-3" justify="space-evenly">
                <el-col :span="23">
                    <span>My Pokemon progress</span>
                    <el-progress
                        class="mt-3"
                        :text-inside="true"
                        :stroke-width="30"
                        :percentage="myPokemonProgress"
                        status="success"
                    />
                </el-col>
            </el-row>
        </el-col>
    </el-container>
</template>

<style scoped>
img{
    width: 40vh;
}

.icon-size{
    width: 40vh;
    height: 40vh;
}
</style>
