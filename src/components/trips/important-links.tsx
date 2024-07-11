import { Link2, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'
import { ImportantLink } from '@/@types'
import { CreateImportantLinkModal } from './create-important-link-modal'

export function ImportantLinks() {
  const tripId = useParams().tripId

  const { data } = useQuery({
    queryKey: ['important-links'],
    queryFn: () =>
      api
        .get<{
          links: ImportantLink[]
        }>(`/trips/${tripId}/links`)
        .then((res) => res.data),
  })

  return (
    <div className="space-y-6">
      <h2 className="text-semibold text-lg">Links importantes</h2>
      <div className="space-y-5">
        {data?.links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium">{link.title}</span>
              <Link
                href="#"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </Link>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>
      <CreateImportantLinkModal>
        <Button variant="secondary" size="full">
          <Plus className="size-5" /> Cadastrar novo link
        </Button>
      </CreateImportantLinkModal>
    </div>
  )
}
