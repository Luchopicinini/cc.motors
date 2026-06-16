import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CC Motors',
  description: 'Vehículos premium en Santiago',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-white">
      <body className={`${geist.className} bg-white text-black`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}