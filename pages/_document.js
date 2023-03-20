import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='fa' dir="rtl">
      <Head>
      <link rel="shortcut icon" href="/images/fav.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
