import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noindex = false 
}) => {
  useEffect(() => {
    // Actualizar el título de la página
    if (title) {
      document.title = title;
    }

    // Actualizar metadatos
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Metadatos básicos
    if (description) {
      updateMetaTag('description', description);
      updatePropertyTag('og:description', description);
      updatePropertyTag('twitter:description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph
    if (title) {
      updatePropertyTag('og:title', title);
      updatePropertyTag('twitter:title', title);
    }

    if (image) {
      updatePropertyTag('og:image', image);
      updatePropertyTag('twitter:image', image);
    }

    if (url) {
      updatePropertyTag('og:url', url);
      updatePropertyTag('twitter:url', url);
    }

    updatePropertyTag('og:type', type);

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

  }, [title, description, keywords, image, url, type, noindex]);

  return null;
};

export default SEO;
