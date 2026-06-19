'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function CardAuto({ auto }: { auto: any }) {
  const [imgActual, setImgActual] = useState(0)

  const anterior = (e: React.MouseEvent) => { e.preventDefault(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }
  const siguiente = (e: React.MouseEvent) => { e.preventDefault(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }

  const IconoCalendario = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  )
  const IconoVelocimetro = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v4"/><path d="M12 12l5-3"/><path d="M2 12h4"/><path d="M18.5 5.5l-2.8 2.8"/></svg>
  )
  const IconoTransmision = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="9" rx="2"/><path d="M12 11v9"/><path d="M8 20h8"/><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/></svg>
  )
  const IconoCombustible = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
  )

  return (
    <Link href={"/stock/" + auto.id} className="group block bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:border-zinc-300 transition-colors">
      <div className="relative overflow-hidden bg-zinc-100 rounded-2xl m-2" style={{aspectRatio:'16/10'}}>
        {auto.imagenes.length > 0 ? (
          <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">SIN IMAGEN</div>
        )}
        <div className="absolute top-3 left-3 bg-white/95 text-black text-xs font-bold px-3 py-1.5 rounded-full">Recién llegado</div>
        {auto.vendido && (
          <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
            Vendido
          </div>
        )}
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

      <div className="px-5 pb-5 pt-3">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-0.5">{auto.marca}</p>
        <h3 className="font-bold text-black text-lg tracking-tight mb-3">{auto.modelo}</h3>
        <p className="text-2xl font-black text-black mb-4">${auto.precio?.toLocaleString('es-CL')}</p>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            <span className="text-zinc-400"><IconoCalendario /></span> {auto.año}
          </div>
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            <span className="text-zinc-400"><IconoVelocimetro /></span> {auto.km?.toLocaleString()} km
          </div>
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            <span className="text-zinc-400"><IconoTransmision /></span> {auto.transmision}
          </div>
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            <span className="text-zinc-400"><IconoCombustible /></span> {auto.combustible}
          </div>
        </div>

        <div className="mt-5 bg-black group-hover:bg-zinc-800 text-white text-sm font-semibold py-3.5 rounded-full text-center transition-colors">
          Ver detalle
        </div>
      </div>
    </Link>
  )
}