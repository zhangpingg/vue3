<template>
    <router-view v-slot="{ Component, route }">
        <transition name="router-fade" mode="out-in">
            <template v-if="route.meta.cache">
                <keep-alive>
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </template>
            <template v-else>
                <component :is="Component" :key="route.fullPath" />
            </template>
        </transition>
    </router-view>
</template>

<script setup></script>

<style scoped></style>
