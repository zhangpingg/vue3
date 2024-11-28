<template>
    <div>test</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'view-ui-plus';

const timer = ref();

const checkUpdate = async () => {
    let res = await fetch('/vue3/public/versionData.json', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    }).then((r) => r.json());
    if (!localStorage.getItem('demo_version')) {
        localStorage.setItem('demo_version', res.version);
    } else {
        if (res.version != localStorage.getItem('demo_version')) {
            localStorage.setItem('demo_version', res.version);
            Modal.confirm({
                title: '检测到新版本，是否更新？',
                content: '新版本内容：' + res.content,
                okText: '更新',
                cancelText: '取消',
                onOk: () => {
                    window.location.reload();
                }
            });
        }
    }
};

onMounted(() => {
    clearInterval(timer.value);
    timer.value = setInterval(async () => {
        checkUpdate();
    }, 3000);
});
</script>

<style lang="less" scoped></style>
