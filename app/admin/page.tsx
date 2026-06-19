'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function ImagenSortable({ url, index, onEliminar }: { url: string, index: number, onEliminar: (i: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: url })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div {...attributes} {...listeners} className="w-20 h-14 overflow-hidden border border-zinc-200 cursor-grab active:cursor-grabbing">
        <img src={url} alt="" className="w-full h-full object-cover" />
      </div>
      <button onClick={() => onEliminar(index)} className="absolute -top-1 -right-1 bg-black text-white w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all">x</button>
      <p className="text-zinc-400 text-xs text-center mt-1">{index + 1}</p>
    </div>
  )
}

export default function Admin() {
  const [autos, setAutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [subiendo, setSubiendo] = useState(false)
  const [fotos, setFotos] = useState<File[]>([])
  const [editando, setEditando] = useState<any>(null)
  const [imagenesEditando, setImagenesEditando] = useState<string[]>([])
  const [form, setForm] = useState({ marca: '', modelo: '', año: '', precio: '', km: '', combustible: 'Bencina', transmision: 'Automatico', color: '', descripcion: '' })
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/admin/login'); return }
      fetchAutos()
    }
    checkAuth()
  }, [])

  const fetchAutos = async () => {
    const { data } = await supabase.from('autos').select('*').order('id', { ascending: false })
    setAutos(data || [])
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFotos(Array.from(e.target.files))
  }

  const handleEditar = (auto: any) => {
    setEditando(auto)
    setImagenesEditando(auto.imagenes ? auto.imagenes.split(',') : [])
    setForm({ marca: auto.marca, modelo: auto.modelo, año: auto.año, precio: auto.precio, km: auto.km, combustible: auto.combustible, transmision: auto.transmision, color: auto.color, descripcion: auto.descripcion })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelar = () => {
    setEditando(null)
    setImagenesEditando([])
    setForm({ marca: '', modelo: '', año: '', precio: '', km: '', combustible: 'Bencina', transmision: 'Automatico', color: '', descripcion: '' })
    setFotos([])
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleEliminarImagen = (i: number) => {
    setImagenesEditando(imagenesEditando.filter((_, idx) => idx !== i))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = imagenesEditando.indexOf(active.id)
      const newIndex = imagenesEditando.indexOf(over.id)
      setImagenesEditando(arrayMove(imagenesEditando, oldIndex, newIndex))
    }
  }

  const comprimirImagen = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      img.onload = () => {
        const maxW = 1200
        const ratio = Math.min(maxW / img.width, 1)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: 'image/jpeg' }))
        }, 'image/jpeg', 0.75)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubiendo(true)
    const urls: string[] = []
    const carpeta = form.marca.toLowerCase() + '-' + form.modelo.toLowerCase().replace(/ /g, '-') + '-' + form.año

    for (const foto of fotos) {
      const nombre = carpeta + '/' + Date.now() + '-' + foto.name.replace(/ /g, '-')
      const fotoComprimida = await comprimirImagen(foto)
      const { error } = await supabase.storage.from('autos').upload(nombre, fotoComprimida)
      if (!error) {
        const { data } = supabase.storage.from('autos').getPublicUrl(nombre)
        urls.push(data.publicUrl)
      }
    }

    if (editando) {
      const imagenesFinales = fotos.length > 0 ? [...imagenesEditando, ...urls].join(',') : imagenesEditando.join(',')
      await supabase.from('autos').update({ ...form, año: parseInt(form.año), precio: parseInt(form.precio), km: parseInt(form.km), imagenes: imagenesFinales }).eq('id', editando.id)
    } else {
      await supabase.from('autos').insert([{ ...form, año: parseInt(form.año), precio: parseInt(form.precio), km: parseInt(form.km), imagenes: urls.join(',') }])
    }

    handleCancelar()
    fetchAutos()
    setSubiendo(false)
  }

  const handleEliminar = async (id: number) => {
    if (!confirm('Seguro que quieres eliminar este auto?')) return
    await supabase.from('autos').delete().eq('id', id)
    fetchAutos()
  }

  const handleVendido = async (auto: any) => {
    await supabase.from('autos').update({ vendido: !auto.vendido }).eq('id', auto.id)
    fetchAutos()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const inputClass = 'w-full bg-white border border-zinc-200 focus:border-black text-black px-4 py-3 text-sm outline-none transition-all rounded-lg placeholder:text-zinc-300'
  const labelClass = 'text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-2'
  const marcas = ['AUDI','BMW','BYD','CHANGAN','CHERY','CHEVROLET','CITROEN','DFSK','DODGE','FIAT','FORD','GAC','GEELY','GWM','HONDA','HYUNDAI','INFINITI','JAC','JAGUAR','JEEP','KIA','LAND ROVER','LEXUS','LIFAN','MAHINDRA','MAZDA','MERCEDES-BENZ','MG','MINI','MITSUBISHI','NISSAN','PEUGEOT','PORSCHE','RAM','RENAULT','SEAT','SKODA','SUBARU','SUZUKI','TOYOTA','VOLKSWAGEN','VOLVO','ZOTYE']
  return (
    <div className="bg-zinc-50 min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs text-zinc-400 tracking-widest uppercase mb-1">Panel</p>
            <h1 className="text-3xl font-black tracking-tight text-black">Administración</h1>
          </div>
          <button onClick={handleLogout} className="text-sm text-zinc-400 hover:text-black transition-colors font-medium">Cerrar sesión →</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="bg-white border border-zinc-100 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-black text-lg">{editando ? 'Editando auto' : 'Agregar auto'}</h2>
              {editando && <button onClick={handleCancelar} className="text-xs text-zinc-400 hover:text-black transition-colors">Cancelar</button>}
            </div>

            {editando && imagenesEditando.length > 0 && (
              <div className="mb-6">
                <label className={labelClass}>Imágenes — arrastra para reordenar</label>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={imagenesEditando} strategy={horizontalListSortingStrategy}>
                    <div className="flex gap-2 flex-wrap p-3 border border-zinc-200 rounded-lg">
                      {imagenesEditando.map((url, i) => (
                        <ImagenSortable key={url} url={url} index={i} onEliminar={handleEliminarImagen} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Marca</label>
                  <select name="marca" value={form.marca} onChange={handleChange} required className={inputClass}>
                    <option value="">Seleccionar</option>
                    {marcas.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Modelo</label><input name="modelo" value={form.modelo} onChange={handleChange} required className={inputClass} placeholder="Ej: Corolla" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={labelClass}>Año</label><input name="año" value={form.año} onChange={handleChange} required className={inputClass} placeholder="2024" /></div>
                <div><label className={labelClass}>Precio</label><input name="precio" value={form.precio} onChange={handleChange} required className={inputClass} placeholder="15000000" /></div>
                <div><label className={labelClass}>KM</label><input name="km" value={form.km} onChange={handleChange} required className={inputClass} placeholder="30000" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Combustible</label>
                  <select name="combustible" value={form.combustible} onChange={handleChange} className={inputClass}>
                    <option>Bencina</option><option>Diesel</option><option>Electrico</option><option>Hibrido</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Transmisión</label>
                  <select name="transmision" value={form.transmision} onChange={handleChange} className={inputClass}>
                    <option>Automatico</option><option>Manual</option><option>CVT</option>
                  </select>
                </div>
                <div><label className={labelClass}>Color</label><input name="color" value={form.color} onChange={handleChange} required className={inputClass} placeholder="Blanco" /></div>
              </div>
              <div><label className={labelClass}>Descripción</label><textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} required className={inputClass + ' resize-none'} placeholder="Descripción del vehículo" /></div>
              <div>
                <label className={labelClass}>Fotos {editando ? '(se agregan a las actuales)' : ''}</label>
                <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFotos} className="w-full text-zinc-400 text-xs py-3 file:mr-4 file:bg-black file:border-0 file:text-white file:font-bold file:px-4 file:py-2 file:text-xs cursor-pointer file:rounded-lg" />
                {fotos.length > 0 && <p className="text-zinc-400 text-xs mt-2">{fotos.length} foto(s) seleccionada(s)</p>}
              </div>
              <button type="submit" disabled={subiendo} className="bg-black hover:bg-zinc-800 text-white font-bold text-sm py-4 transition-colors rounded-lg disabled:opacity-50">
                {subiendo ? 'Guardando...' : editando ? 'Guardar cambios →' : 'Agregar auto →'}
              </button>
            </form>
          </div>

          <div className="bg-white border border-zinc-100 rounded-xl p-8">
            <h2 className="font-black text-black text-lg mb-6">Stock actual ({autos.length})</h2>
            {loading ? (
              <p className="text-zinc-300 text-sm">Cargando...</p>
            ) : (
              <div className="flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-1">
                {autos.map((auto) => (
                  <div key={auto.id} className="flex items-center gap-4 p-3 border border-zinc-100 rounded-lg hover:border-zinc-200 transition-colors">
                    <div className="w-16 h-12 overflow-hidden flex-shrink-0 bg-zinc-100 rounded-lg">
                      {auto.imagenes ? (
                        <img src={auto.imagenes.split(',')[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">—</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-black font-bold text-sm truncate">{auto.marca} {auto.modelo}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{auto.año} · {auto.km?.toLocaleString()} km · ${auto.precio?.toLocaleString('es-CL')}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleVendido(auto)} className={"text-xs font-bold transition-colors px-3 py-1.5 border rounded-lg " + (auto.vendido ? "text-white bg-black border-black" : "text-zinc-400 hover:text-black border-zinc-200 hover:border-black")}>{auto.vendido ? "Vendido ✓" : "Marcar vendido"}</button>
                      <button onClick={() => handleEditar(auto)} className="text-xs font-bold text-zinc-400 hover:text-black transition-colors px-3 py-1.5 border border-zinc-200 hover:border-black rounded-lg">Editar</button>
                      <button onClick={() => handleEliminar(auto.id)} className="text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors px-3 py-1.5 border border-zinc-200 hover:border-red-300 rounded-lg">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}