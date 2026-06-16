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
        if (sim) setSimilares(sim.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
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
  const specs = [
    { label: 'Año', valor: auto.año },
    { label: 'Kilometraje', valor: auto.km?.toLocaleString() + ' km' },
    { label: 'Combustible', valor: auto.combustible },
    { label: 'Transmisión', valor: auto.transmision },
    { label: 'Color', valor: auto.color },
  ]

  return (
    <section className="min-h-screen pt-28 pb-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <Link href="/stock" className="text-xs tracking-widest text-zinc-400 hover:text-black transition-colors mb-12 inline-block">← VOLVER</Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn delay={0.1}>
            <div>
              <div className="relative overflow-hidden bg-zinc-100 cursor-zoom-in" style={{aspectRatio:'4/3'}} onClick={() => setLightbox(true)}>
                {auto.imagenes.length > 0 ? (
                  <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs tracking-widest">SIN IMAGEN</div>
                )}
                <div className="absolute bottom-3 right-3 bg-white text-black text-xs px-3 py-1 tracking-widest">AMPLIAR</div>
                {auto.imagenes.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center text-black transition-all">‹</button>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center text-black transition-all">›</button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-6 gap-2 mt-3">
                {auto.imagenes.slice(0, 6).map((img: string, i: number) => (
                  <button key={i} onClick={() => setImgActual(i)} className={"overflow-hidden transition-all " + (i === imgActual ? "ring-1 ring-black" : "opacity-50 hover:opacity-100")} style={{aspectRatio:'1'}}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              {auto.imagenes.length > 6 && <p className="text-zinc-400 text-xs mt-2 tracking-widest">+{auto.imagenes.length - 6} FOTOS MÁS</p>}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs tracking-widest text-zinc-400 mb-2">{auto.año}</p>
                <h1 className="text-5xl font-black tracking-tighter text-black leading-none">{auto.marca}<br /><span className="font-light text-zinc-400">{auto.modelo}</span></h1>
                <p className="text-4xl font-black text-black mt-6">${auto.precio?.toLocaleString('es-CL')}</p>
              </div>

              <div className="border-t border-zinc-100 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-zinc-400 tracking-widest uppercase mb-1">{item.label}</p>
                      <p className="text-black font-bold text-sm">{item.valor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {auto.descripcion && (
                <div className="border-t border-zinc-100 pt-6">
                  <p className="text-xs text-zinc-400 tracking-widest uppercase mb-3">DESCRIPCIÓN</p>
                  <div className="max-h-32 overflow-y-auto">
                    <p className="text-zinc-500 text-sm leading-relaxed">{auto.descripcion}</p>
                  </div>
                </div>
              )}

              <div className="border-t border-zinc-100 pt-6 flex flex-col gap-3">
                <a href={msgWhatsapp} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-8 py-4 tracking-widest transition-all text-center">CONSULTAR POR WHATSAPP</a>
                <Link href="/contacto" className="border border-zinc-200 hover:border-black text-black font-bold text-xs px-8 py-4 tracking-widest transition-all text-center">FORMULARIO DE CONTACTO</Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {similares.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-24 border-t border-zinc-100 pt-16">
              <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase mb-2">Puede que te interese</p>
              <h2 className="text-3xl font-black tracking-tighter mb-10">SIMILARES<span className="font-light text-zinc-300"> DISPONIBLES</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {similares.map((sim) => (
                  <Link key={sim.id} href={"/stock/" + sim.id} className="group block">
                    <div className="overflow-hidden bg-zinc-100" style={{aspectRatio:'16/9'}}>
                      {sim.imagenes.length > 0 ? (
                        <img src={sim.imagenes[0]} alt={sim.marca} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">SIN IMAGEN</div>
                      )}
                    </div>
                    <div className="pt-4 border-b border-zinc-100 pb-4">
                      <p className="text-xs text-zinc-400 tracking-widest mb-1">{sim.año} · {sim.km?.toLocaleString()} KM</p>
                      <div className="flex justify-between items-end">
                        <h3 className="font-black text-black">{sim.marca} <span className="font-light">{sim.modelo}</span></h3>
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
                <button onClick={() => setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-700 hover:border-white text-white flex items-center justify-center transition-all">‹</button>
                <button onClick={() => setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-700 hover:border-white text-white flex items-center justify-center transition-all">›</button>
              </>
            )}
          </div>
          <div className="px-8 py-4 border-t border-zinc-800 flex gap-3 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {auto.imagenes.map((img: string, i: number) => (
              <button key={i} onClick={() => setImgActual(i)} className={"flex-shrink-0 w-16 h-12 overflow-hidden transition-all " + (i === imgActual ? "ring-1 ring-white" : "opacity-40 hover:opacity-100")}>
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