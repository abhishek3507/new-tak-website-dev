import { FormattedMessage } from "react-intl";
import { Breadcrumb } from "react-bootstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  getLanguage,
  languages,
  setLanguage as setAppLangauge,
} from "../../localization/i8intl";
import Script from "next/script";

const navigationLanguageList = [
  {
    id: 1,
    language: "english",
    languageTitle: "English",
    selected: false,
    activeColor: "#11BEDB",
    inactiveColor: "#DBDBDB",
    image: "english.png",
    title: "Select App Navigation Language",
    save: "Save",
    languageChannelId: 0,
    langCode: "en",
  },
  {
    id: 2,
    language: "hindi",
    languageTitle: "हिंदी",
    selected: false,
    activeColor: "#F78F32",
    inactiveColor: "#DBDBDB",
    image: "hindi.png",
    title: "नेविगेशन की भाषा बदलें ",
    save: "सेव",
    languageChannelId: 0,
    langCode: "hi",
  },
  {
    id: 3,
    language: "marathi",
    languageTitle: "मराठी",
    selected: false,
    activeColor: "#EE3436",
    inactiveColor: "#DBDBDB",
    image: "marathi.png",
    title: "नेव्हिगेशन भाषा बदला",
    save: "सेव्ह करा",
    languageChannelId: "62a6f9eafdc5caf53558f4f7",
    langCode: "mr",
  },
  {
    id: 4,
    language: "punjabi",
    languageTitle: "ਪੰਜਾਬੀ",
    selected: false,
    activeColor: "#FED029",
    inactiveColor: "#DBDBDB",
    image: "punjabi.png",
    title: "ਨੈਵੀਗੇਸ਼ਨ ਭਾਸ਼ਾ ਬਦਲੋ",
    save: "ਸੇਵ",
    languageChannelId: "62a6f9eafdc5caf53558f4ff",
    langCode: "pa",
  },
  {
    id: 5,
    language: "gujarati",
    languageTitle: "ગુજરાતી",
    selected: false,
    activeColor: "#CF4C9B",
    inactiveColor: "#DBDBDB",
    image: "gujarati.png",
    title: "નેવિગેશન ભાષા બદલો",
    save: "સેવ",
    languageChannelId: "62a6f9eafdc5caf53558f506",
    langCode: "guj",
  },
  {
    id: 6,
    language: "kannada",
    languageTitle: "ಕನ್ನಡ",
    selected: false,
    activeColor: "#E30028",
    inactiveColor: "#DBDBDB",
    image: "kannada.png",
    title: "ಭಾಷೆ ಬದಲಿಸಿ",
    save: "ಸೇವ್ ಮಾಡಿ",
    languageChannelId: "62a6f9eafdc5caf53558f514",
    langCode: "kn",
  },
];

const NavigationLanguage = () => {
  const [language, setLanguage] = useState({});
  const [currentSaved, setCurrentSaved] = useState("");

  useEffect(() => {
    let value = localStorage.getItem("userNavigationPref");
    if (value) {
      const lang = navigationLanguageList.filter((ll) => ll.language == value);
      if (lang) {
        //console.log(lang[0]);
        setCurrentSaved(lang[0]);
        setLanguage(lang[0]);
      }
    } else {
      setCurrentSaved(navigationLanguageList[0]);
      setLanguage(navigationLanguageList[0]);
    }
  }, []);

  const onLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const saveLanguage = (e) => {
    e.preventDefault();
    localStorage.setItem("userNavigationPref", language.language);
    if (language.languageChannelId !== 0) {
      localStorage.setItem(
        "userChannelPreference",
        JSON.stringify({
          ids: [language.languageChannelId],
        })
      );
    }
    if (
      language.languageChannelId == 0 &&
      localStorage.getItem("userChannelPreference")
    ) {
      localStorage.removeItem("userChannelPreference");
    }

    //* set global language
    setAppLangauge(language.langCode);
  };

  return (
    <>
      <Head>
        <title>Navigation Language | Tak.Live</title>
        <meta name="description" content="Select your Navigation Language of your choice in English, हिंदी, मराठी, ਪੰਜਾਬੀ, ગુજરાતી, ಕನ್ನಡ | Tak.Live" />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="Navigation Language | Tak.Live" />
        <meta property="og:description" content="Select your Navigation Language of your choice in English, हिंदी, मराठी, ਪੰਜਾਬੀ, ગુજરાતી, ಕನ್ನಡ | Tak.Live" />
        <meta property="og:url" content="https://www.tak.live/preferences/navigation-language" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/preferences/navigation-language" />
        <meta name="twitter:title" content="Navigation Language | Tak.Live" />
        <meta name="twitter:description" content="Select your Navigation Language of your choice in English, हिंदी, मराठी, ਪੰਜਾਬੀ, ગુજરાતી, ಕನ್ನಡ | Tak.Live" />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/preferences/navigation-language" />
        <meta itemProp="headline" content="Navigation Language | Tak.Live" />
        <meta itemProp="description" content="Select your Navigation Language of your choice in English, हिंदी, मराठी, ਪੰਜਾਬੀ, ગુજરાતી, ಕನ್ನಡ | Tak.Live" />
        <link rel="canonical" href="https://www.tak.live/preferences/navigation-language" />
        <script type='application/ld+json'>
        {
          JSON.stringify(
            {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://www.tak.live","name":"Home"}},{"@type":"ListItem","position":2,"item":{"@id":"https://www.tak.live/preferences/navigation-language","name":"Navigation Language"}}]}
          )
        }
        </script>
    </Head>

    <div className="minimum-height container bg-white">
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <FormattedMessage defaultMessage="Home" id="footer_home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <FormattedMessage
            defaultMessage="Contact Us"
            id="header_language_title"
          />
        </Breadcrumb.Item>
      </Breadcrumb>
      <section id="navigation-preference">
        <div className="container bgwhite">
          <div className="row">
            <div className="col-12 paddingLeftRight10px mt-2">
              <h2>{language.title}</h2>
            </div>
          </div>
          <div className="row">
            {navigationLanguageList.map((lang, index) => (
              <div
                key={index}
                className={`paddingLeftRight10px mt-2 mb-2 languageDiv`}
                style={
                  language.id === lang.id
                    ? { backgroundColor: lang.activeColor }
                    : {}
                }
                id={`div_${lang?.id}`}
                onClick={() => onLanguageChange(lang)}
              >
                <div className="col-6 languageTextDiv">
                  <span
                    className="languageTextSpan"
                    style={language.id === lang.id ? { color: "#fff" } : {}}
                  >
                    {lang?.languageTitle}
                  </span>
                </div>
                <div className="col-6 languageImage">
                  <img
                    src={`/assets/images/icons/${lang?.image}`}
                    alt={lang?.languageTitle}
                  />
                </div>
              </div>
            ))}
          </div>
          {currentSaved.id === language.id ? (
            <></>
          ) : (
            <span className="paddingLeftRight10px save-div">
              <span className="preference-confirm text-center my-4">
                <button onClick={saveLanguage} className="btn save-btn px-4">
                  {language.save}
                </button>
              </span>
            </span>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default NavigationLanguage;
