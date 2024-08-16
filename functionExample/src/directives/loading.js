// loading

const loadingDirective = {
    beforeMount(el) {
        el.$instance = document.createElement('div');
        el.$instance.setAttribute('class', 'loadingWrap');
        const text = el.getAttribute('loading-text') || '加载中...';
        el.$instance.innerHTML = createLoadingInn(text);
    },
    updated(el, binding) {
        if (binding.oldValue !== binding.value) {
            toggleLoading(el, binding);
        }
    },
    unmounted(el, binding) {
        el.$domInserted && toggleLoading(el, { value: false, modifiers: binding.modifiers });
        el.$instance && (el.$instance = null);
    }
};

// 获取元素的相关CSS
function getStyle(el, attr) {
    return el.currentStyle ? el.currentStyle[attr] : window.getComputedStyle(el, false)[attr];
}

// 切换loading的显示与隐藏
function toggleLoading(el, binding) {
    if (binding.value) {
        insertDom(el, el.$instance, binding);
    } else {
        el.$instance.parentNode && el.$instance.parentNode.removeChild(el.$instance);
    }
}

// 插入loading Dom
function insertDom(el, instance) {
    // 给父级添加relative
    if (!['fixed', 'absolute', 'relative'].includes(getStyle(el, 'position'))) {
        el.style.position = 'relative';
    }
    el.appendChild(instance); // 插入dom
    el.domInserted = true; // 表明dom已插入
}

// 生成loading内部结构
function createLoadingInn(text = '') {
    // 创建CSS
    const loadingInnCSS = `
        .loadingWrap{
            text-align:center;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            .loading-circular {
                height: 40px;
                width: 40px;
                animation: loading-rotate 2s linear infinite;
                text-algin:center;
                .loading-circular-path {
                    stroke-dasharray: 90, 150;
                    stroke-dashoffset: 0;
                    stroke-width: 2px;
                    stroke: #409eff;
                    stroke-linecap: round;
                  }
              }
            .loading-text {
                display: block;
            }
        }
        @keyframes loading-rotate {
            100% {
              transform: rotate(360deg);
            }
          }
    `;
    // 创建DOM
    const loadingInnHTML = `
        <svg class="loading-circular" viewBox="25 25 50 50">
        <circle class="loading-circular-path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        ${text ? '<span class="loading-text">' + text + '</span>' : ''}
    `;
    // 把CSS直接插入页面中
    const styleNode = document.createElement('style');
    styleNode.setAttribute('type', 'text/css');
    styleNode.innerHTML = loadingInnCSS;
    let headNode = document.querySelector('head');
    headNode.appendChild(styleNode);

    return loadingInnHTML;
}

export { loadingDirective };
