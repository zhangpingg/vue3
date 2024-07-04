<!--
 * @Author: zhangping
 * @Date: 2024-05-13 13:43:00
 * @Description: 登录的获取验证码组件
-->

<template>
    <div class="vc">
        <span
            :class="{
                'vc-defaultText': true,
                'vc-triggerText': isAllowTrigger,
            }"
            @click="getCode"
            v-if="!isObtainedCode"
        >
            获取验证码
        </span>
        <span
            :class="{
                'vc-defaultText': true,
                'vc-triggerText': surplusSecond === 0,
            }"
            v-if="isObtainedCode"
            @click="getCode"
        >
            重新获取<template v-if="surplusSecond > 0">{{ surplusSecond }}s</template>
        </span>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';

const codeDuration = 60;
const props = defineProps({
    // 是否可以触发-获取验证码
    isAllowTrigger: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['sendCode']);
const surplusSecond = ref(0);
const isObtainedCode = ref(false); // 是否已经获取过code
const isGetingCode = ref(false); // 是否正在获取code
const timer = ref(null);

// 获取验证码
const getCode = () => {
    if (!props.isAllowTrigger || isGetingCode.value) {
        return false;
    }
    emit('sendCode');
};
// 时间-倒计时
const countdown = () => {
    isObtainedCode.value = true;
    isGetingCode.value = true;
    surplusSecond.value = codeDuration;
    ElMessage({
        message: '验证码已发送',
        type: 'success',
        plain: true,
    });
    timer.value = setInterval(() => {
        surplusSecond.value = surplusSecond.value - 1;
        if (surplusSecond.value === 0) {
            clearInterval(timer?.value);
            surplusSecond.value = 0;
            isGetingCode.value = false;
        }
    }, 1000);
};

defineExpose({
    countdown,
});

onUnmounted(() => {
    clearInterval(timer?.value);
});
</script>

<style lang="less" scoped>
.vc {
    .vc-defaultText {
        color: #ccc;
    }
    .vc-triggerText {
        color: var(--el-color-primary);
        cursor: pointer;
    }
}
</style>
