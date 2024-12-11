import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['swiper'],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.we-go.world/:path*',
      },
    ];
  },
};

export default nextConfig;
