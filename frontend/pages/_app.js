import React from 'react';

import Head from 'next/head';
import 'antd/dist/antd.css';
import  '../CSS/antdMobile.css';
import AppLayout from '../components/AppLayout'; 
import wrapper from '../store/configureStore';


const Personal_Project02 = ({ Component, pageProps }) => (
    <div>
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a84543564ea2efe6647cc57ca0f73aed&libraries=services"></script>
      <AppLayout>
         <Component {...pageProps} />
      </AppLayout>
    </div>
  );


  export function reportWebVitals(metric) {
    //console.log('metric===>' , metric);
  }

  
export default wrapper.withRedux(Personal_Project02);