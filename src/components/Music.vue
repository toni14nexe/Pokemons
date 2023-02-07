<script setup lang="ts">
// @ts-nocheck 
import { ref, watch, onMounted } from "vue"
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { useUsersStore } from "../stores/users";

const usersStore = useUsersStore();
let musicPlay = ref<boolean>(false)
let audio = new Audio('https://instrumentalfx.co/wp-content/upload/11/Pokemon-Theme-Song.mp3?_=2')

const props = defineProps<{
    music: boolean
}>();

watch(() => props.music, () => {
    playOrPauseMusic()
});

function playOrPauseMusic() {
    if(musicPlay.value){
        musicPlay.value = false
        audio.pause();
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
    <el-icon @click="playOrPauseMusic()" class="music-icon hover-pointer" size="35">
        <VideoPause v-if="musicPlay" />
        <VideoPlay v-else />
    </el-icon>
</template>

<style scoped>
</style>
