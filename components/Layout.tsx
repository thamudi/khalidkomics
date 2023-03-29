import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  readonly children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    document.documentElement.lang = getCookie('NEXT_LOCALE')
      ? getCookie('NEXT_LOCALE')!.toString()
      : 'en';
  }, []);

  return (
    <>
      <Head>
        <title>Khalid Komics</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="content-language" content="en" />
        <link rel="icon" href="logo.png" />
        <meta
          name="description"
          content="Khalid Nahar comics site front and store."
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main
        className="mt-4"
        // style={{ height: '120vh' }}
      >
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
