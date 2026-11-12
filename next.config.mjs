/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // Posts are only served under /blog/<slug>; the language toggler used to
      // link to /pt/blog/<slug>, which Google discovered as 404s.
      // (/pt/blog/opengraph-image is the PT blog's social card, not a post.)
      {
        source: "/pt/blog/:slug((?!opengraph-image$)[^/]+)",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Slugs from the old Medium-fed blog, whose slug rule dropped digits and accents.
      {
        source: "/blog/react-internationalization-with-in",
        destination: "/blog/react-internationalization-with-i18n",
        permanent: true,
      },
      {
        source: "/blog/avaliao-de-redes-sociais-sob-a-tica-do-design-emocional",
        destination: "/blog/avaliacao-de-redes-sociais-sob-a-otica-do-design-emocional",
        permanent: true,
      },
      // Legacy routes from the previous (Vite) version of the site.
      { source: "/post", destination: "/blog", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(webp|png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images',
            outputPath: 'static/images',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
