import { ElNotification } from 'element-plus';
import log from './util.log';

const throwLogError = (msg) => {
    const err = new Error(msg);
    log.error('>>>>>> Error >>>>>>');
    throwNoticeError(err);
    throw err;
};

const throwNoticeError = (err) => {
    console.log('提示:', err.message || '报错了');
    ElNotification({
        type: 'error',
        title: '提示',
        message: err.message || '报错了',
        duration: 3000,
    });
};

export { throwLogError, throwNoticeError };
