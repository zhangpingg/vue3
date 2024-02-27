// 控制按钮权限，不需要 v-show/v-if 来一一判断

var ownPermission = ["user", "order"];

// 判断是否有按钮权限
const isHasPermission = (el, permission) => {
    if (permission && !ownPermission.includes(permission)) {
        el.parentNode && el.parentNode.removeChild(el); // 没有权限则删除元素
    }
};

const permissionDirective = {
    mounted(el, binding) {
        isHasPermission(el, binding.value);
    },
    updated(el, binding) {
        isHasPermission(el, binding.value);
    },
};

export { permissionDirective };
