import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/home",
			name: "userHome",
			component: Home
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Login.vue")
		},
		{
			path: "/signup",
			name: "signUp",
			component: () => import("../views/SignUp.vue")
		},
		{
			path: "/game",
			name: "game",
			component: () => import("../views/GameHome.vue"),
		},
		{
			path: "/game/pokedex",
			name: "pokedex",
			component: () => import("../views/GameHome.vue")
		},
		,
		{
			path: "/game/pokedex/all-pokemons",
			name: "pokedexAll",
			component: () => import("../views/GameHome.vue")
		},
		,
		{
			path: "/game/pokedex/my-pokemons",
			name: "pokedexMy",
			component: () => import("../views/GameHome.vue")
		},
		,
		{
			path: "/game/pokedex/free-pokemons",
			name: "pokedexFree",
			component: () => import("../views/GameHome.vue")
		},
		{
			path: "/game/search",
			name: "search",
			component: () => import("../views/GameHome.vue")
		},
		{
			path: "/:catchAll(.*)",
			name: "NotFound",
			component: () => import("../views/PageNotFound.vue"),
		}
	]
})

export default router
