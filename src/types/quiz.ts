import type { Content } from '@google/genai';

interface BaseApiResponse {
  history: Content[];
}

// 問題資料結構
interface QuestionData {
  question: string;
  options: string[];
}

// 分析結果資料結構
export interface AnalysisData {
  keywords: string[];
  reasoning: string;
}

export type ApiResponse = BaseApiResponse &
  (
    | {
        type: 'question';
        data: QuestionData;
      }
    | {
        type: 'analysis';
        data: AnalysisData;
      }
  );
