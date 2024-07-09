import { MapPin, Calendar, Settings2 } from 'lucide-react'
import { Button } from '../ui/button'

export function DestinationAndDateHeader() {
  return (
    <header className="px-4 h-16 rounded-xl shadow-shape flex items-center justify-between bg-zinc-900">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">Florianópolis, Brazil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">17 ao 23 de agosto</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      </div>
    </header>
  )
}
