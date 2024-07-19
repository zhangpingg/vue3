# 确保脚本抛出遇到的错误（当 set -e 被设置后,Shell脚本会变得更为严格：如果脚本中的任何命令退出状态非零(即命令失败),Shell将立即终止整个脚本的执行）
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/zhangpingg/vue3.git master:gh-pages

# 切换当前工作目录到上一个工作目录
cd -
