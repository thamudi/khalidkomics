import App from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import { appWithTranslation } from 'next-i18next';

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
  const globalRes = await fetchAPI('/seo', {
    populate: ['seo', 'seo.metaImage', 'seo.metaSocial'],
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default appWithTranslation(MyApp);
