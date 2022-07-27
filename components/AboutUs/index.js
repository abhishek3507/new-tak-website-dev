import Head from "next/head";
import { Breadcrumb } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const index = () => {
  return (
    <>
      <Head>
        <title>About Us | Tak.Live</title>
        <meta name="description" content="About Us - Tak is one-stop spot for the quickest, trending news videos, entertainment and viral stories from across India and beyond." />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="About Us | Tak.Live" />
        <meta property="og:description" content="About Us - Tak is one-stop spot for the quickest, trending news videos, entertainment and viral stories from across India and beyond." />
        <meta property="og:url" content="https://www.tak.live/about-us" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/about-us" />
        <meta name="twitter:title" content="About Us | Tak.Live" />
        <meta name="twitter:description" content="About Us - Tak is one-stop spot for the quickest, trending news videos, entertainment and viral stories from across India and beyond." />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/about-us" />
        <meta itemProp="headline" content="About Us | Tak.Live" />
        <meta itemProp="description" content="About Us - Tak is one-stop spot for the quickest, trending news videos, entertainment and viral stories from across India and beyond." />
        <link rel="canonical" href="https://www.tak.live/about-us" />
        <script type='application/ld+json'>
          {
            JSON.stringify(
              { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "item": { "@id": "https://www.tak.live", "name": "Home" } }, { "@type": "ListItem", "position": 2, "item": { "@id": "https://www.tak.live/about-us", "name": "About Us" } }] }
            )
          }
        </script>
      </Head>
      <div className="minimum-height container aboutUs">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <FormattedMessage defaultMessage="Home" id="footer_home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage defaultMessage="About Us" id="header_about_us" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <p>
          Digitization has made everything possible with a click, tap, swipe.
          Going by the same mantra, Tak is one-stop spot for the quickest,
          trending news videos, entertainment and viral stories from across India
          and beyond. What's more,coming from the most credible media organization
          in India - the TV Today Network Limited - all our news is fact-checked
          and delivered to you faster than ever before.
        </p>
        <p>
          What make us different is that our content has been created for your
          mobile. It is not only for the on-the-go generation but gives you
          crunchy content with easy viewing and sharing.
        </p>
        <p>
          For exclusive news interviews and stories to humour and entertainment
          videos -Tak has it all. It brings you videos from different regions, be
          it about their economy, culture or the recent news events.
        </p>
        <p>
          And it is not just trending news and entertainment, Tak is an umbrella
          platform for hosting a variety of lifestyle content from categories such
          as - Sports, Fitness, Food, Business, Astrology and Technology. With an
          easy-to customize interface, there is something for everyone at Tak.
        </p>
      </div>
    </>
  );
};

export default index;
