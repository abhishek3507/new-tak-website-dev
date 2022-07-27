import Head from "next/head";
import { Breadcrumb } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const index = () => {
  return (
    <>
      <Head>
        <title>Contact Us| Tak.Live</title>
        <meta name="description" content="Contact Us - Contact for viral stories at Tak.Live." />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="Contact Us| Tak.Live" />
        <meta property="og:description" content="Contact Us - Contact for viral stories at Tak.Live." />
        <meta property="og:url" content="https://www.tak.live/contact-us" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/contact-us" />
        <meta name="twitter:title" content="Contact Us| Tak.Live" />
        <meta name="twitter:description" content="Contact Us - Contact for viral stories at Tak.Live." />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/contact-us" />
        <meta itemProp="headline" content="Contact Us| Tak.Live" />
        <meta itemProp="description" content="Contact Us - Contact for viral stories at Tak.Live." />
        <link rel="canonical" href="https://www.tak.live/contact-us" />
        <script type='application/ld+json'>
          {
            JSON.stringify(
              { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "item": { "@id": "https://www.tak.live", "name": "Home" } }, { "@type": "ListItem", "position": 2, "item": { "@id": "https://www.tak.live/contact-us", "name": "Contact Info" } }] }
            )
          }
        </script>
      </Head>
      <div className="minimum-height container contactUs">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <FormattedMessage defaultMessage="Home" id="footer_home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage
              defaultMessage="Contact Us"
              id="header_contact_us"
            />
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="contact-container">
          <h5>Registered office address:</h5>
          <p>TV Today Network Limited F-26,</p>
          <p>1st Floor,</p>
          <p>Connaught Circus,</p>
          <p>New Delhi-110001.</p>
          <p>Contact Person: Nasser Kabir</p>
          <p>011-23724683</p>
          <p>
            <a href="mailto:nasser.kabir@aajtak.com">nasser.kabir@aajtak.com</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
