'use client'
import { Calendar, Clock, Loader2, Plus, Tag } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'

interface CreateActivityModalProps {
  children: React.ReactNode
}

export function CreateActivityModal({ children }: CreateActivityModalProps) {
  const tripId = useParams().tripId

  const [open, setOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const queryClient = useQueryClient()

  function createActivity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const title = data.get('title')
    const date = data.get('date')
    const time = data.get('time')

    const occursAt = new Date(`${date}T${time}`)

    startTransition(async () => {
      try {
        await api.post(`/trips/${tripId}/activities`, {
          title,
          occurs_at: occursAt,
        })
        toast.success('Atividade criada com sucesso')
        queryClient.invalidateQueries({
          queryKey: ['activities'],
        })
        setOpen(false)
      } catch (error) {
        toast.error('Erro ao criar atividade')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar atividade</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar as atividades.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={createActivity}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <Input type="text" name="title" placeholder="Qual a atividade" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <Input type="date" name="date" placeholder="Seu email pessoal" />
            </div>

            <div className="h-14 px-4 w-36 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Clock className="text-zinc-400 size-5" />
              <Input type="time" name="time" placeholder="Horário" />
            </div>
          </div>

          <Button disabled={isPending} type={'submit'} size="full">
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Salvar atividade
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
