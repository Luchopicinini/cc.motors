import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'CC Motors',
  description: 'Vehículos premium en Santiago',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-white">
      <body className={`${geist.className} ${playfair.variable} bg-white text-black`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}