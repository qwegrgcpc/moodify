# 🎵 AI 播放清單產生器

輸入一句話，讓 AI 幫你生成一份貼合心情的 YouTube 播放清單！

---

## 專案簡介

這是一個結合 AI 與 YouTube 的音樂搜尋工具。只要輸入一段文字或選擇曲風分類，系統就會根據描述推薦合適的 Lo-fi 或其他類型的音樂影片，方便建立你的心情播放清單。

---

## 使用技術

- **前端框架**：Next
- **UI 元件**：Tailwind CSS
- **AI 串接**：Google Gemini
- **影片資料**：YouTube Data API v3
- **Fallback 資料**：內建 mock data，避免 API 配額限制

---

## 功能說明

- 輸入文字 → 透過 AI 解讀關鍵字
- 自動搜尋並推薦 YouTube 播放清單
- 依據曲風（如 Lo-fi、Jazz、Chill）分類
- 路由同步：Tab 切換會更新 URL query
- 直接嵌入影片播放
- mock data 機制：可開發期間不觸發真實 API

---

## 開發方式

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 打包建置
npm run build
