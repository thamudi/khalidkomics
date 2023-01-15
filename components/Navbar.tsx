import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header>
      <div>
        <a href="index.html">
          <Image className="logo" width={500} height={500} src="/img/logo.png" alt="" />
        </a>
      </div>

      <nav id="nav">
        <Link href="/">HOME</Link> |
        <Link href="/comics">COMICS</Link> |
        <Link href="/archive">ARCHIVE</Link> |
        <Link href="/about">ABOUT</Link> |
        <Link href="https://khalidkomics.secure-decoration.com/">Store</Link> |
        <Link href="about.html">عربي</Link>
      </nav>
    </header>
  )
}
