<template>
    <div>
        {{ isValidVal(1) }} <br />
        {{ formatNum('12345678', 4, true) }} <br />
        plus方法：0.1 + 0.2 = {{ plus(0.1, 0.2) }} <br />
        {{ MOBILE_REG.test('18258261040') }}
    </div>
</template>

<script setup lang="ts">
import { utils } from 'zp-element-plus';
const { isValidVal, formatNum, plus, MOBILE_REG } = utils;
</script>
