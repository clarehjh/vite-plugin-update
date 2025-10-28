// scripts/build.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

async function buildProject() {
  console.log('🧹 清空 dist 目录...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 删除旧的压缩包
  if (fs.existsSync('package.zip')) {
    fs.unlinkSync('package.zip');
  }

  console.log('🚀 使用 tsup 构建...');
  execSync('tsup src/index.ts --dts --format cjs,esm', { stdio: 'inherit' });

  console.log('📦 创建完整的压缩包...');
  await createCompleteZip();

  console.log('🎉 构建完成！');
}

function createCompleteZip() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('package.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log(`✓ 压缩包创建完成: ${archive.pointer()} 字节`);
      console.log('📁 包含的文件:');
      console.log('   - dist/ (构建输出)');
      console.log('   - README.md');
      console.log('   - LICENSE');
      console.log('   - package.json');
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // 添加 dist 目录
    if (fs.existsSync('dist')) {
      archive.directory('dist/', 'dist');
    }

    // 添加根目录文件
    const rootFiles = ['README.md', 'LICENSE', 'package.json'];
    rootFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        archive.file(file, { name: file });
      }
    });

    archive.finalize();
  });
}

buildProject().catch(console.error);
