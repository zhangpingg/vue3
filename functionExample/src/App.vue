<template>
    <router-view v-slot="{ Component, route }">
        <template v-if="route.meta.cache">
            <keep-alive>
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </template>
        <template v-else>
            <component :is="Component" :key="route.fullPath" />
        </template>
    </router-view>
</template>

<script setup></script>

<style scoped></style>

