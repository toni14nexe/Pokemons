export function getFavouritePokemons(pokemons) {
    let favouritePokemons = []
    pokemons.forEach(pokemon => {
        if(pokemon.favourite){
            favouritePokemons.push(pokemon.id)
        }
    });
    return favouritePokemons
}