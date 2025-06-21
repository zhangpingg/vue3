<template>
    <div class="box"><Button @click="createDownloadPDF">生成并下载PDF</Button><br /><br /></div>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import headImg from './head.jpg';

// 生成并下载PDF
const createDownloadPDF = () => {
    const doc = new jsPDF();
    // 1)文字
    doc.text('Hello World', 0, 10); // 指定坐标
    // 2)图片
    const { width, height } = doc.getImageProperties(headImg);
    doc.addImage({
        imageData: headImg,
        x: 10,
        y: 20,
        width: 50,
        height: (height * 50) / width // 根据新的宽度按比例计算高度
    });
    // 3)表格
    doc.table(
        10,
        100,
        [
            { Name: 'A', Age: '18' },
            { Name: 'B', Age: '20' }
        ],
        ['Name', 'Age'],
        { fontSize: 10 }
    );
    doc.save('aa.pdf'); // 保存到本地，并命名为 aa.pdf
};
</script>

<style lang="less" scoped></style>
