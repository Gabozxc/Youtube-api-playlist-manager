import Head from "next/head";
import { useSession } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import Header from "./Header"
import SideBarList from "./SideBarList";
import Footer from "./Footer";

const Layout = ({children}) => {

  const { data: session } = useSession();


  return (
    <>
      <Head>
        <title>Playlist</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* utf charset  */}
        <meta charSet="utf-8" />
        {/* description */}
        <meta name="description" content="Playlist" />
        {/* keywords */}
        <meta name="keywords" content="playlist, youtube, music" />
        {/* author */}
        <meta name="author" content="Gabriel" />
      </Head>
      <Header />
      <DndProvider backend={HTML5Backend}>
    <main className="flex row min-h-screen max-w-[95%]">
      {session &&  <SideBarList />}
      <div className="w-[100%]">
        {children}
      </div>
    </main>
    </DndProvider>
    <Footer />
    </>
  );
};

export default Layout;
