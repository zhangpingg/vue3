/**
 * @description 判断-是否是有效的数据
 * @param {any} val 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidVal = (val) => {
    if ([null, undefined, ''].includes(val)) {
        return false;
    }
    return true;
};

/**
 * @description 浏览器下载文件
 * @param {String} url 文件地址/文件流
 * @param {String } fileName 文件名（文件流必传）
 * @param {Boolean } isFileStream 是否是文件流
 */
const downloadFile = (url, fileName, isFileStream = false) => {
    const downloadByBlob = (blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName || url.split('/').pop().split('?')[0];
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
    };
    if (isFileStream) {
        const blob = new Blob([url], { type: 'application/octet-stream' });
        downloadByBlob(blob);
        return;
    }
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.blob();
        })
        .then((blob) => {
            downloadByBlob(blob);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
};

/**
 * @description 预览文件
 * @param {String} fileUrl 文件地址
 * @param {String} menuTitle 菜单的title，只有需要菜单预览的时候才需要传，如doc，docx，xls，xlsx
 * @param {router} router 路由全局对象
 */
const previewFile = (fileUrl, menuTitle, router) => {
    //const _list = fileUrl.split('.');
    //const extension = _list[_list.length - 1];
    //if (imgPreviewTypes.includes(extension)) {
    //    viewerApi({
    //        options: {
    //            toolbar: true,
    //            initialViewIndex: 0
    //        },
    //        images: [fileUrl]
    //    });
    //} else if (menuPreviewTypes.includes(extension)) {
    //    switch (extension) {
    //        case 'doc':
    //            apiConvertFileType({ fileUrl }).then((res) => {
    //                router.push({ path: '/previewFile', query: { url: res, title: menuTitle } });
    //            });
    //            break;
    //        case 'docx':
    //            router.push({ path: '/previewFile', query: { url: fileUrl, title: menuTitle } });
    //            break;
    //        case 'xls':
    //            apiConvertFileType({ fileUrl }).then((res) => {
    //                router.push({ path: '/previewFile', query: { url: res, title: menuTitle } });
    //            });
    //            break;
    //        case 'xlsx':
    //            router.push({ path: '/previewFile', query: { url: fileUrl, title: menuTitle } });
    //            break;
    //        default:
    //            break;
    //    }
    //} else {
    //    window.open(fileUrl, '_blank');
    //}
};

/**
 * @description 是否允许查看
 * @param {String} fileUrl 文件地址
 * @param {Array} allowTypes 允许查看的文件类型数组
 */
const isAllowPreview = (fileUrl, allowTypes) => {
    const _list = fileUrl?.split('.') || [];
    const extension = _list[_list.length - 1];
    if (allowTypes.includes(extension)) {
        return true;
    }
    return false;
};

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

export { isValidVal, downloadFile, previewFile, isAllowPreview, transToMergeCellList };
