'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email o contraseña incorrectos'); setLoading(false) }
    else { router.push('/admin') }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <div className="mb-12">
          <p className="text-3xl font-black tracking-tighter text-black">CC<span className="font-light text-zinc-400">MOTORS</span></p>
          <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase mt-2">Panel Administrativo</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="border-b border-zinc-200 focus-within:border-black transition-colors pb-3">
            <label className="text-xs tracking-widest text-zinc-400 block mb-2">EMAIL</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@ccmotors.cl" className="w-full bg-transparent text-black text-sm outline-none placeholder:text-zinc-300" />
          </div>
          <div className="border-b border-zinc-200 focus-within:border-black transition-colors pb-3">
            <label className="text-xs tracking-widest text-zinc-400 block mb-2">CONTRASEÑA</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-transparent text-black text-sm outline-none placeholder:text-zinc-300" />
          </div>
          {error && <p className="text-red-400 text-xs tracking-wide">{error}</p>}
          <button type="submit" disabled={loading} className="bg-black hover:bg-zinc-800 text-white font-black text-xs py-4 tracking-widest transition-all disabled:opacity-50">
            {loading ? 'VERIFICANDO...' : 'INGRESAR →'}
          </button>
        </form>
      </div>
    </div>
  )
}