/**
 * 基于 dist/ 生成 Firefox 专用 zip
 *
 * 做两件事：
 * 1. 复制 dist/ 到临时目录
 * 2. 修改 manifest.json：加 browser_specific_settings.gecko，background 改用 scripts
 * 3. 打包成 bai-it-firefox-v{版本号}.zip
 *
 * 用法：node scripts/package-firefox.mjs
 */

import { cpSync, readFileSync, writeFileSync, rmSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const root = join(import.meta.dirname, "..");
const distDir = join(root, "dist");
const firefoxDir = join(root, "dist-firefox");

// 1. 复制 dist → dist-firefox
rmSync(firefoxDir, { recursive: true, force: true });
mkdirSync(firefoxDir, { recursive: true });
cpSync(distDir, firefoxDir, { recursive: true });

// 2. 修改 manifest.json
const manifest = JSON.parse(readFileSync(join(firefoxDir, "manifest.json"), "utf-8"));

// 加 gecko 设置
manifest.browser_specific_settings = {
  gecko: {
    id: "bait@capeaga.com",
    strict_min_version: "109.0",
  },
};

// background: service_worker → scripts
if (manifest.background?.service_worker) {
  const scriptFile = manifest.background.service_worker;
  manifest.background = {
    scripts: [scriptFile],
    type: manifest.background.type,
  };
}

writeFileSync(join(firefoxDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// 3. 打包
const version = manifest.version;
const zipName = `bai-it-firefox-v${version}.zip`;
execSync(`cd "${firefoxDir}" && zip -r "${join(root, zipName)}" .`);

// 4. 清理临时目录
rmSync(firefoxDir, { recursive: true, force: true });

console.log(`Firefox package: ${zipName}`);
