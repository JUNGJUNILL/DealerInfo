import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>        
            {/*구글에드 센스_20210515 */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
            <script
            dangerouslySetInnerHTML={{
              __html: `
                 (adsbygoogle = window.adsbygoogle || []).push({
                     google_ad_client: "ca-pub-9160341796142118",
                     enable_page_level_ads: true
                });
                  `
            }}/>


            {/*카카오맵*/}
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a84543564ea2efe6647cc57ca0f73aed&libraries=services"></script>

           
            <meta name="Keywords" content="도매,도소매,제조,채소,과실,농산물,가공,수산물,가공식품,식품,소매,무역,축산물,슈퍼마켓,육류,식료품,전자상거래,주류,식자재 중개,식품 B2B 사이트,식자재마트 리스트,식자재마트 현황,식자재마트,식자재마트 추천,식품 업체 정보,식품 업체 리스트"></meta>
            <meta property="og:url" content="http://www.hubfoodlink.com"></meta>
            <meta property="og:image" content="https://image.hubpass.co.kr:441/Vegetable.gif"></meta>
            <meta property="og:image:width" content="80"></meta>
            <meta property="og:image:height" content="60"></meta>
            <meta property="og:title" content="식자재 유통사를 한눈에!"></meta>
            <meta property="og:description" content={JSON.stringify({content:"우리동네 식자재 유통사,도매,도소매,제조,채소,과실,농산물,가공,수산물,가공식품,식품,소매,무역,축산물,슈퍼마켓,육류,식료품,전자상거래,주류,식자재 중개,식품 B2B 사이트,식자재마트 리스트,식자재마트 현황,식자재마트,식자재마트 추천,식품 업체 정보,식품 업체 리스트"})}></meta>
            <title>우리동네 식자재 유통사</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument