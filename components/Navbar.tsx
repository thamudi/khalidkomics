import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const itemNode: any = useRef(null);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     //TODO: make this transition smoother
  //     setScroll(window.pageYOffset > itemNode.current.offsetTop);
  //   });
  // }, []);

  return (
    <header>
      <div>
        <Link href="/">
          <Image
            className="logo"
            width={300}
            height={300}
            src="/img/site_icons_logo_full.svg"
            alt=""
            priority
          />
        </Link>
      </div>

      <nav id="nav" ref={itemNode} className={scroll ? 'fixed top-0' : ''}>
        <Link href="/archive">
          <Image
            width={90}
            height={90}
            src="/img/nav/icons_archive_en.svg"
            alt="archive comics"
          />
        </Link>{' '}
        |
        <Link href="/about">
          <Image
            width={90}
            height={90}
            src="/img/nav/icons_about_en.svg"
            alt="about khalid komics"
          />
        </Link>{' '}
        |
        <Link href="/contact">
          <Image
            width={90}
            height={90}
            src="/img/nav/icons_contact_en.svg"
            alt="contact khalid komics"
          />
        </Link>{' '}
        |
        <Link href="https://khalidkomics.secure-decoration.com/">
          <Image
            width={90}
            height={90}
            src="/img/nav/icons_store_en.svg"
            alt="khalid komics store"
          />
        </Link>{' '}
        |
        <Link href="about.html">
          <Image
            width={50}
            height={50}
            src="/img/icons/icons_lang_ar_2.svg"
            alt="switch ar"
          />
        </Link>
      </nav>
    </header>
  );
}
