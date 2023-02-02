import { defineStore } from 'pinia'
import axios from 'axios'

let serverHost = 'http://localhost:3000/users/'

export const useUsersStore = defineStore("users", {
  state: () => {
    return {};
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
	async login(userData) {
		try {
			let userOK = false
			let response = await axios.get(serverHost)
			response.data.forEach(user => {
				if(user.username === userData.username && user.password === userData.password){
					userOK = true
					stop
				}
			});
			if(userOK){
				$cookies.set('keyName', 'aaa', 60 * 30)
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
  }
});
