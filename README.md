# Pokemons

This template should help get you started local Pokemon project.

# RUN LOCAL PROJECT

## Project Installation

```sh
npm install
```

### Run JSON-Server

```sh
json-server --watch json-server/db.json
```

### Compile and Run Development

```sh
npm run dev
```

### Login data

You can sign up as new user or try test user:

```sh
username: test
password: test1234
```

# LOCAL DATABASE SERVER

If you want to use local json file you must do 2 things:

### 1 Run JSON-Server

```sh
json-server --watch json-server/db.json
```

### 2 Change url in user store

src/store/user.js set serverHost in line 5 to:

```sh
"http://localhost:3000/users/"

```

# ONLINE DATABASE SERVER

### Change url in user store

src/store/user.js set serverHost in line 5 to:

```sh
"https://my-json-server.typicode.com/toni14nexe/Pokemons/users/"

```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
