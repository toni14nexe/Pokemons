import { defineStore } from 'pinia'
import axios from 'axios'
import router from "../router/index"

let serverHost = 'http://localhost:3000/users/'

export const useUsersStore = defineStore("users", {
  state: () => {
    return {
		pokedex: []
	};
  },
  actions: {
	async getUsers() {
		try {
			let response = await axios.get(serverHost)
			return response
		} catch (error) {
			throw error
		}
	},
	async getUser(id) {
		try {
			let response = await axios.get(`${serverHost}${id}`)
			return response
		} catch (error) {
			throw error
		}
	},
	async login(userData) {
		try {
			let userOK = false
			let role
			let id
			let response = await axios.get(serverHost)
			response.data.forEach(user => {
				if(user.username === userData.username && user.password === userData.password){
					userOK = true
					role = user.role
					id = user.id
					stop
				}
			});
			if(userOK){
				$cookies.remove('user')
				$cookies.set('user', { role: role, username: userData.username, id: id }, 60 * 30)
			}
			return userOK
		} catch (error) {
			throw error
		}
	},
	async signUp(userData) {
		try {
			let response = await axios.post(serverHost, userData)
			return response
		} catch (error) {
			throw error
		}
	},
	async ifUsernameAlreadyExist(username) {
		try {
			let exist = false
			let response = await axios.get(serverHost)
			response.data.forEach(user => {
				if(user.username === username){
					exist = true
					stop
				}
			});
			if(exist) return true
			else return false
		} catch (error) {
			throw error
		}
	},
	async ifEmailAlreadyExist(email) {
		try {
			let exist = false
			let response = await axios.get(serverHost,)
			response.data.forEach(user => {
				if(user.email == email){
					exist = true
					stop
				}
			});
			if(exist) return true
			else return false
		} catch (error) {
			throw error
		}
	},
	async refreshUserData(){
		this.pokedex = null
		let userCookie = $cookies.get('user')
		if(userCookie && userCookie.id ){
			try {
				let response = await axios.get(`${serverHost}/${userCookie.id}`)
				this.pokedex = response.data.pokedex
				$cookies.remove('user')
				$cookies.set('user', { role: response.data.role, username: response.data.username, id: userCookie.id }, 60 * 40)
				return true
			} catch (error) {
				throw error
			}
		} else{
			let path = router.currentRoute.value.fullPath
			if(!path.includes('signup') && !path.includes('home') && !path.includes('login')){
				router.push({ path: '/home' })
			}
		}
	},
	async addPokemon(pokemon){
		let userCookie = $cookies.get('user')
		let sendData
		if(userCookie && userCookie.id){
			try {
				let response = await this.getUser(userCookie.id)
				response.data.pokedex.push(pokemon)
				try {
					await axios.put(`${serverHost}${userCookie.id}`, response.data)
					this.refreshUserData()
					return true
				} catch (error) {
					throw error
				}
			} catch (error) {
				throw error;
			}
		}
	},
	checkIfUserIsLoggedIn(){
		let pathname = window.location.pathname
		let userCookie = $cookies.get('user')
		if(userCookie && userCookie.id){
			if(pathname.includes('login') || pathname.includes('signup')){
				router.push({ path: '/game' })
			}
			return { role: userCookie.role, username: userCookie.username }
		} else{
			return { role: '', username: '' }
		}
	}
  }
});
