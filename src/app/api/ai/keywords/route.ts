import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `你是一位精通 YouTube 搜尋的助手。請根據這段描述生成 3~5 個最適合搜尋音樂的英文關鍵字，用空格分隔。

描述：${input}

關鍵字：`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return NextResponse.json({ keywords: text });
  } catch (err) {
    return NextResponse.json({ error: 'Gemini API 錯誤', detail: String(err) }, { status: 500 });
  }
}
