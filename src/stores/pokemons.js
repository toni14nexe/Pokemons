import { defineStore } from 'pinia'
import axios from 'axios'

let serverHost = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore("pokemons", {
  state: () => {
    return {
      pokemons: []
    };
  },
  actions: {
    async getOnePokemon(id) {
      try {
        let response = await axios.get(`${serverHost}/pokemon/${id}`)
        if(response.data){
          response.data.name = response.data.name.replace('-', " ");
        let pokemon = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default
        }
        if(!pokemon.image){
          pokemon.image = response.data.sprites.front_shiny
        }
        return pokemon
      }
      } catch (error) {
        this.getOnePokemon(Math.floor(Math.random() * 151) + 1)
      }
    },
    async getFirst151Pokemons(){
      this.pokemons = []
      for(let id=1; id<=151; id++){
        try {
          let response = await axios.get(`${serverHost}/pokemon/${id}`)
          let pokemon = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            speed: response.data.stats[5].base_stat
          }
          if(!pokemon.image){
            pokemon.image = response.data.sprites.front_shiny
          }
          this.pokemons.push(pokemon)
        } catch (error) {}
        this.pokemons.sort((pokemon1, pokemon2) => {
          if (pokemon1.name < pokemon2.name) {
            return -1;
          }
          if (pokemon1.name > pokemon2.name) {
            return 1;
          }
        })
      }
    }
  }
});