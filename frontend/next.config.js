const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

//웹펙을 바꾸기 위한 파일
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

const nextConfig = withBundleAnalyzer({  
  
    compress: true,
     //배포할 파일들을 gzip으로 압축해준는 장치 

    images: {
      domains: ['www.hubpass.co.kr','image.hubpass.co.kr','bigseller.hubmeka.co.kr'],
  
    },
    //next/image 경로 설정 

    future: {
      webpack5: true,
    },

    experimental: {
      scrollRestoration: true,
    },


    //웹팩 5 사용 
  
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === 'production';
      return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins: [
   
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/), //monent 한국어만 되게끔 하기 위한 웹팩 설정
        ],
      };
    },
    
  });

  
  module.exports = withPlugins(
    [
        [withImages, {}],

    ], nextConfig
    // {
     //global config here   
       
    //}
);
    
  