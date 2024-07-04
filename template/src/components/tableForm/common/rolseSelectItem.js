import { reactive } from 'vue';
import { apiGetAllRole } from '@/api/systemSetting';

// 【角色】
const roleSelectItem = reactive({
    type: 'select',
    label: '角色',
    prop: 'roleId',
    options: [],
});
// 获取所有角色列表
const getRoleList = async () => {
    const res = await apiGetAllRole();
    roleSelectItem.options = res.map((item) => ({ label: item.roleName, value: item.id }));
};
getRoleList();

export { roleSelectItem };
