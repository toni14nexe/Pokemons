<script setup lang="ts">
// @ts-nocheck 
import { ref, watch } from "vue"
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { useUsersStore } from "../stores/users";

const usersStore = useUsersStore();
let musicPlay = ref<boolean>(false)
let everChanged = ref<boolean>(false)
let audio = new Audio('https://instrumentalfx.co/wp-content/upload/11/Pokemon-Theme-Song.mp3?_=2')

const props = defineProps<{
    music: boolean
}>();

watch(() => props.music, () => {
    playOrStopMusic()
});

function playOrStopMusic() {
    if(musicPlay.value){
        musicPlay.value = false
        audio.load();
    } else{
        musicPlay.value = true
        audio.play();
    }
    refreshUserData()
}

async function refreshUserData(){
    try {
        await usersStore.refreshUserData()
    } catch (error) {
        throw error;
    }
}
</script>

<template>
    <el-icon @click="playOrStopMusic()" class="hover-pointer" size="35">
        <VideoPause v-if="musicPlay" />
        <VideoPlay v-else />
    </el-icon>
</template>

<style scoped>
</style>
