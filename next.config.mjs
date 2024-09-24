/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';


const nextConfig = {
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
