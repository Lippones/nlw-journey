'use client'
import { Link2, Loader2, Plus, Tag } from 'lucide-react'
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

interface CreateImportantLinkModalProps {
  children: React.ReactNode
}

export function CreateImportantLinkModal({
  children,
}: CreateImportantLinkModalProps) {
  const tripId = useParams().tripId

  const [open, setOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const queryClient = useQueryClient()

  function createImportantLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('link')?.toString()

    startTransition(async () => {
      try {
        await api.post(`/trips/${tripId}/links`, {
          title,
          url,
        })
        toast.success('Link criado com sucesso')
        queryClient.invalidateQueries({
          queryKey: ['important-links'],
        })
        setOpen(false)
      } catch (error) {
        toast.error('Erro ao criar link')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar link</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar os links importantes.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={createImportantLink}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <Input type="text" name="title" placeholder="Título do link" />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <Input type="text" name="link" placeholder="URL" />
          </div>

          <Button disabled={isPending} type={'submit'} size="full">
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Salvar link
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
