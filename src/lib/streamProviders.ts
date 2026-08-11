export type MediaType = "movie" | "tv";

export type StreamProvider = {
  id: string;
  name: string;
  verified: boolean;
  url: (
    mediaType: MediaType,
    id: string,
    season?: string,
    episode?: string,
    lang?: string,
  ) => string;
};

export const STREAM_PROVIDERS: StreamProvider[] = [
  {
    id: "2embed",
    name: "2Embed",
    verified: true,
    url: (type, id, season, episode) =>
      type === "tv"
        ? `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
        : `https://www.2embed.cc/embed/movie/${id}`,
  },
  {
    id: "vidsrc-me",
    name: "VidSrc",
    verified: true,
    url: (type, id, season, episode, lang) => {
      const base =
        type === "tv"
          ? `https://vidsrc-embed.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`
          : `https://vidsrc-embed.ru/embed/movie?tmdb=${id}`;
      return lang && lang !== "en" ? `${base}&ds_lang=${lang}` : base;
    },
  },
  {
    id: "vidsrc",
    name: "VidSrc Legacy",
    verified: false,
    url: (type, id, season, episode) =>
      type === "tv"
        ? `https://vidsrc.xyz/embed/tv/${id}/${season}-${episode}`
        : `https://vidsrc.xyz/embed/movie/${id}`,
  },
  {
    id: "embed-su",
    name: "Embed.su",
    verified: false,
    url: (type, id, season, episode) =>
      type === "tv"
        ? `https://embed.su/embed/tv/${id}/${season}/${episode}`
        : `https://embed.su/embed/movie/${id}`,
  },
  {
    id: "multiembed",
    name: "MultiEmbed",
    verified: false,
    url: (type, id, season, episode) =>
      `https://multiembed.mov/directstream.php?tmdb=1&id=${id}` +
      (type === "tv" ? `&s=${season}&e=${episode}` : ""),
  },
];
