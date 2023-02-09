const email = (email) => {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.match(emailRegex)) {
		return null
	} else {
		return "Wrong email!"
	}
}

const username = (username) => {
	if (username.length > 3) {
		return null
	} else {
		return "Username too short!"
	}
}

const passwordSignUp = (password1, password2) => {
	if (password1.length > 7) {
		if (password1 == password2) {
			null
		} else {
			return "Passwords do not match!"
		}
	} else {
		return "Min password length is 8 characters!"
	}
}

const passwordLogIn = (password) => {
	if (password.length > 7) {
		return null
	} else {
		return "Min password length is 8 characters!"
	}
}

export const checkSignInData = (user, password2) => {
	let response = {
		email: null,
		username: null,
		password: null
	}
	response.email = email(user.email)
	response.username = username(user.username)
	response.password = passwordSignUp(user.password, password2)
	return response
}

export const checkLogInData = (user) => {
	let response = {
		username: null,
		password: null
	}
	response.username = username(user.username)
	response.password = passwordLogIn(user.password)
	return response
}
