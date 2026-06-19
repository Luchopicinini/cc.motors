'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import CardAuto from '@/components/CardAuto'
import FadeIn from '@/components/FadeIn'

export default function Home() {
  const [autos, setAutos] = useState<any[]>([])

  useEffect(() => {
    const fetchAutos = async () => {
      const { data } = await supabase.from('autos').select('*').order('id', { ascending: false }).limit(6)
      if (data) setAutos(data.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
    }
    fetchAutos()
  }, [])

  const beneficios = [
   
    { icono: '💳', titulo: 'Financiamiento flexible', desc: 'Planes personalizados con las mejores tasas del mercado.' },
    { icono: '🕐', titulo: 'Atención 24/7', desc: 'Soporte dedicado cuando lo necesites, sin importar la hora.' },
    { icono: '🏆', titulo: 'Certificación premium', desc: 'Cada vehículo supera 50 puntos de inspección rigurosa.' },
    { icono: '🎧', titulo: 'Asesor personal', desc: 'Un experto dedicado exclusivamente a tu búsqueda.' }
  ]

  return (
    <div className="bg-white">

      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-zinc-100 via-white to-white overflow-hidden pt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px bg-zinc-300"></span>
              <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Premium Collection</p>
              <span className="w-8 h-px bg-zinc-300"></span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.05] mb-8">
              Experiencia automotriz<br />CC Motors
            </h1>
            <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto mb-10">
              Vehículos seleccionados para quienes exigen lo extraordinario.
            </p>
            <Link href="/stock" className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors">
              Explorar vehículos
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-zinc-300"></span>
            <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Recién llegados</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">Lo más nuevo en nuestro catálogo</h2>
            <Link href="/stock" className="text-sm font-semibold text-black hover:text-zinc-500 transition-colors whitespace-nowrap">Ver todo →</Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos.map((auto, i) => (
            <FadeIn key={auto.id} delay={i * 0.08}>
              <CardAuto auto={auto} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-zinc-300"></span>
              <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Por qué elegirnos</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-3">Una experiencia premium<br />en cada detalle</h2>
            <p className="text-zinc-500 text-base mb-14 max-w-lg">Nos dedicamos a ofrecer el más alto estándar en cada paso del proceso.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FadeIn>
              <div className="bg-white border border-zinc-200 rounded-3xl p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-2xl mb-6">{beneficios[0].icono}</div>
                  <h3 className="text-black font-bold text-2xl mb-3">{beneficios[0].titulo}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{beneficios[0].desc}</p>
                </div>
                <Link href="/stock" className="text-black text-sm font-semibold mt-6 inline-flex items-center gap-2 hover:gap-3 transition-all">Conoce más →</Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {beneficios.slice(1, 3).map((b, i) => (
                <FadeIn key={b.titulo} delay={i * 0.1}>
                  <div className="bg-white border border-zinc-200 rounded-3xl p-7 h-full">
                    <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center text-xl mb-5">{b.icono}</div>
                    <h3 className="text-black font-bold text-base mb-2">{b.titulo}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {beneficios.slice(3).map((b, i) => (
              <FadeIn key={b.titulo} delay={i * 0.1}>
                <div className="bg-white border border-zinc-200 rounded-3xl p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center text-xl mb-5">{b.icono}</div>
                  <h3 className="text-black font-bold text-base mb-2">{b.titulo}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

<section className="bg-white text-black py-24 px-6">
  <div className="max-w-3xl mx-auto text-center">
    <FadeIn>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Tu próximo auto está más cerca de lo que crees.</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/stock" className="bg-black hover:bg-zinc-800 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors text-center">Ver catálogo</Link>
        <a href="https://wa.me/56988276054" target="_blank" rel="noopener noreferrer" className="border border-black/20 hover:border-black text-black font-semibold text-sm px-8 py-4 rounded-full transition-colors text-center">Escribir por WhatsApp</a>
      </div>
    </FadeIn>
  </div>
</section>

    </div>
  )
}