import { useEffect } from "react";

interface UseHeadOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SITE_NAME = "Sinema";
const DEFAULT_DESCRIPTION =
  "Discover, search and explore thousands of movies and TV shows. Your all-in-one entertainment hub.";
const DEFAULT_IMAGE = "https://sinema.app/og-image.png";

const setMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"], meta[name="${property}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    if (property.startsWith("og:")) {
      el.setAttribute("property", property);
    } else {
      el.setAttribute("name", property);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const useHead = ({
  title,
  description,
  image,
  url,
  type = "website",
}: UseHeadOptions = {}) => {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Movies & TV Shows, Ultra Fast`;
    setMeta("description", description || DEFAULT_DESCRIPTION);

    setMeta("og:type", type);
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:title", title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Movies & TV Shows, Ultra Fast`);
    setMeta("og:description", description || DEFAULT_DESCRIPTION);
    setMeta("og:image", image || DEFAULT_IMAGE);
    if (url) setMeta("og:url", url);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Movies & TV Shows, Ultra Fast`);
    setMeta("twitter:description", description || DEFAULT_DESCRIPTION);
    setMeta("twitter:image", image || DEFAULT_IMAGE);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, url, type]);
};
