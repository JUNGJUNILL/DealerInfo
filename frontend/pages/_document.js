import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
            {/*구글에드 센스_20210423 */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9160341796142118"
            crossorigin="anonymous"></script>
       
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
            
            
            {/*카카오맵*/}
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a84543564ea2efe6647cc57ca0f73aed&libraries=services"></script>

            <meta name="Keywords" content="웧퉝뷍,홀췅깡"></meta>
            <meta property="og:url" content="http://www.hubfoodlink.com"></meta>
            <meta property="og:image" content="https://image.hubpass.co.kr:441/Vegetable.gif"></meta>
            <meta property="og:image:width" content="80"></meta>
            <meta property="og:image:height" content="60"></meta>
            <meta property="og:title" content="식자재 유통사를 한눈에!"></meta>
            <meta property="og:description" content="우리동네 식자재 유통사"></meta>
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