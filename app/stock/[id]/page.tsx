'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import FadeIn from '@/components/FadeIn'

export default function DetalleAuto() {
  const params = useParams()
  const id = params?.id
  const [auto, setAuto] = useState<any>(null)
  const [similares, setSimilares] = useState<any[]>([])
  const [imgActual, setImgActual] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const fetchAuto = async () => {
      const { data } = await supabase.from('autos').select('*').eq('id', id).single()
      if (data) {
        const autoData = { ...data, imagenes: data.imagenes ? data.imagenes.split(',') : [] }
        setAuto(autoData)
        const { data: sim } = await supabase.from('autos').select('*').eq('marca', data.marca).neq('id', id).limit(3)
        if (sim && sim.length > 0) {
          setSimilares(sim.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
        } else {
          const { data: otros } = await supabase.from('autos').select('*').neq('id', id).order('id', { ascending: false }).limit(3)
          if (otros) setSimilares(otros.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
        }
      }
    }
    fetchAuto()
  }, [id])

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (!auto) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-zinc-300 text-xs tracking-widest">CARGANDO...</p>
    </div>
  )

  const msgWhatsapp = "https://wa.me/56988276054?text=Hola me interesa el " + auto.marca + " " + auto.modelo + " " + auto.año

  const IconoCalendario = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  )
  const IconoVelocimetro = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v4"/><path d="M12 12l5-3"/><path d="M2 12h4"/><path d="M18.5 5.5l-2.8 2.8"/></svg>
  )
  const IconoTransmision = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="9" rx="2"/><path d="M12 11v9"/><path d="M8 20h8"/><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/></svg>
  )
  const IconoCombustible = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
  )
  const IconoColor = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12.5" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
  )

  const specs = [
    { label: 'Año', valor: auto.año, icono: <IconoCalendario /> },
    { label: 'Kilometraje', valor: auto.km?.toLocaleString() + ' km', icono: <IconoVelocimetro /> },
    { label: 'Combustible', valor: auto.combustible, icono: <IconoCombustible /> },
    { label: 'Transmisión', valor: auto.transmision, icono: <IconoTransmision /> },
    { label: 'Color', valor: auto.color, icono: <IconoColor /> },
  ]

  return (
    <section className="min-h-screen pt-28 pb-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <Link href="/stock" className="text-xs tracking-widest text-zinc-400 hover:text-black transition-colors mb-12 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> VOLVER AL CATÁLOGO
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn delay={0.1}>
            <div>
              <div className="relative overflow-hidden bg-zinc-100 rounded-3xl cursor-zoom-in shadow-xl shadow-zinc-200" style={{aspectRatio:'4/3'}} onClick={() => setLightbox(true)}>
                {auto.imagenes.length > 0 ? (
                  <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs tracking-widest">SIN IMAGEN</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                {auto.vendido && (
                  <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    Vendido
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white hover:bg-zinc-100 text-black text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-colors">Ampliar</div>
                {auto.imagenes.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white hover:scale-110 flex items-center justify-center text-black transition-all shadow-lg">‹</button>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white hover:scale-110 flex items-center justify-center text-black transition-all shadow-lg">›</button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-6 gap-2 mt-3">
                {auto.imagenes.slice(0, 6).map((img: string, i: number) => (
                  <button key={i} onClick={() => setImgActual(i)} className={"overflow-hidden rounded-xl transition-all hover:scale-105 " + (i === imgActual ? "ring-2 ring-black ring-offset-2" : "opacity-50 hover:opacity-100")} style={{aspectRatio:'1'}}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              {auto.imagenes.length > 6 && <p className="text-zinc-400 text-xs mt-2 tracking-widest">+{auto.imagenes.length - 6} FOTOS MÁS</p>}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs tracking-widest text-zinc-400 mb-2 uppercase font-semibold">{auto.marca}</p>
                <h1 className="text-5xl font-black tracking-tight text-black leading-[1.05]">{auto.modelo}</h1>
              </div>

              <div className="bg-black rounded-3xl px-7 py-6">
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Precio</p>
                <p className="text-4xl font-black text-white">${auto.precio?.toLocaleString('es-CL')}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {specs.map((item) => (
                  <div key={item.label} className="bg-zinc-50 hover:bg-zinc-100 rounded-2xl p-4 transition-colors flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">{item.icono}</div>
                    <div>
                      <p className="text-[10px] text-zinc-400 tracking-widest uppercase">{item.label}</p>
                      <p className="text-black font-bold text-sm">{item.valor}</p>
                    </div>
                  </div>
                ))}
              </div>

              {auto.descripcion && (
                <div className="border-t border-zinc-100 pt-6">
                  <p className="text-xs text-zinc-400 tracking-widest uppercase mb-3">Descripción</p>
                  <div className="bg-zinc-50 rounded-2xl p-5 max-h-32 overflow-y-auto">
                    <p className="text-zinc-600 text-sm leading-relaxed">{auto.descripcion}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <a href={msgWhatsapp} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-zinc-800 hover:scale-[1.02] text-white font-semibold text-sm px-8 py-4 rounded-full transition-all text-center shadow-lg shadow-black/20">Consultar por WhatsApp</a>
                <Link href="/contacto" className="border-2 border-zinc-200 hover:border-black text-black font-semibold text-sm px-8 py-4 rounded-full transition-all text-center">Formulario de contacto</Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {similares.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-24 border-t border-zinc-100 pt-16">
              <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase mb-2">Puede que te interese</p>
              <h2 className="text-3xl font-black tracking-tight mb-10 text-black">Vehículos similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similares.map((sim) => (
                  <Link key={sim.id} href={"/stock/" + sim.id} className="group block bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:border-black hover:shadow-xl hover:shadow-zinc-200 transition-all">
                    <div className="overflow-hidden bg-zinc-100 rounded-2xl m-2" style={{aspectRatio:'16/10'}}>
                      {sim.imagenes.length > 0 ? (
                        <img src={sim.imagenes[0]} alt={sim.marca} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">SIN IMAGEN</div>
                      )}
                    </div>
                    <div className="px-5 pb-5 pt-3">
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-0.5">{sim.marca}</p>
                      <h3 className="font-bold text-black text-base mb-2">{sim.modelo}</h3>
                      <div className="flex justify-between items-end pt-3 border-t border-zinc-100">
                        <p className="text-zinc-400 text-xs">{sim.año} · {sim.km?.toLocaleString()} km</p>
                        <p className="font-black text-black">${sim.precio?.toLocaleString('es-CL')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col" onClick={() => setLightbox(false)}>
          <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-800">
            <span className="text-white text-xs tracking-widest font-bold">{auto.marca} {auto.modelo}</span>
            <button onClick={() => setLightbox(false)} className="text-zinc-400 hover:text-white text-xl transition-all">✕</button>
          </div>
          <div className="flex-1 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
            <img src={auto.imagenes[imgActual]} alt={auto.marca} className="max-h-[80vh] max-w-[90vw] object-contain" />
            {auto.imagenes.length > 1 && (
              <>
                <button onClick={() => setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-zinc-700 hover:border-white text-white flex items-center justify-center transition-all">‹</button>
                <button onClick={() => setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-zinc-700 hover:border-white text-white flex items-center justify-center transition-all">›</button>
              </>
            )}
          </div>
          <div className="px-8 py-4 border-t border-zinc-800 flex gap-3 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {auto.imagenes.map((img: string, i: number) => (
              <button key={i} onClick={() => setImgActual(i)} className={"flex-shrink-0 w-16 h-12 overflow-hidden rounded-lg transition-all " + (i === imgActual ? "ring-2 ring-white" : "opacity-40 hover:opacity-100")}>
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-xs py-3 tracking-widest">{imgActual + 1} / {auto.imagenes.length}</p>
        </div>
      )}
    </section>
  )
}