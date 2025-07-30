import { GoogleGenAI, Content } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `你是一位專業的音樂策展 AI，名叫 DJ Moo。你的任務是透過 4-6 個選擇題，引導使用者找出最適合他們當下情境的音樂曲風。

你的運作規則如下：

1.  **輸出格式**：你的所有回答都必須是嚴格的 JSON 格式。
2.  **問答階段**：
    * 當你需要提問時，回傳的 JSON 必須符合此格式：{ "type": "question", "data": { "question": "你的問題文字", "options": ["選項A", "選項B", "選項C"] } }
    * 你的第一個問題是固定的開場白：「你好！我是你的專屬音樂策展人 DJ Moo。為了幫你找到最棒的音樂，請告訴我，你現在處在什麼情境下？」
    * 之後的每個問題，都必須根據使用者上一個回答來生成，讓對話有連貫性。
3.  **分析階段**：
    * 在 4-5 輪問答後，當你收集到足夠資訊，或是使用者的指令是「分析結果」時，回傳的 JSON 必須符合此格式：{ "type": "analysis", "data": { "keywords": ["關鍵字1", "關鍵字2"], "reasoning": "一段簡短的推薦理由" } }
    * "keywords" 必須是英文，"reasoning" 需用繁體中文。
4.  **互動邏輯**：使用者每次只會傳來他選擇的「選項文字」。你必須根據這個選項和累積的對話歷史，決定下一個問題或進行最終分析。
`;

export async function POST(req: NextRequest) {
    try {
        const { history = [], answer, turn } = await req.json();

        // 1. 初始化 GoogleGenAI
        const ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_API_KEY!,
        });

        // 2. 組合對話歷史
        //    將系統指令放在第一個 user 訊息中，來引導 AI 的行為
        const chatHistory: Content[] = history.length > 0 ? history : [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT + "\n\n請開始你的第一個提問。" }] }
        ];

        // 3. 使用 ai.chats.create() 創建一個 Chat 實例
        const chat = await ai.chats.create({
            model: 'gemini-2.0-flash-lite',
            history: chatHistory,
        });

        // 4. 決定要發送給 AI 的訊息
        let userMessage: string;
        if (!answer) {
            userMessage = "開始吧";
        } else if (turn >= 4) {
            userMessage = `我最後的選擇是「${answer}」。請根據我們所有的對話，為我分析結果。`;
        } else {
            userMessage = answer;
        }

        // 5. 發送訊息並取得完整回應 (使用 .sendMessage() 以便接收完整 JSON)
        const result = await chat.sendMessage({
            message: userMessage,
        });

        // 移除 markdown 標記
        const aiResponseText = result?.text?.replace(/```json|```/g, '').trim();;
        if (typeof aiResponseText !== 'string') {
            throw new Error('AI 回應內容為空或格式錯誤');
        }

        const responseJson = JSON.parse(aiResponseText);
        // 6. 取得包含最新一輪對話的完整歷史紀錄
        const updatedHistory = await chat.getHistory();

        // 7. 將 AI 的回應和更新後的歷史紀錄一起回傳
        return NextResponse.json({ ...responseJson, history: updatedHistory });

    } catch (err) {
        console.error("Gemini API 錯誤:", err);
        return NextResponse.json(
            { error: 'Gemini API 發生錯誤', detail: String(err) },
            { status: 500 }
        );
    }
}