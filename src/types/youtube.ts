// 來自 https://developers.google.com/youtube/v3/docs/search/list?authuser=3&hl=zh-tw

/**
 * 代表從 YouTube Data API v3 search.list 端點回傳的整個回應物件。
 */
export interface YouTubeSearchListResponse {
  /**
   * 識別 API 資源的類型。
   * @example "YoutubeListResponse"
   */
  kind: string;

  /**
   * 這項資源的 Etag，可用於快取驗證。
   */
  etag: string;

  /**
   * 可做為 pageToken 參數值的權杖，用於擷取結果集中的下一頁。
   * 如果是最後一頁，則此屬性不存在。
   */
  nextPageToken?: string;

  /**
   * 可做為 pageToken 參數值的權杖，用於擷取結果集中的上一頁。
   * 如果是第一頁，則此屬性不存在。
   */
  prevPageToken?: string;

  /**
   * 用於搜尋查詢的區域碼。屬性值是兩個字母的 ISO 國家/地區代碼。
   * @example "US"
   */
  regionCode: string;

  /**
   * 包含結果集的分頁資訊。
   */
  pageInfo: PageInfo;

  /**
   * 符合搜尋條件的結果清單 (陣列)。
   * 陣列中每個物件的型別為 YouTubeSearchResult。
   */
  items: YouTubeSearchResult[];
}

/**
 * 包含結果集的分頁資訊。
 */
interface PageInfo {
  /**
   * 結果集中的結果總數。
   * 請注意，這個值是概略值，不一定代表實際總數。最大值為 1,000,000。
   */
  totalResults: number;

  /**
   * API 回應中實際包含的結果數量。
   */
  resultsPerPage: number;
}

export interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number; };
      medium: { url: string; width: number; height: number; };
      high: { url: string; width: number; height: number; };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}