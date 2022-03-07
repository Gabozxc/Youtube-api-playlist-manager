import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import store from "../store";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
export default MyApp;
