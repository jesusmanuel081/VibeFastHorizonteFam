import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import config from "@/config"
import Logo from "@/components/Logo"

function NavItem({ item, mobile = false }) {
  if (item.children?.length) {
    return (
      <div className="dropdown dropdown-hover">
        <label
          tabIndex={0}
          className="flex cursor-pointer items-center gap-1 text-sm text-base-content/70 transition hover:text-base-content"
        >
          {item.label}
          <ChevronDown className="size-3.5" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-50 mt-2 w-56 rounded-box border border-base-200 bg-base-100 p-2 shadow"
        >
          {item.children.map((child) => (
            <li key={child.href}>
              <Link href={child.href}>{child.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (mobile) {
    return (
      <li>
        <Link href={item.href}>{item.label}</Link>
      </li>
    )
  }

  return (
    <li>
      <Link
        href={item.href}
        className="text-sm text-base-content/70 transition hover:text-base-content"
      >
        {item.label}
      </Link>
    </li>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-200 bg-base-100/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Menú móvil */}
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm px-2" aria-label="Abrir menú">
              <Menu className="size-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-2 w-64 rounded-box border border-base-200 bg-base-100 p-2 shadow"
            >
              {config.landing.nav.map((item) => (
                <NavItem key={item.href} item={item} mobile />
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Logo className="size-7" />
            {config.brand.logoText}
          </Link>
        </div>

        <ul className="hidden items-center gap-5 lg:flex">
          {config.landing.nav.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {config.features.googleAuth && (
            <Link href={config.auth.loginUrl} className="btn btn-sm btn-ghost">
              Entrar
            </Link>
          )}
          <Link href="/contacto" className="btn btn-sm btn-accent">
            Contáctanos
          </Link>
        </div>
      </nav>
    </header>
  )
}
