/** @type {import('next').NextConfig} */




const path = require('path');
// const withTM = require('next-transpile-modules')(['eventjuicer-site-components'], {resolveSymlinks: false});
const { withSentryConfig } = require('@sentry/nextjs');


const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};



module.exports = withSentryConfig({

    transpilePackages: ['eventjuicer-core'],

    experimental: {
      // esmExternals: 'loose',
    },

    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    
    webpack: (config, options) => {

      if (options.isServer) {
        config.externals = [
          // 'react',
          ...config.externals];
      }

      config.resolve = {
        // conditionNames: ["module"],
        alias: {
          ...config.resolve.alias,
          // react: path.resolve(__dirname, '.', 'node_modules', 'react')
        }
      },


      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });

  
      return config
    },

    i18n: {
      locales: ['en','pl'],
      defaultLocale: 'pl',  
    //   domains: [
    //     {
    //     domain: 'targiehandlu.pl',
    //     defaultLocale: 'pl',
    //   },
    //   {
    //     domain: 'ecommercewarsaw.com',
    //     defaultLocale: 'en',
    //   }],
    },

    async rewrites() { 
      return [
      {
      source: '/presenters',
      destination: '/speakers',
      },
      {
      source: '/presenters/:id',
      destination: '/speakers/:id',
      }]
    },

    async redirects() {
      return [
        {
          source: '/workshop',
          destination: '/workshops',
          permanent: true,
        },
        {
          source: '/legal',
          destination: '/legal-2023-11-09',
          permanent: false,
        },
        {
          source: '/vote/categories',
          destination: '/vote',
          permanent: false,
        },
      
        {
          source: '/exhibitors/sunrisesystempl',
          destination: '/exhibitors/grupatensepl',
          permanent: true,
        },
      

        
      ]
    }
  
  }, SentryWebpackPluginOptions);



