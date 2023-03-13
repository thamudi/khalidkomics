import { NavigationItems } from '@/types/nav.type';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ items }: any) {
  const [isMobile, setIsMobile] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  // List of items that will show in the navigation bar

  // Observable to check if the we are on mobile on not
  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  // Observable to always check if a resize of the browser occurred
  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      if (e.currentTarget.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setToggleNav(false);
      }
    });
  });

  return (
    <header>
      <div className="flex w-full justify-between md:justify-center mx-8 ">
        <Link href="/">
          <Image
            className="logo "
            width={200}
            height={200}
            src="/img/site_icons_logo_full_white.svg"
            alt=""
            priority
          />
        </Link>
        {isMobile && (
          <Image
            className="animate-wiggle"
            width={45}
            height={45}
            src="/img/nav/hamburger.svg"
            alt=""
            onClick={() => setToggleNav(!toggleNav)}
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
    </header>
  );
}

// Desktop Nav Component
const DesktopNav = ({ navItems }: any) => {
  return (
    <>
      <nav id="nav">
        {navItems.length &&
          navItems.map((item: NavigationItems, i: number) => {
            return (
              <div key={item.alt} className="flex">
                <Link href={item.link}>
                  <Image width={90} height={90} src={item.src} alt={item.alt} />
                </Link>
                {navItems.length > i + 1 && '|'}
              </div>
            );
          })}
      </nav>
    </>
  );
};

// Mobile Nav Component
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
