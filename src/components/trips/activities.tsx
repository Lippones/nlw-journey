'use client'
import { Activity } from '@/@types'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { format, isAfter, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck, CircleDashed } from 'lucide-react'
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
      {data?.activities.map((day) => (
        <div key={day.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="font-semibold text-xl text-zinc-300">
              Dia {format(day.date, 'd')}
            </span>
            <span className="text-xs text-zinc-500">
              {format(day.date, 'EEEE', { locale: ptBR })}
            </span>
          </div>
          <ul className="space-y-3">
            {day.activities.length > 0 ? (
              day.activities.map((activity) => {
                const activityIsActive = isAfter(new Date(), activity.occurs_at)

                const activityIsPast = isPast(activity.occurs_at)

                return (
                  <li key={activity.id}>
                    <button
                      disabled={activityIsPast}
                      className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center w-full disabled:bg-zinc-900 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:opacity-60"
                    >
                      <div className="flex gap-3 items-center">
                        {activityIsActive ? (
                          <CircleCheck className="size-5 text-lime-300" />
                        ) : (
                          <CircleDashed className="size-5 text-zinc-400" />
                        )}
                        <span>{activity.title}</span>
                      </div>
                      <span className="text-zinc-400 text-sm ml-auto">
                        {format(activity.occurs_at, 'HH:mm')}h
                      </span>
                    </button>
                  </li>
                )
              })
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
