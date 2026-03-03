# 掰it — 交接状态

> 每个 session 开始时先看这个文件，结束时更新它。

## 当前状态

**Step 1-9 + 管理端示例数据 + 提示条编码完成**。189 个单元测试全通过，构建正常。待人工确认引导态视觉效果。

### 本次完成

1. **管理端示例数据 + 提示条 — 编码** — 新建 3 文件 + 修改 8 文件，实现三种状态自动切换

### 上次 session 完成

1. 管理端引导页 — 产品讨论、设计讨论、验收标准、技术方案全部完成
2. 修复扫读模式拆分过少 + background 报错 + Tooltip 样式优化
3. 图标重做 + 状态指示改为绿点 + 修复图标状态不同步 bug
3. 品牌升级：全局改名 OpenEn → 掰it + Popup UI 暗色主题改造
4. Step 9 Options 页面（React 18, 4 Tab, 多 Provider 配置）

### 注意事项

- **IndexedDB 数据库名保持 `openen-data` / `openen-cache`**，改名会丢失已有用户数据
- **词汇扩展正在另一个窗口开发**（dict-ecdict.json、industry-ai.json、vocab.ts），未提交
- **图标两套 PNG**：`icons/icon*.png`（默认无绿点）+ `icons/icon*-on.png`（启用态有绿点），background 通过 `chrome.action.setIcon()` 动态切换
- **辅助力度滑杆映射**：1-5 档同时控制 `chunkGranularity`（拆分规则激进度）、`scanThreshold`（扫读最小词数）、`sensitivity`（细读复杂度门槛）三个参数，见 `src/popup/index.ts` ASSIST_TO_CONFIG

---

## 未完成事项

### 需要产品讨论

| 事项 | 说明 | 状态 |
|------|------|------|
| ~~引导页内容设计~~ | ~~四 Tab 始终可见 + 示例数据 + 顶部提示条~~ | ✅ 已确认 |
| 扫读模式 LLM 比例 | 完整版下「提高 LLM 比例」具体怎么提高？降低 `needsLLM` 的从属标记词阈值（从 3 降到 2？1？）还是改成所有超过一定长度的句子都走 LLM？ | 未开始 |

### 需要设计讨论

| 事项 | 说明 | 状态 |
|------|------|------|
| ~~引导页 UI 设计~~ | ~~`playground-onboarding.html`，三种状态切换，已确认~~ | ✅ 已确认 |
| 手动触发按钮在扫读模式的样式 | 细读模式的按钮已有（段落末尾小图标），扫读模式下的位置/样式需要确认 | 未开始 |
| ~~Content Script 扫读模式样式升级~~ | ~~playground 原型（PAGE 4）有暗色卡片设计~~。**实验后放弃**：暗色卡片在实际网页中效果不好，Content Script 保持当前透明背景轻量样式 | 不做 |

### 需要编码

| 事项 | 优先级 | 依赖 | 说明 |
|------|--------|------|------|
| 扫读模式手动触发按钮 | P0.5 | 产品 + 设计讨论 | 有 API key 时，扫读模式显示手动触发 LLM 的按钮 |
| ~~管理端示例数据 + 提示条~~ | ~~P0.5~~ | ~~✅ 编码完成~~ | ~~硬编码示例数据、顶部 callout 提示条、三种状态切换逻辑~~ ✅ |
| 扫读 LLM 比例调整 | P0.5 | 产品讨论 | 完整版下降低 LLM 触发门槛 |

### 需要测试

| 事项 | 类型 | 说明 |
|------|------|------|
| 扫读模式拆分效果（修复后） | 人工确认 | X 首页第 4 档，8 词以上的句子是否被拆分。**本次修复重点，需优先验证** |
| Tooltip 新样式 | 人工确认 | hover 生词时 tooltip 显示释义 + 圆形 ✓ 按钮，按钮默认低调、hover 变绿 |
| 扫读模式生词释义 | 浏览器验收 | X 首页扫读模式下，拆分后的句子中生词有虚线 + hover 释义 |
| Popup 视觉还原 | 人工确认 | 对比 popup.html 与 playground-pages.html Popup 原型 |
| 手动触发 LLM | 浏览器验收 | 有 API key 时，扫读模式下点击触发按钮 → LLM 返回深度分析结果 |
| 管理端状态切换 | Puppeteer | 无 key → 示例数据+提示条；有 key 无数据 → 示例数据+提示条（文案不同）；有数据 → 真实数据，提示条消失 |

### 文档更新

| 事项 | 说明 |
|------|------|
| architecture.md | 需要补充两层产品模型的技术架构 |
| testing.md | 需要补充示例数据 + 提示条的验收标准 |
| ~~design.md~~ | ~~引导提示条样式 + 页面布局规范已写入~~ ✅ |

