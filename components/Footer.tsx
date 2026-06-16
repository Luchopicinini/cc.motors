import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        <div className="py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">

          <div className="lg:col-span-2 flex flex-col overflow-hidden border border-zinc-800">
            <iframe src="https://maps.google.com/maps?q=Av+Apoquindo+7935+Las+Condes+Santiago&output=embed" width="100%" height="280" style={{border:0}} loading="lazy" className="grayscale opacity-60" />
            <div className="flex gap-2 p-3 bg-zinc-900">
              <a href="https://maps.google.com/?q=Av+Apoquindo+7935+Las+Condes+Santiago" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white hover:bg-zinc-100 text-black font-bold text-xs py-2.5 transition-colors text-center">Google Maps</a>
              <a href="https://waze.com/ul?q=Av+Apoquindo+7935+Las+Condes" target="_blank" rel="noopener noreferrer" className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold text-xs py-2.5 transition-colors text-center">Waze</a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-white text-black font-black text-sm px-3 py-1.5 tracking-widest">CC</div>
                <span className="font-bold text-white text-sm tracking-widest">MOTORS</span>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-zinc-400 text-sm">Av. Apoquindo 7935, Las Condes</p>
                <a href="tel:+56988276054" className="text-zinc-400 hover:text-white text-sm transition-colors">+56 9 8827 6054</a>
                <p className="text-zinc-400 text-sm">Lun–Sáb 9:00–19:00</p>
                <a href="https://www.instagram.com/ccmotors_" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white text-sm transition-colors">@ccmotors_</a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a href="https://wa.me/56988276054" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-zinc-100 text-black font-bold text-xs px-6 py-3 transition-colors text-center">Escribir por WhatsApp</a>
              <Link href="/stock" className="border border-zinc-700 hover:border-white text-white font-bold text-xs px-6 py-3 transition-colors text-center">Ver vehículos</Link>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-900 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex gap-6">
            {[['/', 'Inicio'], ['/stock', 'Vehículos'], ['/financiamiento', 'Financiamiento'], ['/contacto', 'Contacto']].map(([href, label]) => (
              <Link key={href} href={href} className="text-zinc-600 hover:text-white text-xs transition-colors">{label}</Link>
            ))}
          </div>
          <p className="text-zinc-700 text-xs">© 2025 CC Motors · Las Condes, Santiago</p>
        </div>

      </div>
    </footer>
  )
}