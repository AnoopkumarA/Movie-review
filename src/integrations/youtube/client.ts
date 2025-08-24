const YT_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getApiKey = (): string => {
  const key = import.meta.env.VITE_YT_API_KEY as string | undefined;
  if (!key) {
    console.warn("VITE_YT_API_KEY is not set. Add it to your .env.local");
    return "";
  }
  return key;
};

export interface YtSearchItem {
  id: { videoId?: string };
  snippet: { title: string };
}

export const youtube = {
  async searchVideos(query: string, maxResults = 1) {
    const url = new URL(`${YT_BASE_URL}/search`);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", query);
    url.searchParams.set("type", "video");
    url.searchParams.set("videoEmbeddable", "true");
    url.searchParams.set("maxResults", String(maxResults));
    url.searchParams.set("key", getApiKey());
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to search YouTube");
    return res.json() as Promise<{ items: YtSearchItem[] }>;
  },
};


