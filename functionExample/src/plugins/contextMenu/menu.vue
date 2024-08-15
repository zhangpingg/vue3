<template>
    <div class="contextMenu" tabindex="-1" v-if="data.id" ref="boxRef">
        <p>姓名：{{ data.name }}</p>
        <p>年龄：{{ data.age }}</p>
        <span class="contextMenu-close" @click="clickFunc()">X</span>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick, onUpdated, watch } from 'vue';

const boxRef = ref(null);

const props = defineProps({
    data: { type: Object, default: {} },
    onClose: { type: Function, default: () => {} }
});

const clickFunc = (type) => {
    props.onClose();
};

watch(
    () => props.data.visible,
    (newVal, oldVal) => {
        Promise.resolve().then(() => {
            const newDom = boxRef.value;
            const clickoutFn = (e) => {
                if (newDom != boxRef.value) {
                    document.removeEventListener('click', boxRef.value?.__clickEvent__);
                }
                if (newDom == boxRef.value && !newDom?.contains(e.target)) {
                    props.onClose();
                }
            };
            boxRef.value.__clickEvent__ = clickoutFn;
            document.addEventListener('click', clickoutFn, false);
        });
    },
    { immediate: true }
);
</script>

<style scoped>
.contextMenu {
    position: fixed;
    padding: 10px 20px 10px 10px;
    border-radius: 6px;
    border: 1px solid rgba(222, 222, 222, 0.5);
    background-color: #f1f1f1;
    font-size: 14px;
    font-weight: 500;
    user-select: none;
    .contextMenu-close {
        position: absolute;
        top: 0px;
        right: 2px;
        cursor: pointer;
    }
}
</style>
