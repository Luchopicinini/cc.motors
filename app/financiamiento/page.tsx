'use client'
import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function Financiamiento() {
  const [precio, setPrecio] = useState('')
  const [pie, setPie] = useState('')
  const [plazo, setPlazo] = useState('48')

  const precioNum = parseInt(precio.replace(/\./g, '').replace(/,/g, '')) || 0
  const pieNum = parseInt(pie.replace(/\./g, '').replace(/,/g, '')) || 0
  const monto = precioNum - pieNum
  const tasa = 0.0185
  const plazoNum = parseInt(plazo)
  const cuota = monto > 0 ? Math.round((monto * tasa) / (1 - Math.pow(1 + tasa, -plazoNum))) : 0
  const totalPagar = cuota * plazoNum + pieNum
  const totalIntereses = totalPagar - precioNum
  const formatear = (n: number) => n.toLocaleString('es-CL')
  const porcentajePie = precioNum > 0 ? Math.round((pieNum / precioNum) * 100) : 0

  const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '').replace(/,/g, '').replace(/\D/g, '')
    setPrecio(raw ? parseInt(raw).toLocaleString('es-CL') : '')
  }
  const handlePie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '').replace(/,/g, '').replace(/\D/g, '')
    setPie(raw ? parseInt(raw).toLocaleString('es-CL') : '')
  }

  return (
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-black">Financiamiento</h1>
            <p className="text-zinc-400 text-sm mt-1">Calcula tu cuota y consulta con nuestro equipo.</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeIn delay={0.1}>
            <div className="bg-zinc-50 rounded-xl p-8 flex flex-col gap-6">
              <p className="font-black text-black text-lg">Calculadora de cuota</p>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-2">PRECIO DEL AUTO</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input type="text" value={precio} onChange={handlePrecio} placeholder="0" className="w-full bg-white border border-zinc-200 focus:border-black text-black pl-8 pr-4 py-3 text-lg font-bold outline-none transition-all rounded-lg" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">PIE — {porcentajePie}% <span className="text-zinc-300 font-normal">(mínimo 20%)</span></label>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input type="text" value={pie} onChange={handlePie} placeholder="0" className="w-full bg-white border border-zinc-200 focus:border-black text-black pl-8 pr-4 py-3 text-lg font-bold outline-none transition-all rounded-lg" />
                </div>
                <div className="flex gap-2">
                  {[20, 30, 40].map((p) => (
                    <button key={p} onClick={() => setPie(precioNum > 0 ? Math.round(precioNum * p / 100).toLocaleString('es-CL') : '')} className="text-xs border border-zinc-200 hover:border-black hover:bg-black hover:text-white text-zinc-500 px-3 py-1.5 rounded-lg transition-all font-bold">{p}%</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-3">PLAZO</label>
                <div className="grid grid-cols-3 gap-2">
                  {['24', '36', '48'].map((p) => (
                    <button key={p} onClick={() => setPlazo(p)} className={"py-3 text-sm font-bold transition-all rounded-lg border " + (plazo === p ? 'bg-black border-black text-white' : 'bg-white border-zinc-200 hover:border-black text-zinc-500')}>{p} meses</button>
                  ))}
                </div>
              </div>
              <div className="bg-black text-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Monto financiado</p>
                    <p className="text-white font-bold">${formatear(monto)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-400 text-xs mb-1">Tasa referencial</p>
                    <p className="text-white font-bold">1,85% mensual</p>
                  </div>
                </div>
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-zinc-400 text-xs mb-1">Cuota estimada</p>
                  <p className="text-4xl font-black">${formatear(cuota)}<span className="text-lg font-normal text-zinc-400">/mes</span></p>
                </div>
                {cuota > 0 && (
                  <div className="border-t border-zinc-800 pt-4 mt-4 flex gap-6">
                    <div><p className="text-zinc-500 text-xs">Total a pagar</p><p className="text-white font-bold text-sm">${formatear(totalPagar)}</p></div>
                    <div><p className="text-zinc-500 text-xs">Intereses</p><p className="text-white font-bold text-sm">${formatear(totalIntereses)}</p></div>
                  </div>
                )}
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">Cálculo referencial. Tasa mínima 1,85% mensual y pie mínimo 20%. La cuota real depende del banco y tu perfil crediticio.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-6">
              <div className="bg-zinc-50 rounded-xl p-8">
                <p className="font-black text-black text-lg mb-6">¿Cómo funciona?</p>
                <div className="flex flex-col gap-6">
                  {[
                    { num: '01', titulo: 'Elige tu auto', desc: 'Navega nuestro stock y encuentra el vehículo que más te gusta.' },
                    { num: '02', titulo: 'Simula tu cuota', desc: 'Usa la calculadora para estimar tu cuota mensual.' },
                    { num: '03', titulo: 'Contáctanos', desc: 'Nuestro equipo gestiona el crédito con los mejores bancos.' },
                    { num: '04', titulo: 'Maneja tu auto', desc: 'Coordinamos la entrega rápida con toda la documentación.' },
                  ].map((paso) => (
                    <div key={paso.num} className="flex gap-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{paso.num}</div>
                      <div>
                        <p className="font-bold text-black text-sm">{paso.titulo}</p>
                        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{paso.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-50 rounded-xl p-8">
                <p className="font-black text-black text-lg mb-2">Trabajamos con los mejores bancos</p>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Convenios con las principales instituciones financieras de Chile para conseguirte la mejor tasa posible.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/56988276054?text=Hola, quiero consultar sobre financiamiento" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-zinc-800 text-white font-bold text-sm px-6 py-4 transition-colors text-center rounded-xl">Consultar por WhatsApp</a>
                  <Link href="/contacto" className="border border-zinc-200 hover:border-black text-black font-bold text-sm px-6 py-4 transition-colors text-center rounded-xl">Formulario de contacto</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}