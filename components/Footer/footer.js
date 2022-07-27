import React, { useEffect, useState } from "react";
//import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import NavLink from "../Common/NavLink";

const Footer = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator?.userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <footer>
        <div className="bottom-menu">
          <NavLink href="/" exact={true} activeClass="footerActive">
            <img
              className="home"
              src={
                router.pathname === "/" || router.pathname === "/home"
                  ? "/assets/images/icons/home-red.png"
                  : "/assets/images/icons/home.png"
              }
            />
            <span>
              <FormattedMessage id="footer_home" defaultMessage="Home" />
            </span>
          </NavLink>

          <NavLink href="/shorts" exact={true} activeClass="footerActive">
            <img
              className="search"
              src={
                router.pathname === "/shorts" ||
                router.pathname.includes("shorts")
                  ? "/assets/images/icons/short-red.png"
                  : "/assets/images/icons/short.png"
              }
            />
            <span>
              <FormattedMessage id="footer_shorts" defaultMessage="Shorts" />
            </span>
          </NavLink>

          <NavLink href="/webstories" exact={true} activeClass="footerActive">
            <img
              className="viral"
              src={
                router.pathname === "/webstories"
                  ? "/assets/images/icons/social-news-red.png"
                  : "/assets/images/icons/social-news.png"
              }
            />
            <span>
              <FormattedMessage
                id="footer_web_stories"
                defaultMessage="Web Stories"
              />
            </span>
          </NavLink>

          {!isMobile && (
            <NavLink
              href="/social-news"
              exact={true}
              activeClass="footerActive"
            >
              <img
                className="viral"
                src={
                  router.pathname === "/social-news"
                    ? "/assets/images/icons/social-news-red.png"
                    : "/assets/images/icons/social-news.png"
                }
              />
              <span>
                <FormattedMessage
                  id="footer_social_news"
                  defaultMessage="Social News"
                />
              </span>
            </NavLink>
          )}

          <NavLink href="/spotlight/anchor/all" activeClass="footerActive">
            <img
              className="viral"
              src={
                router.pathname === "/spotlight/anchor/all" ||
                router.pathname.indexOf("spotlight") > -1
                  ? "/assets/images/icons/spotlight-red.png"
                  : "/assets/images/icons/spotlight.png"
              }
            />
            <span
              className={
                router.pathname.indexOf("spotlight") > -1 ? "footerActive" : ""
              }
            >
              <FormattedMessage
                id="footer_spotlight"
                defaultMessage="Spotlight"
              />
            </span>
          </NavLink>

          <NavLink href="/discover" exact={true} activeClass="footerActive">
            <img
              className="viral"
              src={
                router.pathname === "/discover"
                  ? "/assets/images/icons/discover-footer-red.png"
                  : "/assets/images/icons/discover-footer-black.png"
              }
            />
            <span>
              <FormattedMessage
                id="footer_discover"
                defaultMessage="Discover"
              />
            </span>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default Footer;
