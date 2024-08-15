<template>
    <div class="confirmModal" v-if="isShowModal" @click="clickMaskToClose && handleCancel()">
        <transition name="fade">
            <div class="confirmModal-main">
                <div class="confirmModal-main-title" v-if="title">{{ title }}</div>
                <div :class="['confirmModal-main-content', title ? '' : 'confirmModal-main-noTitle']">
                    {{ content }}
                </div>
                <div class="confirmModal-main-line"></div>
                <div class="confirmModal-main-footer">
                    <div class="confirmModal-main-footer-cancelBtn" @click="handleCancel" v-if="showCancelButton">
                        {{ cancelText }}
                    </div>
                    <div class="confirmModal-main-footer-line" v-if="showCancelButton"></div>
                    <div
                        class="confirmModal-main-footer-confirmBtn"
                        :style="{ color: confirmColor }"
                        @click="handleConfirm"
                    >
                        <div>{{ confirmText }}</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, defineComponent, reactive, toRefs, watch } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    showCancelButton: {
        type: Boolean,
        default: true
    },
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: '内容'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    confirmColor: {
        type: String,
        default: '#409EFF'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    clickMaskToClose: {
        type: Boolean,
        default: false
    }, // 点击遮罩是否关闭弹框
    onConfirm: {
        type: Function,
        default: () => {}
    },
    onCancel: {
        type: Function,
        default: () => {}
    }
});

const isShowModal = ref(false);

const handleConfirm = () => {
    isShowModal.value = false;
    props?.onConfirm();
};
const handleCancel = () => {
    isShowModal.value = false;
    props?.onCancel?.();
};

watch(
    () => props.visible,
    (newVal, oldVal) => {
        isShowModal.value = newVal;
    },
    { immediate: true }
);
</script>

<style scoped>
.confirmModal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    z-index: 999;
    transform: translateZ(9999px);
    letter-spacing: 0;
    background: rgba(0, 0, 0, 0.3);
    .confirmModal-main {
        position: absolute;
        top: 40%;
        left: 50%;
        z-index: 1000;
        width: 300px;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px;
        .confirmModal-main-title {
            padding: 24px 28px 0 28px;
            font-size: 18px;
            line-height: 25px;
            color: #030303;
        }
        .confirmModal-main-content {
            font-size: 16px;
            line-height: 21px;
            color: #5e5f64;
            padding: 16px 24px 24px 24px;
        }
        .confirmModal-main-noTitle {
            font-size: 16px;
            padding: 28px;
            color: #333333;
        }
        .confirmModal-main-line {
            height: 1px;
            transform: scale(1, 0.5);
            background: #e8eaef;
        }
        .confirmModal-main-footer {
            width: 100%;
            display: flex;
            align-items: center;
            height: 52px;
            font-size: 16px;
            line-height: 52px;
            text-align: center;
            .confirmModal-main-footer-cancelBtn {
                flex: 1;
                color: #696d76;
                cursor: pointer;
            }
            .confirmModal-main-footer-line {
                width: 1px;
                height: 100%;
                transform: scale(0.5, 1);
                background: #e8eaef;
            }
            .confirmModal-main-footer-confirmBtn {
                position: relative;
                flex: 1;
                color: #409eff;
                cursor: pointer;
            }
        }
    }
}
</style>
