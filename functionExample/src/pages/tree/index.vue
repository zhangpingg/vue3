<!--
* @Author: zhangping
* @Date: 2025-11-26 15:44:44
* @Description: （自动/手动）懒加载子节点，设置节点背景色
-->

<template>
    <div>
        <el-tree
            ref="elTreeRef"
            node-key="id"
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            :data="treeData"
            @node-click="nodeClick"
            style="max-width: 600px"
        >
            <template #default="{ node, data }">
                <span :class="['e-1', `node-${data.id}`]">{{ data.label }}</span>
            </template>
        </el-tree>

        <el-button @click="openNode('1')">手动加载【所有文件】下的节点，并展开</el-button>
        <el-button @click="openNode('1-2')">手动加载【节点1-2】下的节点，并展开</el-button>
        <el-button @click="getTree">获取tree数据</el-button>
        <el-button @click="highLightBg('1-2')">高亮背景色</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const elTreeRef = ref(null);
const treeData = ref([]);

// lazy模式：一定要这么写，不然isLeaf不生效
const props = {
    isLeaf: 'isLeaf'
};

// 获取子节点列表
const getChildNodeList = (idIndex) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: `${idIndex}-1`, label: `节点${idIndex}-1`, isLeaf: true },
                { id: `${idIndex}-2`, label: `节点${idIndex}-2`, children: [] },
                { id: `${idIndex}-3`, label: `节点${idIndex}-3`, children: null }
            ]);
        }, 500);
    });
};
// 懒加载子节点
const loadNode = async (node, resolve) => {
    if (node.level === 0) {
        return resolve([{ id: '1', label: '所有文件' }]);
    }
    const res = await getChildNodeList(node.id);
    resolve(res);
};
// 手动打开tree节点
const openNode = async (nodeId) => {
    const node = elTreeRef.value.getNode(nodeId);
    if (!node) return;
    // 非刷新数据且已经加载过了，可以直接展开
    if (node.loaded) {
        node.expand();
        return;
    }
    // 手动调用loadNode
    node.childNodes = []; // 清空，防止数据重复
    await new Promise((resolve) => {
        loadNode(node, (children) => {
            node.doCreateChildren(children);
            node.loaded = true;
            resolve();
        });
    });
    node.expand(); // 展开节点
};
// 获取tree
const getTree = () => {
    const rootNodes = elTreeRef.value.store.root.childNodes;
    // 递归获取节点数据
    const getNodeData = (node) => {
        return {
            id: node.key,
            label: node.label,
            children: node.childNodes ? node.childNodes.map(getNodeData) : [],
            isLeaf: node.isLeaf
        };
    };
    // 获取所有根节点及其子节点数据
    const treeStructure = rootNodes.map(getNodeData);
    console.log('树形结构数据:', treeStructure);
};
// 高亮背景色
const highLightBg = (id) => {
    setTreeNodeBgColor(id);
};
// 点击节点
const nodeClick = (data) => {
    setTreeNodeBgColor(data.id);
};
// 设置tree节点背景色
const setTreeNodeBgColor = (id, treeType = 'index') => {
    const currentDom = document.querySelector(`.node-${id}`)?.parentNode;
    const lastDom = document.querySelector(`.${treeType}-node`);
    if (lastDom) {
        lastDom.classList.remove(`${treeType}-node`);
        lastDom.style.background = '';
    }
    if (currentDom) {
        currentDom.classList.add(`${treeType}-node`);
        currentDom.style.background = '#ccc';
    }
};
</script>

<style lang="scss" scoped></style>
