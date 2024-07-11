'use client'
import { Activity } from '@/@types'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck } from 'lucide-react'
import { useParams } from 'next/navigation'

export function Activities() {
  const tripId = useParams().tripId

  const { data } = useQuery({
    queryKey: ['activities'],
    queryFn: () =>
      api
        .get<{
          activities: Activity[]
        }>(`/trips/${tripId}/activities`)
        .then((res) => res.data),
  })

  return (
    <div className="space-y-8">
      {data?.activities.map((activity) => (
        <div key={activity.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="font-semibold text-xl text-zinc-300">
              Dia {format(activity.date, 'd')}
            </span>
            <span className="text-xs text-zinc-500">
              {format(activity.date, 'EEEE', { locale: ptBR })}
            </span>
          </div>
          <ul>
            {activity.activities.length > 0 ? (
              activity.activities.map((activity) => (
                <li key={activity.id}>
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center">
                    <div className="flex gap-3 items-center">
                      <CircleCheck className="size-5 text-lime-300" />
                      <span>{activity.title}</span>
                    </div>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(activity.occurs_at, 'HH:mm')}h
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}
