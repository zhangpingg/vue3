<!--https://www.npmjs.com/package/vue-cropper-->

<template>
    <div class="ci">
        <div class="ci-cropper">
            <VueCropper
                ref="vueCropperRef"
                :img="cropperOption.img"
                :output-size="cropperOption.size"
                :output-type="cropperOption.outputType"
                :full="cropperOption.full"
                :can-move="cropperOption.canMove"
                :can-move-box="cropperOption.canMoveBox"
                :fixed-box="cropperOption.fixedBox"
                :original="cropperOption.original"
                :auto-crop="cropperOption.autoCrop"
                :auto-crop-width="cropperOption.autoCropWidth"
                :auto-crop-height="cropperOption.autoCropHeight"
                :center-box="cropperOption.centerBox"
                :high="cropperOption.high"
                @real-time="realTime"
            />
        </div>
        <div
            :style="{
                width: realTimeImgInfo.w + 'px',
                height: realTimeImgInfo.h + 'px',
                overflow: 'hidden',
                margin: '5px'
            }"
        >
            <div :style="realTimeImgInfo.div">
                <img :src="realTimeImgInfo.url" :style="realTimeImgInfo.img" />
            </div>
        </div>
        <div>
            <label class="ci-btn">
                上传
                <input
                    type="file"
                    style="position: absolute; display: none"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    @change="uploadImg"
                />
            </label>
            <button class="ci-btn" @click="refreshCrop">刷新重置</button>
            <button class="ci-btn" @click="changeScale(1)">图片放大 (+)</button>
            <button class="ci-btn" @click="changeScale(-1)">图片缩小 (-)</button>
            <button class="ci-btn" @click="rotateLeft">图片逆时针旋转 (90°)</button>
            <button class="ci-btn" @click="rotateRight">图片顺时针旋转 90°</button>
            <a class="ci-btn" @click="downloadImg('base64')">下载 (base64)</a>
            <a class="ci-btn" @click="downloadImg('blob')">下载 (blob)</a>
            <button class="ci-btn" @click="uploadCropImg">上传裁剪图片给后台</button>
        </div>
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { apiUploadCropImg } from '@/api/cropImg.js';
export default {
    components: { VueCropper },
    data() {
        return {
            cropperOption: {
                img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
                outputSize: 1, // 裁剪生成图片的质量 0.1 ~ 1
                full: true, // 是否输出原图比例的截图
                outputType: 'png', // 裁剪生成图片的格式
                original: false, // 上传图片按照原始比例渲染
                canMove: true, // 能否拖动图片
                autoCrop: true, // 是否自动生成截图框
                autoCropWidth: 300, // 只有自动截图开启 宽度高度才生效
                autoCropHeight: 300,
                centerBox: true, // 截图框是否限制在图片里(只有在自动生成截图框时才能生效)
                canMoveBox: true, // 能否拖动截图框
                fixedBox: false, // 是否固定截图框大小
                high: true // 是否根据dpr生成适合屏幕的高清图片
            },
            realTimeImgInfo: {} // 实时的图片信息
        };
    },
    methods: {
        // 上传图片
        uploadImg(e) {
            var file = e.target.files[0];
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
                return false;
            }
            var reader = new FileReader();
            reader.readAsArrayBuffer(file); // 1) Blob->ArrayBuffer
            // reader.readAsDataURL(file); // 2) Blob->data:URL格式的base64编码
            reader.onload = (e) => {
                let data;
                if (typeof e.target.result === 'object') {
                    // Blob->Blob URL
                    data = window.URL.createObjectURL(new Blob([e.target.result]));
                } else {
                    data = e.target.result;
                }
                this.cropperOption.img = data;
            };
        },
        // 刷新重置
        refreshCrop() {
            this.$refs.vueCropperRef.refresh();
        },
        // 缩放图片
        changeScale(num) {
            this.$refs.vueCropperRef.changeScale(num || 1);
        },
        // 图片逆时针旋转90°
        rotateLeft() {
            this.$refs.vueCropperRef.rotateLeft();
        },
        // 图片顺时针旋转90°
        rotateRight() {
            this.$refs.vueCropperRef.rotateRight();
        },
        // 下载图片
        downloadImg(type) {
            var a = document.createElement('a');
            a.download = '01';
            if (type === 'blob') {
                this.$refs.vueCropperRef.getCropBlob((data) => {
                    a.href = window.URL.createObjectURL(data);
                    a.click();
                });
            } else {
                this.$refs.vueCropperRef.getCropData((data) => {
                    a.href = data;
                    a.click();
                });
            }
        },
        // 实时预览函数
        realTime(data) {
            this.realTimeImgInfo = data;
        },
        // 上传图片给后台
        uploadCropImg() {
            vueCropperRef.value.getCropBlob(async (data) => {
                var fileName = 'example'; // 文件的基础名称
                var fileExtension = '.jpg'; // 文件的扩展名，根据实际情况调整
                var mimeType = 'image/jpeg'; // 文件的 MIME 类型，根据实际情况调整
                // 创建一个新的 File 对象，包含文件名和 MIME 类型
                var file = new File([data], fileName + fileExtension, { type: mimeType });
                var formData = new FormData();
                formData.append('file', file);
                const res = await apiUploadCropImg(formData);
                console.log('接口返回的图片地址:', res);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.ci {
    .ci-cropper {
        width: 500px;
        height: 500px;
    }
    .ci-btn {
        display: inline-block;
        line-height: 1;
        border: 1px solid #c0ccda;
        margin: 20px 10px 0px 0px;
        padding: 9px 15px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
    }
}
</style>
