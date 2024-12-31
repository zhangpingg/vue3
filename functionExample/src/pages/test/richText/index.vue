<template>
    <div>
        <div ref="editorRef" id="editorId" min-height="200">
            <div v-html="realTimeContent"></div>
        </div>
        <input
            type="file"
            id="inputId"
            accept=".gif,.png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
            ref="inputRef"
            @change="changeFile"
            style="display: none"
        />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 主题样式
import 'quill/dist/quill.bubble.css'; // 气泡样式
import 'quill/dist/quill.core.css'; // 核心库样式
import { apiUploadCropImg } from '@/api/cropImg';

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
});

const inputRef = ref();
const realTimeContent = ref(''); // 实时的内容
const editorRef = ref();
const quillIns = ref();

// 初始化编辑器
const initEditor = () => {
    quillIns.value = new Quill('#editorId', {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                ['clean'],
                ['link', 'image', 'video']
            ]
        },
        placeholder: '请输入...',
        readOnly: false
    });
    // 点击富文本中的图片上传，就触发自己写的input上传图片
    quillIns.value.getModule('toolbar').addHandler('image', triggerInput);
    // 默认值
    realTimeContent.value = props.content;
    // change-输入框
    quillIns.value.on('text-change', () => {
        const html = editorRef.value.children[0].innerHTML;
        realTimeContent.value = html; // 更新值（方便保存的时候，父组件取值）
    });
};
// 触发自己写的input上传图片
const triggerInput = () => {
    inputRef.value.click();
};
// change-上传图片
const changeFile = async () => {
    try {
        let file = document.getElementById('inputId').files[0];
        var formData = new FormData();
        formData.append('file', file);
        //const res = await apiUploadCropImg(formData);
        const res = 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4';
        if (res) {
            // 调用富文本编辑器的 insertEmbed 方法，插入URL
            console.log(14, quillIns);
            console.log(15, quillIns.value.selection);
            //console.log(16, quillIns.value.insertEmbed);
            //let selectRange = quillIns.value.getSelection(); // 选择的范围：{index:10, length: 0}
            //console.log(14, selectRange);
            //quillIns.value.insertEmbed(selectRange !== null ? selectRange.index : 0, 'image', res);
            quillIns.value.insertEmbed(0, 'image', res);
        }
    } catch (error) {
        console.log('上传失败');
    }
};

watch(
    () => props.content,
    (newVal) => {
        if (newVal !== realTimeContent.value) {
            realTimeContent.value = newVal;
        }
    },
    { immediate: true }
);
defineExpose({ realTimeContent });
onMounted(() => {
    initEditor();
});
</script>

<style lang="less">
.ql-snow img {
    display: block;
}
// quill 样式汉化
.ql-snow .ql-tooltip[data-mode='link']::before {
    content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
    content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: '等宽字体';
}
</style>
