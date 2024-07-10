'use client'
import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Input } from '../ui/input'

interface GuestInviteModalProps {
  children: React.ReactNode
  emailsToInvite: string[]
  addNewEmailsToInvite: (e: FormEvent<HTMLFormElement>) => void
  removeEmailsFromInvite: (email: string) => void
}

export function GuestInviteModal({
  emailsToInvite,
  addNewEmailsToInvite,
  removeEmailsFromInvite,
  children,
}: GuestInviteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar convidados</DialogTitle>
          <DialogDescription>
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </DialogDescription>
        </DialogHeader>
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
            <Input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
            />
          </div>
          <Button type={'submit'}>
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
