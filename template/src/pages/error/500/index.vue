<template>
    <div class="err">
        <el-empty :image-size="200" description=" " class="err-main">
            <h1 class="fs-50">500</h1>
            <div class="err-mian-description fs-18 mt-10 mb-15">抱歉，服务器出错了</div>
            <el-button type="primary" @click="backHome">返回首页</el-button>
        </el-empty>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const backHome = () => {
    router.push({ path: '/home' });
};
</script>

<style lang="less" scoped>
.err {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .err-main {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        .err-mian-description {
            color: #999;
        }
    }
    :deep(.el-empty__bottom) {
        margin-top: 0;
    }
}
</style>
