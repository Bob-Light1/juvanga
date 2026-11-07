const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function siteOrigin(value = '') {
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTPS origin without credentials, a path, query or fragment');
  }
  return url.origin;
}

export function pageDocument(template, rendered, origin) {
  const { page, html } = rendered;
  const indexable = Boolean(origin && page.indexable);
  const head = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, nofollow'}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    ...(indexable ? [`<link rel="canonical" href="${escape(origin + page.path)}" />`, `<meta property="og:url" content="${escape(origin + page.path)}" />`] : []),
  ].join('\n    ');
  return template.replace(/<title>.*?<\/title>/s, '').replace(/<meta name="(?:description|robots)"[^>]*>/g, '')
    .replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
}

export function sitemap(paths, origin) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? paths.map(path => `\n  <url><loc>${escape(origin + path)}</loc></url>`).join('') : ''}\n</urlset>\n`;
}

export function robots(origin) {
  return origin ? `User-agent: *\nAllow: /\nDisallow: /workshop\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n';
}

export function headers(base, origin) {
  const security = base.replace(/^  X-Robots-Tag:.*\n?/gm, '');
  return security + (origin ? '\n/workshop\n  X-Robots-Tag: noindex, nofollow\n/workshop/\n  X-Robots-Tag: noindex, nofollow\n/404.html\n  X-Robots-Tag: noindex, nofollow\n' : '  X-Robots-Tag: noindex, nofollow\n');
}
