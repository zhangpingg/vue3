// @ts-nocheck
// 图片请求失败时，或图片太大时，展示默认图片

const realImgDirective = {
    async beforeMount(el, binding) {
        const imgURL = binding.value;
        if (imgURL) {
            const exist = await imageIsExist(imgURL);
            exist && el.setAttribute("src", imgURL);
        }
        // 判断一个图片是否存在, 注意是异步行为
        function imageIsExist(url) {
            return new Promise((resolve) => {
                let img = new Image();
                img.src = url;
                img.onload = () => {
                    if (img.complete) {
                        resolve(true);
                        img = null;
                    }
                };
                img.onerror = () => {
                    resolve(false);
                    img = null;
                };
            });
        }
    },
};

export { realImgDirective };
