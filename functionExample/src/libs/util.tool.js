/**
 * @description 转换成合并单元格的列表
 * @param {Array} dataList  原本的列表
 * @param {Array} list 需要合并单元格的列，所对应的字符串列表
 * @return {Array} 拼接好需要合并的列，返回完整的列表
 */
const transToMergeCellList = (dataList, strList) => {
    let _dataList = [...dataList];
    strList.forEach((item) => {
        _dataList = mergeCell(_dataList, item);
    });
    // 合并单元格
    function mergeCell(cellList, mergeType) {
        const mergeTypeMap = cellList.reduce((prev, curr) => {
            const prevX = { ...prev };
            if (prevX[curr[mergeType]]) {
                prevX[curr[mergeType]].count += 1;
            } else {
                prevX[curr[mergeType]] = {
                    count: 1,
                    selected: false
                };
            }
            return prevX;
        }, {});
        const newList = cellList.map((item) => {
            if (mergeTypeMap[item[mergeType]].selected) {
                return {
                    ...item,
                    [`${mergeType}RowSpan`]: 0
                };
            }
            mergeTypeMap[item[mergeType]].selected = true;
            return {
                ...item,
                [`${mergeType}RowSpan`]: mergeTypeMap[item[mergeType]].count
            };
        }, []);
        return newList;
    }
    return _dataList;
};

export { transToMergeCellList };
