<template>
    <div>
        <el-select v-model="idList" placeholder="请选择" multiple style="width: 240px" @change="changeFn">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                <span :class="item.paranetId ? 'pl-20' : null">{{ item.name }}</span>
            </el-option>
        </el-select>
        <el-button type="primary" @click="save">保存</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const idList = ref([]);
const options = ref([
    { id: '1', name: '人员' },
    { id: '1-1', paranetId: '1', name: '张三' },
    { id: '1-2', paranetId: '1', name: '李四' },
    { id: '2', name: '动物' },
    { id: '2-1', paranetId: '2', name: '小猫' },
    { id: '2-2', paranetId: '2', name: '小狗' }
]);

const changeFn = (ids) => {
    let _selectedId = ids[ids.length - 1]; // 当前选中的id
    let _item = options.value.find((item) => item.id === _selectedId); // 当前选中的项
    if (!!_item.paranetId) {
        // 选中的是子级项
        let _idList = idList.value.filter((id) => id !== _item.paranetId); // 删除父级id
        idList.value = _idList;
    } else {
        // 选中的是父级项：所有该父级项下面的所有子级
        let _childIdList = options.value.filter((item) => _item.id === item.paranetId).map((item) => item.id);
        let _idList = idList.value.filter((id) => !_childIdList.includes(id));
        idList.value = _idList;
    }
};

const save = () => {
    console.log(idList.value);
};
</script>
