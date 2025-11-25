// SSR 服务端渲染
// 启动：node server/uploadFolder.js
// 接口地址：http://localhost:9001/getData

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

//const express = require('express');
//const multer = require('multer');
//const path = require('path');
//const fs = require('fs');
//const cors = require('cors');

const app = express();
app.use(cors()); // 解决跨域
const port = 3001;

// 配置存储：根据前端传递的相对路径创建嵌套目录
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 关键：file.originalname 就是前端传递的完整嵌套路径
        const filePath = path.join(__dirname, 'uploads', path.dirname(file.originalname));
        // 递归创建目录（不存在则自动创建）
        fs.mkdirSync(filePath, { recursive: true });
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        // 保留原文件名
        cb(null, path.basename(file.originalname));
    }
});

const upload = multer({ storage });

// 处理单文件上传（Web Uploader 分片上传会自动合并）
app.post('/api/upload/folder', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '未接收文件' });
    }
    res.status(200).json({ message: '文件上传成功' });
});

// 启动服务
app.listen(port, () => {
    console.log(`后端服务启动：http://localhost:${port}`);
});
