/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // Posts are only served under /blog/<slug>; the language toggler used to
      // link to /pt/blog/<slug>, which Google discovered as 404s.
      { source: "/pt/blog/:slug", destination: "/blog/:slug", permanent: true },
      // Legacy routes from the previous (Vite) version of the site.
      { source: "/post", destination: "/blog", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(webp|png|jpe?g|gif|svg|webm)$/i,
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
