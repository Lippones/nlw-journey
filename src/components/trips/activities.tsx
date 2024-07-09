import { CircleCheck } from 'lucide-react'

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="font-semibold text-xl text-zinc-300">Dia 17</span>
          <span className="text-xs text-zinc-500">Sábado</span>
        </div>
        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="font-semibold text-xl text-zinc-300">Dia 18</span>
          <span className="text-xs text-zinc-500">Domingo</span>
        </div>
        <div>
          <ul>
            <li>
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center">
                <div className="flex gap-3 items-center">
                  <CircleCheck className="size-5 text-lime-500" />
                  <span>Academia em grupo</span>
                </div>
                <span className="text-zinc-400 text-sm ml-auto">7:00h</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
