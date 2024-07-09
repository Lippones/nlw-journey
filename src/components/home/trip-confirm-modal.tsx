'use client'
import { Plus, User, X } from 'lucide-react'
import { FormEvent } from 'react'

interface TripConfirmModalProps {
  closeModal: () => void
  createTrip: (e: FormEvent<HTMLFormElement>) => void
}

export function TripConfirmModal({
  closeModal,
  createTrip,
}: TripConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirma criação</h2>
            <button type="button" onClick={closeModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="text-zinc-100 font-semibold">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="text-zinc-100 font-semibold">
              16 a 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="py-2.5 p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="py-2.5 p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
            />
          </div>
        </form>
        <button
          type={'submit'}
          className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium inline-flex justify-center items-center gap-2 hover:bg-lime-400 transition-colors w-full"
        >
          Convidar
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  )
}
