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
			name: "home2",
			component: Home
		},
		{
			path: "/Login",
			name: "login",
			component: () => import("../views/Login.vue")
		},
		{
			path: "/Registration",
			name: "registration",
			component: () => import("../views/Registration.vue")
		}
	]
})

export default router
