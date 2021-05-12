import React from 'react';

import Head from 'next/head';
import 'antd/dist/antd.css';
import  '../CSS/antdMobile.css';
import AppLayout from '../components/AppLayout'; 
import wrapper from '../store/configureStore';


const Personal_Project02 = ({ Component, pageProps }) => (
    <div>
      <Head>
          {/*구글에드 센스_20210512 */}
          <script data-ad-client="ca-pub-9160341796142118" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "ca-pub-9160341796142118",
                  enable_page_level_ads: true
              });
                `
          }}
        />
        <meta charSet="utf-8" />
        <title>우리동네 식자재 유통사</title>
      </Head>
      <AppLayout>
         <Component {...pageProps} />
      </AppLayout>
    </div>
  );


  export function reportWebVitals(metric) {
    //console.log('metric===>' , metric);
  }

  
export default wrapper.withRedux(Personal_Project02);