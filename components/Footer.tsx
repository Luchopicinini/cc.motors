import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">

        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link href="/" className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl tracking-tight text-white">CC</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white self-end pb-1">Motors</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Selección de vehículos premium en Las Condes, con la transparencia y el respaldo que mereces.
            </p>

          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2">Contacto</p>
            <p className="text-zinc-400 text-sm">Av. Apoquindo 7935<br />Las Condes, Santiago</p>
            <a href="tel:+56988276054" className="text-white text-sm font-medium hover:text-zinc-400 transition-colors">+56 9 8827 6054</a>
     
            <a href="https://www.instagram.com/ccmotors.cl" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-zinc-400 transition-colors">@ccmotors.cl</a>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2">Navegación</p>
            {[['/', 'Inicio'], ['/stock', 'Vehículos'], ['/financiamiento', 'Financiamiento'], ['/contacto', 'Contacto']].map(([href, label]) => (
              <Link key={href} href={href} className="text-zinc-400 hover:text-white text-sm transition-colors">{label}</Link>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2">Cómo llegar</p>
            <div className="overflow-hidden border border-zinc-800">
              <iframe src="https://maps.google.com/maps?q=Av+Apoquindo+7935+Las+Condes+Santiago&output=embed" width="100%" height="160" style={{border:0}} loading="lazy" className="grayscale opacity-80" />
            </div>
            <div className="flex gap-2">
              <a href="https://maps.google.com/?q=Av+Apoquindo+7935+Las+Condes+Santiago" target="_blank" rel="noopener noreferrer" className="flex-1 border border-zinc-700 hover:border-white text-white font-medium text-xs py-2 transition-colors text-center">Maps</a>
              <a href="https://waze.com/ul?q=Av+Apoquindo+7935+Las+Condes" target="_blank" rel="noopener noreferrer" className="flex-1 border border-zinc-700 hover:border-white text-white font-medium text-xs py-2 transition-colors text-center">Waze</a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-900 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">© 2026 CC Motors — Las Condes, Santiago</p>
          
        </div>

      </div>
    </footer>
  )
}