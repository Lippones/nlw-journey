'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  handleOpenGuestsInput: () => void
}

export function DestinationAndDateStep({
  handleOpenGuestsInput,
  isGuestsInputOpen,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Quando?"
          className="bg-transparent text-lg placeholder:text-zinc-400 w-32 outline-none"
        />
      </div>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={handleOpenGuestsInput}>
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button type={'button'} onClick={handleOpenGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
