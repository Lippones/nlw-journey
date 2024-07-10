'use client'
import { MapPin, Calendar, Settings2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Trip } from '@/@types'
import { format } from 'date-fns'

export function DestinationAndDateHeader() {
  const tripId = useParams().tripId

  const { data } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () =>
      api.get<{ trip: Trip }>(`/trips/${tripId}`).then((res) => res.data),
  })

  const trip = data?.trip

  const displayedDate =
    trip?.starts_at && trip.ends_at
      ? format(trip.starts_at, 'd')
          .concat(' até ')
          .concat(format(trip.ends_at, "d 'de' LLL"))
      : null

  return (
    <header className="px-4 h-16 rounded-xl shadow-shape flex items-center justify-between bg-zinc-900">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      </div>
    </header>
  )
}
