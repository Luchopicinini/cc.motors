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

      <section className="relative min-h-screen flex items-end overflow-hidden bg-zinc-900" style={{backgroundImage:"url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')", backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-zinc-400 text-xs tracking-[0.4em] uppercase mb-6">Las Condes · Santiago · Chile</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none mb-6">
              El auto<br />que buscas<br /><span className="text-zinc-400">te espera.</span>
            </h1>
            <p className="text-zinc-300 text-base max-w-md mb-10 leading-relaxed">Vehículos premium con financiamiento, garantía y la mejor atención del mercado en Las Condes.</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <Link href="/stock" className="bg-white hover:bg-zinc-100 text-black font-bold text-sm px-10 py-4 transition-colors text-center">Ver vehículos</Link>
              <a href="https://wa.me/56988276054" target="_blank" rel="noopener noreferrer" className="border border-white/30 hover:border-white text-white font-bold text-sm px-10 py-4 transition-colors text-center">WhatsApp</a>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-sm border-t border-white/10 pt-8">
              {[{ num: '+50', label: 'Vehículos' }, { num: '+200', label: 'Clientes' }, { num: '5★', label: 'Google' }].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-white">{s.num}</p>
                  <p className="text-zinc-500 text-xs mt-1 tracking-widest uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase mb-2">Últimas incorporaciones</p>
              <h2 className="text-3xl font-black tracking-tight text-black">Stock reciente</h2>
            </div>
            <Link href="/stock" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors border-b border-black pb-0.5">Ver todo →</Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos.map((auto, i) => (
            <FadeIn key={auto.id} delay={i * 0.08}>
              <CardAuto auto={auto} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/stock" className="inline-block border border-black hover:bg-black hover:text-white text-black font-bold text-sm px-10 py-4 transition-colors">Ver stock completo</Link>
          </div>
        </FadeIn>
      </section>

      <section className="py-16 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
              {[
                { num: '01', titulo: 'Revisión completa', desc: 'Cada vehículo pasa por una inspección exhaustiva antes de publicarse en nuestro stock.' },
                { num: '02', titulo: 'Financiamiento', desc: 'Trabajamos con los mejores bancos para conseguirte la tasa más conveniente del mercado.' },
                { num: '03', titulo: 'Entrega en 48h', desc: 'Gestionamos toda la documentación para que puedas manejar tu auto en tiempo récord.' },
              ].map((item) => (
                <div key={item.num} className="bg-zinc-950 p-10">
                  <p className="text-zinc-700 font-black text-4xl mb-6">{item.num}</p>
                  <p className="font-black text-white text-lg mb-3">{item.titulo}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="bg-zinc-950 text-white p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-3">¿Listo para comenzar?</p>
                <h2 className="text-4xl font-black tracking-tight">Tu próximo auto<br />está a un click.</h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/stock" className="bg-white hover:bg-zinc-100 text-black font-bold text-sm px-8 py-4 transition-colors text-center">Ver stock</Link>
                <a href="https://wa.me/56988276054" target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-white text-white font-bold text-sm px-8 py-4 transition-colors text-center">WhatsApp</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}