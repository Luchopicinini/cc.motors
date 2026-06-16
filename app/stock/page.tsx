'use client'
import { useState, useEffect } from 'react'
import CardAuto from '@/components/CardAuto'
import { supabase } from '@/lib/supabase'
import FadeIn from '@/components/FadeIn'

export default function Stock() {
  const [lista, setLista] = useState<any[]>([])
  const [marcaFiltro, setMarcaFiltro] = useState('Todas')
  const [precioFiltro, setPrecioFiltro] = useState('Todos')
  const [transmisionFiltro, setTransmisionFiltro] = useState('Todas')

  useEffect(() => {
    const fetchAutos = async () => {
      const { data } = await supabase.from('autos').select('*').order('id', { ascending: false })
      if (data) setLista(data.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
    }
    fetchAutos()
  }, [])

  const marcas = ['Todas', ...new Set(lista.map((a) => a.marca as string))]
  const transmisiones = ['Todas', ...new Set(lista.map((a) => a.transmision as string))]
  const precios = [
    { label: 'Todos', min: 0, max: Infinity },
    { label: 'Hasta $10M', min: 0, max: 10000000 },
    { label: '$10M - $15M', min: 10000000, max: 15000000 },
    { label: '$15M - $20M', min: 15000000, max: 20000000 },
    { label: 'Más de $20M', min: 20000000, max: Infinity },
  ]
  const autosFiltrados = lista.filter((auto) => {
    const rango = precios.find((p) => p.label === precioFiltro)!
    const cumpleMarca = marcaFiltro === 'Todas' || auto.marca === marcaFiltro
    const cumplePrecio = auto.precio >= rango.min && auto.precio <= rango.max
    const cumpleTransmision = transmisionFiltro === 'Todas' || auto.transmision === transmisionFiltro
    return cumpleMarca && cumplePrecio && cumpleTransmision
  })
  const selectClass = 'bg-white border border-zinc-200 hover:border-black text-black text-sm px-4 py-2.5 focus:outline-none focus:border-black transition-all cursor-pointer rounded-lg'

  return (
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-black">Vehículos disponibles</h1>
            <p className="text-zinc-400 text-sm mt-1"><span className="font-bold text-black">{autosFiltrados.length}</span> vehículos encontrados</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-zinc-50 rounded-xl p-4 flex flex-wrap gap-3 mb-8 items-center">
            <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)} className={selectClass}>{marcas.map((m) => <option key={m} value={m}>{m}</option>)}</select>
            <select value={precioFiltro} onChange={(e) => setPrecioFiltro(e.target.value)} className={selectClass}>{precios.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}</select>
            <select value={transmisionFiltro} onChange={(e) => setTransmisionFiltro(e.target.value)} className={selectClass}>{transmisiones.map((t) => <option key={t} value={t}>{t}</option>)}</select>
            {(marcaFiltro !== 'Todas' || precioFiltro !== 'Todos' || transmisionFiltro !== 'Todas') && (
              <button onClick={() => { setMarcaFiltro('Todas'); setPrecioFiltro('Todos'); setTransmisionFiltro('Todas') }} className="text-sm font-bold text-zinc-500 hover:text-black transition-colors px-3 py-2">Limpiar ✕</button>
            )}
          </div>
        </FadeIn>
        {autosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {autosFiltrados.map((auto, i) => (
              <FadeIn key={auto.id} delay={i * 0.04}>
                <CardAuto auto={auto} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center py-24">
              <p className="text-zinc-300 text-lg">No hay vehículos con esos filtros</p>
              <button onClick={() => { setMarcaFiltro('Todas'); setPrecioFiltro('Todos'); setTransmisionFiltro('Todas') }} className="mt-4 text-sm font-bold text-black hover:underline">Limpiar filtros</button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}