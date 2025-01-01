<template>
    <div>
        <!--<Quill ref="quillRef" v-model="content" min-height="200" />-->
        <div ref="editorRef" id="editorId" min-height="200"></div>
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
<script>
//import Quill from '@/components/quill';
// import { uploadImage } from '@/api/upload';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    //components: { Quill },
    props: {
        content: String
    },
    data() {
        return {
            quillIns: null,
            realTimeContent: '' // 当前的内容
        };
    },
    watch: {
        // 数据回显
        content: {
            handler(val) {
                if (val !== this.realTimeContent) {
                    this.realTimeContent = val;
                    if (this.quillIns) {
                        this.quillIns.pasteHTML(val);
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.init();
        // 点击富文本中的图片上传，就触发自己写的input上传图片
        this.quillIns.getModule('toolbar').addHandler('image', this.triggerInput);
    },
    beforeDestroy() {
        // 在组件销毁后销毁实例
        this.quillIns = null;
    },
    methods: {
        // 初始化
        init() {
            this.quillIns = new Quill('#editorId', {
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
                placeholder: '内容...',
                readOnly: false
            });
            // 默认值
            console.log(11, this.quillIns);
            // this.quillIns.pasteHTML(this.realTimeContent);
            // change-输入框
            this.quillIns.on('text-change', (delta, oldDelta, source) => {
                const html = this.$refs.editorRef.children[0].innerHTML;
                this.realTimeContent = html; // 更新内部的值
            });
        },
        // 触发自己写的input上传图片
        triggerInput() {
            this.$refs['inputRef'].click();
        },
        // change-上传图片
        async changeFile() {
            try {
                let file = document.getElementById('inputId').files[0];
                // const res = await uploadImage(file);
                const res = 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4';
                let picUrl = res;
                if (picUrl) {
                    // 调用富文本编辑器的 insertEmbed 方法，插入URL
                    let selectRange = this.quillIns.getSelection(); // 选择的范围：{index:10, length: 0}
                    this.quillIns.insertEmbed(selectRange !== null ? selectRange.index : 0, 'image', picUrl);
                }
            } catch (error) {
                this.$Notice.error({
                    title: '上传失败',
                    desc: err
                });
            }
        }
    }
};
</script>

<style lang="less">
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

