import _ from 'lodash';
import { useRoute } from 'vue-router';
import { usePageStore, usePageDataStore } from '@/store';
import { api as viewerApi } from 'v-viewer';
import { apiConvertFileType } from '@/api/common';
import Setting from '@/globalSetting';

const pageStore = usePageStore();
const pageDataStore = usePageDataStore();
const { imgPreviewTypes, menuPreviewTypes } = Setting;
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
 * @description 判断-是否是有效的非空数组
 * @param {any} list 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidArr = (list) => {
    if (_.isArray(list) && !_.isEmpty(list)) {
        return true;
    }
    return false;
};
/**
 * @description 清空无效的key，删除对象中value为 null, undefined，'', 空数组的 key
 * @param {Object} data 传入的对象
 * @param {Boolean} isCLearEmptyArray 是否删除空数组
 * @returns {Object} 返回value有值的key对象
 */
const clearInvalidKey = (data, isCLearEmptyArray = true) => {
    let _data = { ...data };
    for (let key in _data) {
        if (
            _data[key] === '' ||
            _data[key] === null ||
            _data[key] === 'null' ||
            _data[key] === undefined ||
            _data[key] === 'undefined'
        ) {
            delete _data[key];
        }
        if (isCLearEmptyArray && _.isArray(data[key]) && _.isEmpty(data[key])) {
            delete _data[key];
        }
    }
    return _data;
};

/**
 * @description 预览文件
 * @param {String} fileUrl 文件地址
 * @param {String} menuTitle 菜单的title，只有需要菜单预览的时候才需要传，如doc，docx，xls，xlsx
 * @param {router} router 路由全局对象
 */
const previewFile = (fileUrl, menuTitle, router) => {
    const _list = fileUrl.split('.');
    const extension = _list[_list.length - 1];
    if (imgPreviewTypes.includes(extension)) {
        viewerApi({
            options: {
                toolbar: true,
                initialViewIndex: 0,
            },
            images: [fileUrl],
        });
    } else if (menuPreviewTypes.includes(extension)) {
        switch (extension) {
            case 'doc':
                apiConvertFileType({ fileUrl }).then((res) => {
                    router.push({ path: '/previewFile', query: { url: res, title: menuTitle } });
                });
                break;
            case 'docx':
                router.push({ path: '/previewFile', query: { url: fileUrl, title: menuTitle } });
                break;
            case 'xls':
                apiConvertFileType({ fileUrl }).then((res) => {
                    router.push({ path: '/previewFile', query: { url: res, title: menuTitle } });
                });
                break;
            case 'xlsx':
                router.push({ path: '/previewFile', query: { url: fileUrl, title: menuTitle } });
                break;
            default:
                break;
        }
    } else {
        window.open(fileUrl, '_blank');
    }
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
 * @description 转换为合并单元格数据列表，添加【**RowSpan】字段，transToNergeCellList(list, ['a', 'b'])
 * @param {Array} 列表数据
 * @param {Array } 需要合并的字段key列表
 */
const transToNergeCellList = (dataList, strList) => {
    let _dataList = [...dataList];
    const mergeCell = (cellList, mergeType) => {
        const mergeTypeMap = cellList.reduce((prev, curr) => {
            const prevX = { ...prev };
            if (prevX[curr[mergeType]]) {
                prevX[curr[mergeType]].count += 1;
            } else {
                prevX[curr[mergeType]] = {
                    count: 1,
                    selected: false,
                };
            }
            return prevX;
        }, {});
        const newList = cellList.map((item) => {
            if (mergeTypeMap[item[mergeType]].selected) {
                return {
                    ...item,
                    [`${mergeType}RowSpan`]: 0,
                };
            }
            mergeTypeMap[item[mergeType]].selected = true;
            return {
                ...item,
                [`${mergeType}RowSpan`]: mergeTypeMap[item[mergeType]].count,
            };
        }, []);
        return newList;
    };
    strList.forEach((item) => {
        _dataList = mergeCell(_dataList, item);
    });
    return _dataList;
};

/**
 * @description 判断-是否需要重置详情页面数据
 * @param {String} detailName 详情页面的路由name
 * @param {Object} query 传入的详情页面参数
 * @returns {Number} 返回 0-不重置页面,取缓存数据 1-重置页面,即重新获取数据
 */
const isResetDetail = (detailName, query) => {
    let menuList = pageStore.pageInfo.openedTabList.filter((item) => item.name === detailName);
    let isReset = 0;
    if (menuList.length === 0) {
        isReset = 1;
    } else {
        let _queryList = Object.keys(query).map((key) => {
            return { [key]: String(query[key]) };
        });
        let _query = clearInvalidKey(Object.assign({}, ..._queryList));
        let _oldQuery = menuList[0].query;
        delete _oldQuery.isReset;
        if (_.isEqual(_oldQuery, _query)) {
            isReset = 0;
        } else {
            isReset = 1;
        }
    }
    return isReset;
};

/**
 * @description 校验list中每一项obj的每一个字段都必填
 * @param {Array} list
 * @returns {boolean} true校验成功 false校验失败
 */
const checkListNoEmptyValues = (list) => {
    return list.every((obj) => {
        return Object.values(obj).every((value) => value !== null && value !== '' && value !== undefined);
    });
};

/**
 * 获取url的query参数
 * @returns {object} url的参数对象
 */
const getUrlQuery = () => {
    const url = window.location.href;
    if (url.indexOf('?') < 0) {
        return '暂无参数';
    }
    return formatData(joinParam(url));

    function joinParam(url) {
        const _obj = {};
        url.split('?')[1]
            .split('&')
            .forEach((item) => {
                let _key = item.split('=')[0];
                let _val = item.split('=')[1];
                if (_obj[_key]) {
                    _obj[_key].push(decodeURI(_val));
                } else {
                    _obj[_key] = [decodeURI(_val)];
                }
            });
        return _obj;
    }
    function formatData(obj) {
        for (let key in obj) {
            if (obj[key].length === 1) {
                obj[key] = obj[key][0];
            }
        }
        return obj;
    }
};

// 页面滚动事件
const pageScrollFn = (event, route) => {
    pageDataStore.setPageData('pageScrollPosition', {
        ...pageDataStore.pageData.pageScrollPosition,
        [route.name]: event.target.scrollTop,
    });
};
// 设置页面滚动距离0
const setPageScrollZero = () => {
    var blMain = document.getElementsByClassName('bl-main')[0];
    blMain.scrollTop = 0;
};
// 设置页面滚动距离
const setPageScrollPosition = () => {
    const route = useRoute();
    var blMain = document.getElementsByClassName('bl-main')[0];
    blMain.scrollTop = pageDataStore.pageData.pageScrollPosition?.[route.name] || 0;
    Promise.resolve().then(() => {
        blMain?.addEventListener('scroll', (event) => {
            pageScrollFn(event, route);
        });
    });
};
// 移除页面滚动监听
const removePageScrollListener = () => {
    const scrollbarList = document.querySelectorAll('.el-table__body-wrapper .el-scrollbar__thumb');
    Array.from(scrollbarList || []).forEach((item) => {
        if (item) {
            item.style.transform = 'translateX(0%)';
        }
    });
    var blMain = document.getElementsByClassName('bl-main')[0];
    blMain?.removeEventListener('scroll', pageScrollFn);
};

export {
    isValidVal,
    isValidArr,
    clearInvalidKey,
    previewFile,
    downloadFile,
    transToNergeCellList,
    isResetDetail,
    checkListNoEmptyValues,
    getUrlQuery,
    setPageScrollZero,
    setPageScrollPosition,
    removePageScrollListener,
};
