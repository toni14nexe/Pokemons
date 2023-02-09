export function getUserPokemonsIds(pokemons) {
	let pokemonIds = []
	pokemons.forEach((pokemon) => {
		pokemonIds.push(pokemon.id)
	})
	return pokemonIds
}
