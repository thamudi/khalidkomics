import App, { AppContext } from "next/app";
import Head from 'next/head';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import config from '../next-seo.config';
import Layout from '@/components/Layout';
import { createContext } from "react";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps;
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.seo.metaImage)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx: any) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/seo", {
    populate: [
      "seo",
      "seo.metaImage",
      "seo.metaSocial"
    ]
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <DefaultSeo {...config} />
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </>
//   )
// }
