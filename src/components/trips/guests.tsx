import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Participant } from '@/@types'
import { api } from '@/lib/axios'

export function Guests() {
  const tripId = useParams().tripId

  const { data } = useQuery({
    queryKey: ['participa', tripId],
    queryFn: () =>
      api
        .get<{ participants: Participant[] }>(`/trips/${tripId}/participants`)
        .then((res) => res.data),
  })

  const participants = data?.participants

  return (
    <div className="space-y-6">
      <h2 className="text-semibold text-lg">Convidados</h2>
      <div className="space-y-5">
        {participants?.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium">{participant.name}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CircleCheck className="text-lime-300 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div>
      <Button variant="secondary" size="full">
        <UserCog className="size-5" /> Gerenciar convidados
      </Button>
    </div>
  )
}
