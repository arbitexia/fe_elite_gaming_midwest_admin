/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withImages = require('next-images');

const { parsed: appEnv } = require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`,
});

module.exports = withImages({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(appEnv));
    return config;
  },
  images: {
    loader: 'imgix',
    path: '/',
    domains: ['assets.elitegaming.rpatdev.com'],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib'],
  },
  reactStrictMode: false,
});
