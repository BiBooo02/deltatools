import { onMounted } from "vue";

export function useSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  onMounted(() => {
    // Update title
    if (title) {
      document.title = title;

      // Update meta title
      updateMetaTag("title", title);
      updateMetaTag("property", "og:title", title);
      updateMetaTag("property", "twitter:title", title);
    }

    // Update description
    if (description) {
      updateMetaTag("name", "description", description);
      updateMetaTag("property", "og:description", description);
      updateMetaTag("property", "twitter:description", description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag("name", "keywords", keywords);
    }

    // Update image
    if (image) {
      const fullImageUrl = image.startsWith("http")
        ? image
        : `https://deltatools.ba${image}`;
      updateMetaTag("property", "og:image", fullImageUrl);
      updateMetaTag("property", "twitter:image", fullImageUrl);
    }

    // Update URL
    if (url) {
      const fullUrl = url.startsWith("http")
        ? url
        : `https://deltatools.ba${url}`;
      updateMetaTag("property", "og:url", fullUrl);
      updateMetaTag("property", "twitter:url", fullUrl);

      // Update canonical
      updateCanonical(fullUrl);
    }

    // Update type
    if (type) {
      updateMetaTag("property", "og:type", type);
    }
  });
}

function updateMetaTag(attribute, name, content) {
  let selector =
    attribute === "name" ? `meta[name="${name}"]` : `meta[property="${name}"]`;

  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement("meta");
    if (attribute === "name") {
      meta.setAttribute("name", name);
    } else {
      meta.setAttribute("property", name);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function updateCanonical(url) {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}
