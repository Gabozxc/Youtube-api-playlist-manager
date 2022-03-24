import Head from "next/head";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import Script from "next/script";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.youtubeApi);

  function cleanMessage() {
    dispatch({ type: "CLEAN_MESSAGE" });
  }

  let isTablet;
  if (typeof window !== "undefined") {
    isTablet = window?.innerWidth < 1000;
  }
  const backend = isTablet ? TouchBackend : HTML5Backend;

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-28434234-61"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         
         gtag('config', 'UA-28434234-61');
        `}
      </Script>
      <Head>
        <title>Playlist Manager</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* utf charset  */}
        <meta charSet="utf-8" />
        {/* description */}
        <meta name="description" content="Playlist vixfid" />
        {/* keywords */}
        <meta name="keywords" content="playlist, youtube, music, vixfid" />
        {/* author */}
        <meta name="author" content="Gabriel Dos Santos with vixfid" />
      </Head>
      <Header />
      <DndProvider backend={backend}>
        <main className="flex row min-h-screen relative">
          <div className="w-[100%]">{children}</div>
          <div
            className={`mb-5 p-2 block w-[290px] rounded-lg mx-auto fixed bottom-1 left-5 shadow-lg z-50 ${
              message ? "flex justify-between" : "hidden"
            } ${error ? "bg-red-500" : "bg-green-500"}`}
          >
            {message && <p className="text-white text-center">{message}</p>}
            <p className="text-white cursor-pointer" onClick={cleanMessage}>
              X
            </p>
          </div>
        </main>
      </DndProvider>
      <Footer />
    </>
  );
};

export default Layout;
