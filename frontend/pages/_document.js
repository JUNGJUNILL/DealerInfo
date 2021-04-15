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
            <meta name="keywords" content="웧퉝뷍,홀췅깡"></meta>
            <meta property="og:url" content="http://wwww.hubfoodlink.com"></meta>
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