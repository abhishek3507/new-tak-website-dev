import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
      {router.pathname === "/terms-and-conditions" ||
      router.pathname === "/privacy-policy" ? (
        <div>{children}</div>
      ) : router.pathname === "/shorts" ||
        router.pathname.includes("shorts") ? (
        <>
          <div>{children}</div>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <div className="margin-top-75px">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
