import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Search from './Search';

interface NavigationItems {
  src: string;
  alt: string;
  link: string;
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const items = [
    {
      src: '/img/nav/icons_archive_en.svg',
      alt: 'archive comics',
      link: '/archive',
    },
    {
      src: '/img/nav/icons_about_en.svg',
      alt: 'about khalid komics',
      link: '/about',
    },
    {
      src: '/img/nav/icons_contact_en.svg',
      alt: 'contact khalid komics',
      link: '/contact',
    },
    {
      src: '/img/nav/icons_store_en.svg',
      alt: 'khalid komics store',
      link: 'https://khalidkomics.secure-decoration.com/',
    },
    {
      src: '/img/icons/icons_lang_ar_2.svg',
      alt: 'switch ar',
      link: '#',
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      if (e.currentTarget.innerWidth < 645) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setToggleNav(false);
      }
    });
  });
  const triggerNav = () => {
    setToggleNav(!toggleNav);
  };
  return (
    <header>
      <div className="flex w-full md:justify-center">
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
        {isMobile && (
          <Image
            className="animate-wiggle"
            width={80}
            height={80}
            src="/img/nav/burgur.svg"
            alt=""
            onClick={triggerNav}
          />
        )}
      </div>
      {isMobile ? (
        <MobileNav
          toggleNav={toggleNav}
          setToggleNav={setToggleNav}
          navItems={items}
        />
      ) : (
        <DesktopNav navItems={items} />
      )}
      <Search />
    </header>
  );
}

const DesktopNav = ({ navItems }: any) => {
  return (
    <>
      <nav id="nav">
        {navItems.length &&
          navItems.map((item: NavigationItems, i: number) => {
            return (
              <>
                <Link key={item.alt} href={item.link}>
                  <Image width={90} height={90} src={item.src} alt={item.alt} />
                </Link>
                {navItems.length > i + 1 && '|'}
              </>
            );
          })}
      </nav>
    </>
  );
};

const MobileNav = ({ toggleNav, navItems }: any) => {
  return (
    <>
      <div
        className={`mobileNav ${toggleNav ? 'toggle' : ''}`}
        style={{ width: toggleNav ? `100%` : `0` }}
      >
        {navItems.map((item: NavigationItems, i: number) => {
          return (
            <Link key={item.alt} href={item.link}>
              <Image width={90} height={90} src={item.src} alt={item.alt} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
