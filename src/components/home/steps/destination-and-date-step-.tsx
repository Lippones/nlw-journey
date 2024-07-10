'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { DatePickerModal } from '../date-picker-modal'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  handleOpenGuestsInput: () => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  setDestination: (destination: string) => void
  destination: string
}

export function DestinationAndDateStep({
  handleOpenGuestsInput,
  isGuestsInputOpen,
  eventStartAndEndDates,
  setEventStartAndEndDates,
  destination,
  setDestination,
}: DestinationAndDateStepProps) {
  const displayedDate =
    eventStartAndEndDates?.from && eventStartAndEndDates?.to
      ? format(eventStartAndEndDates.from, 'd')
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
      : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
        />
      </div>

      <DatePickerModal
        eventStartAndEndDates={eventStartAndEndDates}
        setEventStartAndEndDates={setEventStartAndEndDates}
      >
        <button className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="bg-transparent text-lg text-zinc-400 whitespace-nowrap outline-none">
            {displayedDate || 'Quando?'}
          </span>
        </button>
      </DatePickerModal>

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
