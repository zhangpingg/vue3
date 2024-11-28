import path from 'path';
import fs from 'fs';

const checkVersion = () => {
    return {
        name: 'vite-plugin-check-version',
        buildStart() {
            const now = new Date().getTime();
            const version = {
                version: now
            };
            const versionPath = path.join(__dirname, '../../public/versionData.json');
            fs.writeFileSync(versionPath, JSON.stringify(version), 'utf8', (err) => {
                if (err) {
                    console.log('写入失败');
                } else {
                    console.log('写入成功');
                }
            });
        }
    };
};

export { checkVersion };
