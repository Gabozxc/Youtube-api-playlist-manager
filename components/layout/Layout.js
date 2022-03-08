import Head from "next/head";
import { useSession } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Script from "next/script";

import Header from "./Header";
import SideBarList from "./SideBarList";
import Footer from "./Footer";

const Layout = ({ children }) => {
  
  const { data: session } = useSession();

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
      <DndProvider backend={HTML5Backend}>
        <main className="flex row min-h-screen max-w-[95%]">
          {session && <SideBarList />}
          <div className="w-[100%]">{children}</div>
        </main>
      </DndProvider>
      <Footer />
    </>
  );
};

export default Layout;
