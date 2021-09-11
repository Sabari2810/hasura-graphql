import "../styles/globals.css";
import { useApollo } from "../lib/apollo";
import initializeApollo from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initializeApolloProps);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
