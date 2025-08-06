# 🎵 AI 播放清單產生器

輸入一句話，讓 AI 幫你生成一份貼合心情的 YouTube 播放清單！

---

## 專案簡介

這是一個結合 AI 與 YouTube 的音樂搜尋工具。只要輸入一段文字或透過風格探測，系統就會根據描述推薦合適的 Lo-fi 或其他類型的音樂影片，方便建立你的心情播放清單。

---

## 使用技術

- **前端框架**：Next.js 15.3.3 (with Turbopack)
- **UI 框架**：Tailwind CSS v4
- **程式語言**：TypeScript
- **狀態管理**：React 19
- **AI 服務**：Google Gemini API
- **影片資料**：YouTube Data API v3
- **套件管理**：pnpm
- **代碼品質**：ESLint + Prettier
- **Fallback 資料**：內建 mock data，避免 API 配額限制

---

## 功能說明

- **智能關鍵字解析**：輸入文字 → 透過 AI 解讀關鍵字
- **自動播放清單**：自動搜尋並推薦 YouTube 播放清單
- **音樂分類**：依據曲風（如 Lo-fi、Jazz、Chill）分類
- **嵌入播放**：直接嵌入影片播放器
- **Mock 機制**：可開發期間不觸發真實 API
- **測驗功能**：音樂相關的互動測驗

---

## 開發方式

```bash
# 安裝依賴
pnpm install

# 本地開發（使用 Turbopack 加速）
pnpm run dev

# 代碼檢查
pnpm run lint

# 自動修復 ESLint 錯誤
pnpm run lint:fix

# 格式化所有檔案
pnpm run format

# TypeScript 類型檢查
pnpm run type-check

# 完整檢查（類型 + ESLint + 格式化）
pnpm run check-all

# 打包建置
pnpm run build

# 啟動正式版本
pnpm run start
```

## 環境變數設定

建立 `.env.local` 檔案並設定以下變數：

```env
# Google Gemini API
GOOGLE_API_KEY=your_google_api_key

# YouTube Data API
YOUTUBE_API_KEY=your_youtube_api_key
```

## 專案結構

```
moodify/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── ai/           # AI 相關 API
│   │   │   ├── auth/         # 身份驗證 API (目前未使用)
│   │   │   └── youtube/      # YouTube API
│   │   ├── music/            # 音樂頁面
│   │   ├── quiz/             # 測驗頁面
│   │   └── layout.tsx        # 全局佈局
│   ├── components/            # React 元件
│   ├── hooks/                # 自定義 Hooks
│   ├── lib/                  # 工具函數
│   ├── mocks/                # Mock 資料
│   ├── styles/               # 樣式檔案
│   └── types/                # TypeScript 類型定義
├── public/                   # 靜態資源
└── components/               # 額外元件目錄
```

---

## 開發注意事項

- 使用 **pnpm** 作為套件管理工具
- 程式碼會自動格式化（Prettier）
- 遵循 ESLint 規範
- TypeScript 嚴格模式
- 支援 Turbopack 開發加速

---

## 授權

本專案採用 MIT 授權條款。
