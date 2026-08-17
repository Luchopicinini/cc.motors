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

          {/* Acá va tu grid de features/cards si tenías contenido pensado para esta sección */}

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