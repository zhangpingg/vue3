<template>
    <div class="home">
        <div class="home-main">
            <img src="@/assets/images/home-logo.png" alt="logo" class="home-main-logo" />
            <p style="width: 100%" />
            <img src="@/assets/images/home-tips.png" alt="logo" class="home-main-tips" />
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="less">
.home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #43536c url('../../assets/images/home-bg.jpg') no-repeat 50% 50%;
    background-size: 100% 100%;
    flex-wrap: wrap;
    .home-main {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        height: 193px;
        margin-bottom: 150px;
        img {
            max-width: 80%;
            display: block;
            margin: 0 auto;
        }
        .home-main-logo {
            width: 590px;
            margin: auto 150px;
        }
        .home-main-tips {
            width: 915px;
        }
    }
}
</style>
