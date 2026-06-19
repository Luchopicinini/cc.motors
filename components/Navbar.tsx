'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/stock', label: 'Vehículos' },
    { href: '/financiamiento', label: 'Financiamiento' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-3xl tracking-tight text-black">CC</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-black self-end pb-1">Motors</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-500 hover:text-black text-sm font-medium transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuAbierto(!menuAbierto)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-black transition-all ${menuAbierto ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-px bg-black transition-all ${menuAbierto ? '-rotate-45 -translate-y-0' : ''}`}></span>
          </div>
        </button>
      </div>
      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-500 hover:text-black text-sm font-medium" onClick={() => setMenuAbierto(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}