---

## 建议的下一步执行顺序

1. **人工验收（本次修复）**：X 首页第 4 档拆分效果 + tooltip 新样式 + background 无报错
2. **产品讨论**：引导页内容 + 扫读 LLM 比例
4. **设计讨论**：引导页 UI + 手动触发按钮样式
5. **编码**：管理端状态切换 + 引导页 + 手动触发按钮 + LLM 比例调整
6. **全量验收**

---

## 已确定的视觉方向：「锐 Sharp」

- 暗色系 #09090b + 红色 #ef4444
- Logo：ZCOOL KuaiLe 400 + Nunito 600
- UI：Syne 800（标题/数字）+ Space Grotesk 400/500（正文）
- 毛玻璃卡片 + 红色渐变边框 + noise 纹理 + 红色极光呼吸

## Playground 文件索引

| 文件 | 用途 |
|------|------|
| `playground-pages.html` | **六页面设计原型（定稿）**：总览 / Popup / 每日回味 / Content Script / 难句集 / 设置 |
| `playground-onboarding.html` | **引导态设计原型（定稿）**：三种状态切换（无 key / 有 key 无数据 / 有真实数据），示例数据 + 提示条 |
| `playground-logo-final.html` | **Logo 定稿确认**（ZCOOL KuaiLe + Nunito 600）|
| `playground-visual-directions.html` | 三种字体方向对比（已选定「锐 Sharp」）|
| `playground-logo-v5.html` | Logo 可爱度 12 档梯度微调 |
| `playground-logo-v4.html` | Logo 24 种字体组合探索 |
| `playground-logo-v3.html` | Logo v3 重新思考（一个词原则）|
| `playground-logo.html` | Logo v2 早期 10 方向探索（已过时）|
| `mockup-popup.html` | 早期 Popup 原型（白色版，已过时）|
| `mockup-scan-mode.html` | 扫读模式 mockup（讨论用）|

## 已完成

- [x] 初始化 git 仓库和文档骨架
- [x] 分块功能需求讨论（扫读 + 细读两种模式）
- [x] 分块功能技术方案（本地优先 + LLM 兜底的两级架构）
- [x] 测试机制建立：docs/testing.md（验收标准 + 测试方法 + 基础设施）
- [x] Chrome CDP 调试环境配置（`~/.chrome-debug-profile/`，X 已登录，端口 9222）
- [x] 管理端（Options 页）需求讨论
- [x] Popup 需求重新设计。原型：`mockup-popup.html`
- [x] **Step 1-8 编码全部完成**（详见下方开发顺序）
- [x] **品牌命名 + 语言体系** — 掰it，完整术语和 UI 文案写入 `docs/design.md`
- [x] **视觉方向选定** — 「锐 Sharp」
- [x] **Logo 定稿** — ZCOOL KuaiLe + Nunito 600，规范写入 `docs/design.md`
- [x] **六页面原型定稿** — `playground-pages.html`，logo 已更新，每日回味已重做
- [x] **设计规范归档** — UI 文案 + 页面布局规范写入 `docs/design.md`
- [x] **Step 9 Options 页面编码完成** — React 18，4 Tab，多 Provider 配置
- [x] **Options Puppeteer 验收** — 39 个断言全通过，4 Tab 截图保存
- [x] **NavBar 不可见 bug 修复** — `.rv` class 误用
- [x] **产品方向调整** — 两层产品模型（基础版 vs 完整版），PRD 已更新
- [x] **P0 修复：扫读模式生词释义** — vocab-only 分支，未拆分句子也标注生词
- [x] **Popup UI 改造** — 白色/蓝色 → 暗色/红色「锐 Sharp」风格
- [x] **全局改名 OpenEn → 掰it** — manifest、package、文档、类型名全部统一
- [x] **修复扫读模式拆分过少** — 滑杆 4-5 档现在同时降低 scanThreshold 到 short（8 词）
- [x] **修复 background "No tab with id" 报错** — 三处 try-catch
- [x] **Tooltip 样式优化** — 掌握按钮改为圆形小 ✓ 图标

## 编码细节

### 构建配置
- **ESM** 仅用于 background service worker（MV3 要求 `type: module`）
- **IIFE** 用于 content script、popup、options（Chrome 不支持 content script ESM）
- content.js 包含词汇数据打包后 102KB（minified），可接受

### 数据文件（data/）
- `word-frequency.json`：5000 常用词（来源：Google Trillion Word Corpus top 5000）
- `dict-ecdict.json`：~250 个精选词汇中文释义（MVP 子集，生产可扩展）
- `industry-ai.json`：~80 个 AI 行业术语及中文释义

