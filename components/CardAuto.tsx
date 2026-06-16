'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function CardAuto({ auto }: { auto: any }) {
  const [imgActual, setImgActual] = useState(0)

  const anterior = (e: React.MouseEvent) => { e.preventDefault(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }
  const siguiente = (e: React.MouseEvent) => { e.preventDefault(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }

  return (
    <Link href={"/stock/" + auto.id} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-100">
      <div className="relative overflow-hidden bg-zinc-100" style={{aspectRatio:'16/10'}}>
        {auto.imagenes.length > 0 ? (
          <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">SIN IMAGEN</div>
        )}
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">{auto.año}</div>
        {auto.imagenes.length > 1 && (
          <>
            <button onClick={anterior} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100">‹</button>
            <button onClick={siguiente} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100">›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {auto.imagenes.slice(0, 5).map((_: any, i: number) => (
                <span key={i} className={"w-1.5 h-1.5 rounded-full transition-all " + (i === imgActual ? 'bg-white' : 'bg-white/50')}></span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-black text-black text-base tracking-tight mb-1">{auto.marca} <span className="font-semibold text-zinc-600">{auto.modelo}</span></h3>
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-medium">{auto.km?.toLocaleString()} km</span>
          <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-medium">{auto.combustible}</span>
          <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-medium">{auto.transmision}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <p className="text-xl font-black text-black">${auto.precio?.toLocaleString('es-CL')}</p>
          <span className="text-xs text-zinc-400 group-hover:text-black transition-colors font-medium">Ver más →</span>
        </div>
      </div>
    </Link>
  )
}