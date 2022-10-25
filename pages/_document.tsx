import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

import { createEmotionCache } from 'core'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
          {/* Stolz-Bold START */}
          <link
            rel="preload"
            href="/fonts/Stolzl-Bold.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* Stolz-Bold END */}

          {/* Stolzl-Medium START */}
          <link
            rel="preload"
            href="/fonts/Stolzl-Medium.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Medium.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Medium.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* Stolzl-Medium END */}

          {/* Stolzl-Regular START */}
          <link
            rel="preload"
            href="/fonts/Stolzl-Regular.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Stolzl-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* Stolzl-Regular END */}

          {/* TTCommons-Bold START */}
          <link
            rel="preload"
            href="/fonts/TTCommons-Bold.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* TTCommons-Bold END */}

          {/* TTCommons-DemiBold START */}
          <link
            rel="preload"
            href="/fonts/TTCommons-DemiBold.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-DemiBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-DemiBold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-DemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* TTCommons-DemiBold END */}

          {/* TTCommons-Medium START */}
          <link
            rel="preload"
            href="/fonts/TTCommons-Medium.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Medium.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Medium.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* TTCommons-Medium END */}

          {/* TTCommons-Regular START */}
          <link
            rel="preload"
            href="/fonts/TTCommons-Regular.eot"
            as="font"
            type="font/eot"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/TTCommons-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {/* TTCommons-Regular END */}

          <link
            rel="preload"
            href="/fonts/Stolzl-Book.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          {(this.props as any).emotionStyleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
