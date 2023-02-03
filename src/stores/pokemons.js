import { defineStore } from 'pinia'
import axios from 'axios'

let serverHost = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore("pokemons", {
  state: () => {
    return {};
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
			return pokemon
    }
		} catch (error) {
			this.getOnePokemon(Math.floor(Math.random() * 151) + 1)
		}
	}
  }
});