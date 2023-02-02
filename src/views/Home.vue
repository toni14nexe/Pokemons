<script setup lang="ts">
// @ts-nocheck
import router from "../router/index"
import image from "@/assets/images/pokemon-text.png"

const emits = defineEmits<{
  (event: "componentChange", value: string): string;
}>();

function switchTo(componentForSwitch){
	router.push({ path: `/${componentForSwitch}/` })
	emits('componentChange', componentForSwitch)
}
</script>

<template>
    <el-container>
        <el-row>
        <el-col align="center">
            <img
                class="pokemon-text"
                src="@/assets/images/pokemon-text.png" 
                @click="switchTo('login')"
            />
        </el-col>
        <el-col align="center">
            <img src="@/assets/images/logo.png" 
            @click="switchTo('login')"
        />
        </el-col></el-row>
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
