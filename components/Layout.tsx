import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Search';

type LayoutProps = {
  readonly children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const items = [
    {
      src: '/img/nav/icons_archive_en.svg',
      alt: 'archive comics',
      link: '/archive',
      text: 'archive',
      component: false,
    },
    {
      src: '/img/nav/icons_about_en.svg',
      alt: 'about khalid komics',
      link: '/about',
      text: 'about',
      component: false,
    },
    {
      src: '/img/nav/icons_contact_en.svg',
      alt: 'contact khalid komics',
      link: '/contact',
      text: 'contact',
      component: false,
    },
    {
      src: '/img/nav/icons_store_en.svg',
      alt: 'khalid komics store',
      link: 'https://khalidkomics.secure-decoration.com/',
      text: 'store',
      component: false,
    },
    //TODO: move this into the navigation bar component
    // {
    //   src: '/img/icons/icons_lang_ar_2.svg',
    //   alt: 'switch ar',
    //   link: '#',
    //   component: true,
    // },
  ];

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
        <Navbar items={items} />
      </header>
      <main
        className="mt-4"
        // style={{ height: '120vh' }}
      >
        {children}
      </main>
      <footer>
        <Footer items={items} />
      </footer>
    </>
  );
}
