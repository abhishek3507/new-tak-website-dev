import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import NavLink from "../Common/NavLink";
import authSlice from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInAction, signOutAction } from "../../store/auth/authAction";
import { signOutTak,auth } from '../../utils/firebase/firebase';


const Header = () => {
  const [open, setOpen] = useState(false);
  const userLoggedIn = useSelector((state)=>state.auth?.isLoggedIn);
  const [showLogout,setShowLogout] = useState(false);
  const [isMobile,setIsMobile] = useState(false);

  const router = useRouter();

  const {actions} = authSlice;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(isLoggedInAction());
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator?.userAgent)){
      setIsMobile(true);
    }else{
      setIsMobile(false);
    }
  },[])

  const onCloseSubMenu = () => {
    setOpen(false);
  };

  const onShowSubMenu = () => {
    setOpen(true);
  };

  const logOut = () => {
    signOutTak();
    dispatch(signOutAction());
    dispatch(isLoggedInAction());
    router.push('/');
  }

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpen(false);
    });
  }, [router]);

  useEffect(()=>{
    setShowLogout(userLoggedIn);
  },[userLoggedIn,showLogout]);

  return (
    <>
      <header id="home-header" className="topMenu">
        <div className="navugationSec">
          <div className="top-menu-div">
            <div className="top-menu">
              <div className="headLogoSec">
                <Link passHref href="/">
                  <a role={"button"}>
                    <img src="/assets/images/header-logo.png" alt="Tak" />
                  </a>
                </Link>
              </div>
              <div className="headRightSec">
                <a
                  href="https://newstak.app.link/1x2XTv7n7kb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="installbtn">Install App</div>
                </a>
              </div>

              <div
                className={
                  open
                    ? "page-wrapper chiller-theme toggled"
                    : "page-wrapper chiller-theme"
                }
              >
                <a
                  id="show-sidebar"
                  className="btn btn-sm"
                  onClick={onShowSubMenu}
                >
                  <i className="fas fa-bars"></i>
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                  <div className="sidebar-content">
                    <div className="sidebar-brand">
                      <Link passHref href="/">
                        <a role={"button"}>
                          <img
                            src="/assets/images/header-logo.png"
                            alt="navlogo"
                            className="navLogoClass"
                          />
                        </a>
                      </Link>
                      <div id="close-sidebar" onClick={onCloseSubMenu}>
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                    <div className="sidebar-menu">
                      <ul>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/my-profile"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/my-profile"
                                    ? "/assets/images/icons/login-red.png"
                                    : "/assets/images/icons/login.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_my_profile"
                                defaultMessage="My Profile"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/preferences/navigation-language"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname ===
                                  "/preferences/navigation-language"
                                    ? "/assets/images/icons/navigation-red.png"
                                    : "/assets/images/icons/navigation.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_language_title"
                                defaultMessage="Navigation Language"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/preferences"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/preferences"
                                    ? "/assets/images/icons/preference-red.png"
                                    : "/assets/images/icons/preference.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_preference"
                                defaultMessage="Preferences"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          {
                            isMobile && (
                              <NavLink href="/social-news" exact={true} activeClass="headerActive">
                                <i>
                                  <img
                                    src={
                                      router.pathname === "/social-news"
                                        ? "/assets/images/icons/social-news-red.png"
                                        : "/assets/images/icons/social-news.png"
                                    }
                                  />
                                </i>
                                <span>
                                  <FormattedMessage
                                    id="footer_social_news"
                                    defaultMessage="Social News"
                                  />
                                </span>

                              </NavLink>

                            )
                          }
                        </li>
                        <li className="sidebar-dropdown">
                          <a
                            href="https://docs.google.com/forms/d/1Y65q8bNy4M2pLk0F9lNunmaX_ha17nTaIn253qwVRrA/edit"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i>
                              <img src="/assets/images/icons/feedback.png" />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_feedback"
                                defaultMessage="Feedback"
                              />
                            </span>
                          </a>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/rss"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/rss"
                                    ? "/assets/images/icons/rss-red.png"
                                    : "/assets/images/icons/rss-black.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_rss"
                                defaultMessage="RSS"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/about-us"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/about-us"
                                    ? "/assets/images/icons/about-us-red.png"
                                    : "/assets/images/icons/about-us.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_about_us"
                                defaultMessage="About Us"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/contact-us"
                            exact={true}
                            activeClass="headerActive"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/contact-us"
                                    ? "/assets/images/icons/contact-us-red.png"
                                    : "/assets/images/icons/contact-us.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_contact_info"
                                defaultMessage="Contact Info"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/privacy-policy"
                            exact={true}
                            activeClass="headerActive"
                            target="_blank"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/privacy-policy"
                                    ? "/assets/images/icons/privacy-policy-red.png"
                                    : "/assets/images/icons/privacy-policy.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_privacy_policy"
                                defaultMessage="Privacy Policy"
                              />
                            </span>
                          </NavLink>
                        </li>
                        <li className="sidebar-dropdown">
                          <NavLink
                            href="/terms-and-conditions"
                            exact={true}
                            activeClass="headerActive"
                            target="_blank"
                          >
                            <i>
                              <img
                                src={
                                  router.pathname === "/terms-and-conditions"
                                    ? "/assets/images/icons/terms-and-conditions-red.png"
                                    : "/assets/images/icons/terms-and-conditions.png"
                                }
                              />
                            </i>
                            <span>
                              <FormattedMessage
                                id="header_terms_and_conditions"
                                defaultMessage="Terms and Conditions"
                              />
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="sidebar-menu login-logout-div">
                      <ul>
                        {
                          showLogout ? (
                            <li>
                          <a>
                            <button
                              onClick={logOut}
                              className="btn logout-button"
                            >
                              <span>
                                <FormattedMessage
                                  id="header_log_out"
                                  defaultMessage="Log Out"
                                />
                              </span>
                            </button>
                          </a>
                        </li>
                          ) : (
                            <li>
                          <Link href="/login" passHref>
                            <a>
                              <button className="btn login-button">
                                <span>
                                  <FormattedMessage
                                    id="header_log_in"
                                    defaultMessage="Log In"
                                  />
                                </span>
                              </button>
                            </a>
                          </Link>
                        </li>
                          )
                        }
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
