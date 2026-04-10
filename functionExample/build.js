// 打包时自动增加项目版本号

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import simpleGit from 'simple-git';

const prompt = inquirer.createPromptModule();
const __filename = fileURLToPath(import.meta.url); // 当前文件路径
const __dirname = path.dirname(__filename); // 当前目录路径
const packagePath = path.join(__dirname, 'package.json'); // package.json 路径
const git = simpleGit(__dirname);

/**
 * 增加版本号
 * 规则：末位+1，如果末位达到99（即+1后为100），则末位归0，前一位+1，以此类推
 * @param {string} version - 当前版本号，例如 "1.2.99"
 * @returns {string} - 新版本号，例如 "1.3.0"
 */
const incrementVersion = (version) => {
    let parts = version.split('.').map(Number); // 分割版本号
    // 确保至少有三位 [major, minor, patch]，不足补0
    while (parts.length < 3) {
        parts.push(0);
    }
    // 从最后一位开始处理进位
    let carry = 1; // 初始进位为1，因为我们要加1
    for (let i = parts.length - 1; i >= 0; i--) {
        if (carry === 0) break;
        parts[i] += carry;
        // 判断是否达到进位条件 (>= 100)
        if (parts[i] >= 100) {
            parts[i] = 0;
            carry = 1;
        } else {
            carry = 0;
        }
    }
    // 如果最高位还有进位（例如 99.99.99 -> 100.0.0），需要在数组头部添加
    if (carry > 0) {
        parts.unshift(carry);
    }
    return parts.join('.'); // 拼接回字符串
};

// package.json中的版本号，上传代码
const uploadPackage = async () => {
    const res = await prompt([
        {
            type: 'list',
            message: '是否将新版本号上传至git仓库: ',
            name: 'isUploadToGit',
            choices: [
                { name: '否', value: 'No' },
                { name: '是', value: 'Yes' }
            ],
            default: 'No'
        }
    ]);
    if (res.isUploadToGit === 'Yes') {
        await git.add(packagePath); // 添加文件
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
        const commitMsg = `chore: 项目版本为 ${packageJson.version}`;
        await git.commit(commitMsg);
        await git.push();
        console.log('推送成功'.green);
    } else {
        console.log('跳过 Git 上传'.yellow);
    }
};

prompt([
    {
        type: 'list',
        message: '选择打包环境: ',
        name: 'buildEnv',
        choices: [
            { name: '测试', value: 'test' },
            { name: '生产', value: 'prod' }
        ],
        default: 'test'
    }
]).then((res) => {
    let newVersion = null;
    try {
        switch (res.buildEnv) {
            case 'test':
                execSync('vite build', { stdio: 'inherit' });
                console.log('【测试环境】打包成功'.green);
                break;
            case 'prod':
                // 修改版本
                try {
                    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8')); // 读取 package.json
                    newVersion = incrementVersion(packageJson.version);
                    packageJson.version = newVersion; // 更新 package.json
                    // 保持 JSON 格式美观，缩进2空格
                    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
                } catch (error) {
                    console.error('操作失败:', error.message);
                }
                // 打包
                execSync('vite build', { stdio: 'inherit' });
                console.log(`【生产环境】打包成功，新版本号为：${newVersion}`.green);
                // 上传package.json文件
                uploadPackage();
                break;
        }
    } catch (error) {
        console.log(`${colors.brightRed('打包失败')}`);
    }
});
