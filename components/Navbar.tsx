import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            className="logo"
            width={500}
            height={500}
            src="/img/site_icons_logo_full.svg"
            alt=""
          />
        </Link>
      </div>

      <nav id="nav">
        <Link href="/comics">
          <Image
            width={100}
            height={100}
            src="/img/nav/icons_comics_en.svg"
            alt="comics"
          />
        </Link>{' '}
        |
        <Link href="/archive">
          <Image
            width={100}
            height={100}
            src="/img/nav/icons_comics_en.svg"
            alt="archive comics"
          />
        </Link>{' '}
        |
        <Link href="/about">
          <Image
            width={100}
            height={100}
            src="/img/nav/icons_about_en.svg"
            alt="about khalid komics"
          />
        </Link>{' '}
        |
        <Link href="/contact">
          <Image
            width={100}
            height={100}
            src="/img/nav/icons_contact_en.svg"
            alt="contact khalid komics"
          />
        </Link>{' '}
        |
        <Link href="https://khalidkomics.secure-decoration.com/">
          <Image
            width={100}
            height={100}
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
