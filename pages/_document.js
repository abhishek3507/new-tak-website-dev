import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google-site-verification" content="pbm5V6vs0cGS09rBx47umvlYeHiMnHH8hzEDokj3u3Q" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google" content="notranslate" />
        <meta name="application-name" content="Tak" />
        <meta name="author" content="Tak" />
        <script type="application/ld+json">
          {
            JSON.stringify(
              {"@context":"https://schema.org",
              "@type":"Organization",
              "name":"Tak",
              "url":"https://www.tak.live",
              "logo":"https://www.tak.live/assets/images/header-logo.png",
              "address":{"@type":"PostalAddress","addressLocality":"Connaught Circus","addressRegion":"New Delhi, Delhi","streetAddress":"TV Today Network Limited, F-26 1st Floor,Connaught Circus","postalCode":"110001","telephone":"011-23724683"},
              "sameAs":["https://play.google.com/store/apps/details?id=com.indiatoday.mobiletak","https://apps.apple.com/in/app/tak-short-video-news-app/id1499767412"]})
          }
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
