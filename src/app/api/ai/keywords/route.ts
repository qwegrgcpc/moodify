import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  const contents = `你是一位精通 YouTube 搜尋的助手。請根據「描述」生成 3~5 個最適合的音樂曲風，並用空格分隔。

---
範例 1：
描述：在咖啡廳讀書的下午
關鍵字：music jazz lofi chillhop

---
任務：
描述：${input}
關鍵字：`;

  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents,
    });
    const text = result.text;
    return NextResponse.json({ keywords: text });
  } catch (err) {
    return NextResponse.json({ error: 'Gemini API 錯誤', detail: String(err) }, { status: 500 });
  }
}
