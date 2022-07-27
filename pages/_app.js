//* global scss
import "../styles/globals.scss";

//* library imports
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { useState, useEffect } from "react";
//import axios from "axios";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";

//* custom imports
import { store } from "../store";
import i8intl from "../localization/i8intl";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(i8intl.defaultLocale);
  const [messages, setMessages] = useState(i8intl.defaultMessages);

  useEffect(() => {
    const locale = i8intl.getLanguage();
    // if (!locale) return i8intl.setLanguage(i8intl.defaultLocale);

    if (locale) setMessages(i8intl.allMessages[locale]);
    if (locale !== lang) setLang(locale);

    if (localStorage) {
      let watched = localStorage.getItem("watched-shorts");
      //console.log(watched);
      if (watched) {
        //console.log(watched);
        //console.log(hasCookie("watched-shorts"));
        if (hasCookie("watched-shorts")) {
          deleteCookie("watched-shorts");
        }
        setCookie("watched-shorts", watched);
      } else {
        deleteCookie("watched-shorts");
      }
    }
  }, [lang]);

  //axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <IntlProvider
      messages={messages}
      locale={lang}
      defaultLocale={i8intl.defaultLocale}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
