<script setup lang="ts">
// @ts-nocheck
import router from "../router/index"
import { useUsersStore } from "../stores/users";
import { ref } from "vue"

const usersStore = useUsersStore();
let user = ref<any>({ role: '', username: '' })

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
  (event: "firstMusic"): void;
}>();

async function switchTo(){
    user.value = await usersStore.checkIfUserIsLoggedIn()
    if(!user.value.username.length){
        router.push({ path: '/login' })
	    emits('componentChange', '')
    } else{
        router.push({ path: '/game' })
	    emits('componentChange', '')
    }
}
</script>

<template>
    <el-container>
        <el-row>
            <el-col align="center">
                <img
                    class="pokemon-text hover-pointer"
                    src="@/assets/images/pokemon-text.png" 
                    @click="{ switchTo(); emits('firstMusic') }"
                />
            </el-col>
            <el-col align="center">
                <img
                    class="hover-pointer"
                    src="@/assets/images/logo.png" 
                    @click="{ switchTo(); emits('firstMusic') }"
            />
            </el-col>
        </el-row>
    </el-container>
</template>

<style scoped>
.pokemon-text{
    max-width: 50vh;
}

@media screen and (max-width: 430px) {
    .pokemon-text{
        width: 33vh;
    }
}
</style>
