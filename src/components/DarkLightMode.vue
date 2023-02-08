<script setup lang="ts">
// @ts-nocheck 
import { watch } from "vue"
import { Sunny, Moon } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const props = defineProps<{
    darkLightMode: boolean
}>()

watch(() => props.darkLightMode, () => {
    darkLightMode()
})

function darkLightMode(){
	if(isDark.value){
		isDark.value = null
	} else{
		isDark.value = useDark()
	}
}
</script>

<template>
    <div v-if="isDark">
        <el-icon size="35">
            <Sunny />
        </el-icon>
        <el-avatar :size="40" class="mb-2 ml-2">
            <el-icon size="35">
                <Moon class="ml-1" />
            </el-icon>
        </el-avatar>
    </div>
    <div v-else>
        <el-avatar :size="40"  class="mb-2">
            <el-icon size="35">
                <Sunny class="ml-1" />
            </el-icon>
        </el-avatar>
        <el-icon class="ml-2" size="35">
            <Moon />
        </el-icon>
    </div>    
</template>

<style scoped>
</style>
