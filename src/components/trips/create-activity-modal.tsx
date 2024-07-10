'use client'
import { Calendar, Clock, Plus, Tag } from 'lucide-react'
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

interface CreateActivityModalProps {
  children: React.ReactNode
}

export function CreateActivityModal({ children }: CreateActivityModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar atividade</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar as atividades.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3">
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

          <Button type={'submit'} size="full">
            Salvar atividade
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
