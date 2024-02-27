<template>
    <div>
        <Button @click="jumpPage">跳转到home</Button>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Input, Button } from "view-ui-plus";

const router = useRouter(); // 路由全局对象
const route = useRoute(); // 当前路由对象

const jumpPage = () => {
    router.push("/home");
};

onMounted(() => {
    console.log("路由参数：", route.query);
});
</script>

<style scoped></style>
