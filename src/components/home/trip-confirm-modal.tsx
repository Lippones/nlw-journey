'use client'
import { Loader2, Plus, User } from 'lucide-react'
import { FormEvent, useState } from 'react'
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

interface TripConfirmModalProps {
  createTrip: (e: FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
  isPending: boolean
}

export function TripConfirmModal({
  createTrip,
  children,
  isPending,
}: TripConfirmModalProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (isPending) return
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirma criação</DialogTitle>
          <DialogDescription>
            Para concluir a criação da viagem para{' '}
            <span className="text-zinc-100 font-semibold">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="text-zinc-100 font-semibold">
              16 a 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <Input type="text" name="name" placeholder="Seu nome completo" />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <Input type="email" name="email" placeholder="Seu email pessoal" />
          </div>
          <Button disabled={isPending} type={'submit'} size="full">
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Confirmar criação da viagem
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
