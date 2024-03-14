<template>
    <div>
        <Button @click="jumpPage">跳转到about</Button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Input, Button } from 'view-ui-plus';

const router = useRouter();

const jumpPage = () => {
    router.push({ path: '/routerAbout', query: { id: 1 } });
};
</script>

<style scoped></style>
