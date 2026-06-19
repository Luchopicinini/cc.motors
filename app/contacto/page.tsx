'use client'
import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setForm({ ...form, [e.target.name]: e.target.value }) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('https://formspree.io/f/xnjybkja', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) setEnviado(true)
  }

  const IconoWhatsapp = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
  )
  const IconoPin = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  )
  const IconoReloj = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )
  const IconoInstagram = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )

  const contactos = [
    { label: 'WhatsApp', valor: '+56 9 8827 6054', sub: 'Respuesta inmediata', href: 'https://wa.me/56988276054', icono: <IconoWhatsapp /> },
    { label: 'Dirección', valor: 'Av. Apoquindo 7935', sub: 'Las Condes, Santiago', href: 'https://maps.google.com/?q=Av+Apoquindo+7935+Las+Condes', icono: <IconoPin /> },

    { label: 'Instagram', valor: '@ccmotors.cl', sub: 'Síguenos', href: 'https://www.instagram.com/ccmotors.cl', icono: <IconoInstagram /> },
  ]

  return (
    <div className="bg-white min-h-screen">

      <section className="pt-32 pb-16 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <FadeIn>
            <p className="text-xs text-zinc-400 tracking-[0.3em] uppercase mb-3">CC Motors · Las Condes</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black">Contáctanos</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="https://wa.me/56988276054" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-black hover:bg-zinc-800 hover:scale-105 text-white font-bold text-sm px-8 py-4 rounded-full transition-all shadow-lg shadow-black/20">
              <IconoWhatsapp />
              Escribir por WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4">
              {contactos.map((item) => (
                <div key={item.label} className="bg-zinc-50 hover:bg-zinc-100 rounded-3xl p-5 transition-colors flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0">{item.icono}</div>
                  <div>
                    <p className="text-xs text-zinc-400 tracking-widest uppercase mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-black font-bold text-base hover:text-zinc-500 transition-colors block leading-tight">{item.valor}</a>
                    ) : (
                      <p className="text-black font-bold text-base leading-tight">{item.valor}</p>
                    )}
                    <p className="text-zinc-400 text-xs mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-zinc-200">
                <iframe src="https://maps.google.com/maps?q=Av+Apoquindo+7935+Las+Condes+Santiago&output=embed" width="100%" height="220" style={{border:0}} loading="lazy" className="grayscale" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            {enviado ? (
              <div className="bg-zinc-50 rounded-3xl p-16 text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-2xl font-black text-black mb-2">Mensaje enviado</p>
                <p className="text-zinc-400 text-sm">Te contactaremos a la brevedad. Tiempo de respuesta estimado: menos de 1 hora.</p>
              </div>
            ) : (
              <div className="bg-zinc-50 rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <p className="text-black font-black text-xl">Formulario de contacto</p>
                  <span className="text-xs text-zinc-400 tracking-widest hidden sm:block">Todos los campos son obligatorios</span>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Juan Pérez' },
                      { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+56 9 1234 5678' },
                    ].map((campo) => (
                      <div key={campo.name}>
                        <label className="text-xs font-bold text-zinc-500 tracking-widest uppercase block mb-3">{campo.label}</label>
                        <input type={campo.type} name={campo.name} placeholder={campo.placeholder} onChange={handleChange} required className="w-full bg-white border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/10 rounded-2xl text-black px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-300" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 tracking-widest uppercase block mb-3">Email</label>
                    <input type="email" name="email" placeholder="tu@email.com" onChange={handleChange} required className="w-full bg-white border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/10 rounded-2xl text-black px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-300" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 tracking-widest uppercase block mb-3">Mensaje</label>
                    <textarea name="mensaje" placeholder="Cuéntanos en qué te podemos ayudar..." onChange={handleChange} required rows={5} className="w-full bg-white border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/10 rounded-2xl text-black px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-300 resize-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-zinc-400 text-xs">Respondemos en menos de 1 hora en horario de atención.</p>
                    <button type="submit" className="bg-black hover:bg-zinc-800 hover:scale-105 text-white font-bold text-sm px-10 py-4 rounded-full transition-all shadow-lg shadow-black/20 flex-shrink-0 w-full sm:w-auto">Enviar →</button>
                  </div>
                </form>
              </div>
            )}
          </FadeIn>

        </div>
      </section>

    </div>
  )
}