### IndexedDB 数据层
- **数据库**：`openen-data`（与缓存数据库 `openen-cache` 独立）— 名称保持不改，避免丢失用户数据
- **9 张表**：vocab、vocab_contexts、patterns、pattern_examples、learning_records、settings、weekly_reports、review_items、wallpaper_records
- **全局规则**：UUID 主键、`updated_at` + `is_dirty`（V2 同步预留）、`onupgradeneeded` schema 版本管理
- **SM-2 算法**：review_items 表内置间隔重复，`reviewItemDAO.review(db, id, quality)` 自动更新 ease_factor/interval/next_review_at
- **settings 表**：键值对存储，给 Options 页学习系统用。Popup/Background 的 LLM 配置仍走 `chrome.storage.sync`，暂不迁移
- **测试**：fake-indexeddb mock，58 个单元测试覆盖全部表 CRUD + SM-2 + 跨表业务场景

### 浏览器测试
- 已切换到 **Puppeteer** 做浏览器验收测试
- 冒烟测试：`tests/acceptance/smoke-test.mjs`
- 扫读模式测试：`tests/acceptance/scan-mode-basic.mjs`
- **Options 页测试**：`tests/acceptance/options-test.mjs`（39 断言 + 视觉可见性 + 样式断言 + 截图）

### 待人工确认项
1. Options 页 4 Tab 截图对比 playground-pages.html 原型
2. Options 页动效体感（入场动画、Tab 切换、hover）
3. 配置 API key 后，在 X 首页验证扫读模式拆分效果
4. **Popup 暗色主题视觉还原**（对比 playground-pages.html Popup 原型）
5. **扫读模式生词虚线标注**（P0 修复后需浏览器验收）
6. 滚动加载后新推文也被处理
7. Reddit 信息流页面分块是否正常分行显示

### Chrome 调试 profile 问题
旧的 `~/.chrome-debug-profile/` 无法通过 `--load-extension` 加载扩展（原因不明，可能是 profile 状态损坏）。新 profile `~/.chrome-debug-profile-2/` 可以正常加载但缺少 Reddit 登录状态。建议：在用户主力 Chrome 中手动加载 dist/ 目录测试。

## 关键决策记录

### 两层产品模型（新）
- **基础版**（无 API key）：本地拆分 + 本地词典释义，开箱即用。管理端只有引导页
- **完整版**（有 API key）：LLM 比例提高 + 手动触发 + 管理端四 Tab 全解锁
- 详见 `docs/prd.md`「两层产品模型」章节

### 两种阅读模式
- **扫读模式**：信息流场景（80% 时间），目标是效率。本地规则拆分为主。完整版下提高 LLM 比例 + 手动触发
- **细读模式**：文章场景（20% 时间），目标是成长。规则引擎判断复杂度，只拆真正复杂的。完整版下提供手动触发按钮

### 生词标注方案
- **不直接显示中文释义**，用 hover 虚线（避免视觉干扰）
- **三层词汇源**：行业术语包（V1 必须有 AI 包）> 通用离线词典 > LLM 语境化释义
- **P0 修复后**：扫读模式所有元素（含未拆分的）都会标注生词

### 学习系统（管理端 Options 页）
- **仅完整版可用**（有 API key）
- **页面结构**：四个 Tab——总览、每日回味、难句集、设置
- **核心单位是句子不是单词**：不做"生词本"，做"难句集"
- **难句卡片 6 层**：原句 → 句式标签 → 分块 → 句式讲解 → 学会表达 → 生词

### 技术栈
- 构建工具：ESBuild（沿用旧项目，加 React JSX 支持）
- 单包结构，不做 monorepo
- 浏览器测试：Puppeteer

## 开发顺序

详见 docs/architecture.md "开发顺序" 章节，共 9 步：
1. ~~项目骨架~~ ✅
2. ~~复制可复用代码~~ ✅
3. ~~LLM 适配层~~ ✅
4. ~~细读模式~~ ✅
5. ~~扫读模式~~ ✅
6. ~~生词系统~~ ✅
7. ~~Popup~~ ✅
8. ~~IndexedDB 数据层~~ ✅
9. ~~Options 页面（React）~~ ✅

**后续开发**（两层产品模型相关）：
10. ~~修复扫读模式生词释义（P0）~~ ✅
11. ~~Popup UI 改造（锐 Sharp）~~ ✅
12. ~~全局改名 OpenEn → 掰it~~ ✅
13. 管理端引导页 + 状态切换
14. 扫读模式手动触发按钮
15. 扫读 LLM 比例调整

## 参考文件

- 旧项目：`/Users/liuyujian/Documents/Enlearn/`
- 新项目规划原文：`/Users/liuyujian/Documents/Enlearn/newproject.md`
- 扫读模式视觉 mockup：`mockup-scan-mode.html`（讨论用）
