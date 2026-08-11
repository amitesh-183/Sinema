export const tmdbImage = (path: string, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
