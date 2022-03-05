import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "./../redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./../config/ApolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Realtime Chat</title>
        <meta name="nextjs-typescript-tailwind-redux-graphql" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        ></script>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
export default wrapper.withRedux(MyApp);
