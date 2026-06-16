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
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black text-white font-black text-sm px-3 py-1.5 tracking-widest">CC</div>
          <span className="font-bold text-black text-sm tracking-widest">MOTORS</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-600 hover:text-black text-sm font-medium transition-colors">{l.label}</Link>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuAbierto(!menuAbierto)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-black transition-all ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${menuAbierto ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>
      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-600 hover:text-black text-sm font-medium" onClick={() => setMenuAbierto(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}