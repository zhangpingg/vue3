<template>
    <div class="login">
        <div class="login-container">
            <div class="login-container-main">
                <div class="login-container-main-content">
                    <div class="lcmc-header mb-30">
                        <img src="@/assets/images/login-logo.png" alt="logo" />
                        <div class="lcmc-header-desc mt-20">你好！欢迎登录中策供应商审核后台</div>
                    </div>
                    <el-form
                        ref="formRef"
                        style="max-width: 600px"
                        :model="formData"
                        :rules="formRules"
                        label-width="auto"
                        class="lcmc-footer"
                        size="large"
                        :hide-required-asterisk="true"
                    >
                        <el-form-item label="手机号" prop="phone">
                            <el-input
                                v-model="formData.phone"
                                :maxlength="11"
                                placeholder="请输入手机号"
                                @input="inputPhone"
                            />
                        </el-form-item>
                        <el-form-item label="验证码" prop="code" class="pr">
                            <el-input
                                v-model="formData.code"
                                placeholder="请输入短信验证码"
                                @keyup.enter="submitForm(formRef)"
                            />
                            <ValidateCode
                                ref="validateCodeRef"
                                class="lcmc-footer-code"
                                :isAllowTrigger="isAllowTriggerCode"
                                @sendCode="sendCode"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :disabled="submitLoading"
                                @click="submitForm(formRef)"
                                class="lcmc-footer-submit"
                            >
                                {{ submitLoading ? '登录中...' : '立即登录' }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Cookies from 'js-cookie';
import ValidateCode from '@/components/validateCode/index.vue';
import { usePageStore } from '@/store';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { checkPhone } from './const';
import { MOBILE_REG } from '@/libs/util.regular';
import { apiLoginAuthSystem, apiSendSms } from '@/api/account';
import Setting from '@/globalSetting';
import { frameIn } from '@/router/routes';
import { requestUser } from '@/libs/util.request';

const router = useRouter();
const pageStore = usePageStore();

const formRef = ref();
const formData = reactive({});
const formRules = reactive({
    phone: [{ validator: checkPhone, trigger: 'blur' }],
    code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
});
const isAllowTriggerCode = ref(false);
const submitLoading = ref(false);
const validateCodeRef = ref(null);

// change-手机号
const inputPhone = () => {
    if (!formData?.phone || !MOBILE_REG.test(formData?.phone)) {
        isAllowTriggerCode.value = false;
    } else {
        isAllowTriggerCode.value = true;
    }
};
// 发送-验证码
const sendCode = async () => {
    await apiSendSms({ mobile: formData.phone, smsEnum: 'LOGIN_' });
    validateCodeRef.value?.countdown();
};
// 登录
const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            try {
                submitLoading.value = true;
                //const loginRes = await apiLoginAuthSystem({ mobile: formData.phone, password: formData.code });
                const loginRes = { accessToken: 'xxxxxxx' };
                ElMessage({
                    plain: true,
                    type: 'success',
                    message: '登录成功！',
                });
                Cookies.set('token', loginRes.accessToken, { expires: Setting.cookiesExpires });
                await requestUser();
                pageStore.setRoutePool(frameIn || []);
                submitLoading.value = false;
                if (router.currentRoute.value.query.redirect) {
                    if (router.currentRoute.value.redirectedFrom) {
                        const { path, query } = router.currentRoute.value.redirectedFrom;
                        router.push({ path, query });
                    } else {
                        router.push({ path: router.currentRoute.value.query.redirect });
                    }
                } else {
                    router.push({ path: '/home' });
                }
            } catch (err) {
                submitLoading.value = false;
            }
        }
    });
};
</script>

<style lang="less" scoped>
.login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    &:before {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(#4b3dfa, #1273fe);
    }
    .login-container {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        overflow: auto;
        position: relative;
        background: #1797d3 url('@/assets/images/logo-bg.jpg') no-repeat 50% 50%;
        background-size: 100% 100%;
        border-radius: 20px;
        @media screen and (max-width: 992px) {
            background: none;
        }
        .login-container-main {
            width: 1080px;
            height: 600px;
            margin: auto;
            background: url('@/assets/images/login-main-bg.jpg') no-repeat 50% 50%;
            background-size: 100% 100%;
            border-radius: 8px;
            padding-left: 480px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            .login-container-mian-result {
                width: 100%;
            }
            @media screen and (max-width: 992px) {
                width: 90%;
                height: 550px;
                margin: auto;
                background: #ffff;
                padding-left: 0;
            }
            .ivu-global-footer {
                bottom: 50px;
                width: 360px;
                margin-bottom: 0;
                position: absolute;
            }
        }
        .login-container-main-content {
            background: #fff;
            width: 368px;
            margin: 0 auto;
            @media screen and (max-width: 992px) {
                width: 80%;
                margin: auto;
            }
            .lcmc-header {
                width: 100%;
                .lcmc-header-logo {
                    img {
                        width: 100%;
                        max-width: 394px;
                        display: block;
                        margin: 0 auto 29px;
                    }
                }
                .lcmc-header-desc {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.67);
                    text-align: left;
                    b {
                        color: #333;
                    }
                }
            }
            .lcmc-footer {
                .lcmc-footer-submit {
                    width: 100%;
                }
                .lcmc-footer-code {
                    position: absolute;
                    top: 0;
                    right: 10px;
                }
            }
        }
    }
    :deep(.el-form-item__label-wrap) {
        width: 0;
    }
}
</style>
