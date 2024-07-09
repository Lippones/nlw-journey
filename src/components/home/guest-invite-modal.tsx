'use client'
import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../ui/button'

interface GuestInviteModalProps {
  closeModal: () => void
  emailsToInvite: string[]
  addNewEmailsToInvite: (e: FormEvent<HTMLFormElement>) => void
  removeEmailsFromInvite: (email: string) => void
}

export function GuestInviteModal({
  closeModal,
  emailsToInvite,
  addNewEmailsToInvite,
  removeEmailsFromInvite,
}: GuestInviteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => (
            <li key={email}>
              <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button
                  onClick={() => {
                    removeEmailsFromInvite(email)
                  }}
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={addNewEmailsToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
            />
          </div>
          <Button type={'submit'}>
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
